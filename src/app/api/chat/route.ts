import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI with the API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages, problemContext } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in the environment.' },
        { status: 500 }
      );
    }

    // Construct the System Prompt
    let systemPrompt = `You are an expert AI Math Tutor specifically designed for the Samacheer Kalvi mathematics curriculum.
You must STRICTLY follow these formatting rules:
- ALL mathematical formulas and equations MUST be wrapped in LaTeX delimiters.
- Use \\( ... \\) for inline math.
- Use \\[ ... \\] for block/standalone equations.

When the user asks you to solve a math question or explain a math concept:
1. "Basic understanding of the question": Describe what the question is asking and given values.
2. "Chain of Thoughts": Outline the logical steps and formulas you will use.
3. "Step-by-step solution": Perform the detailed calculations.

When the user asks a doubt (about a specific step, concept, or why something was done):
1. "Significance": Explain the significance of whatever was asked (why it matters in the solution).
2. "Resolution": Resolve the doubt in simple, clear steps.
`;

    if (problemContext) {
      systemPrompt += `\n\n--- CURRENT PAGE CONTEXT ---
The user is currently viewing the following math problem:
TITLE: ${problemContext.title}
CONTENT (HTML): 
${problemContext.htmlContent}
---------------------------
Use this context if the user asks questions like "explain this", "why is step 2 like that?", or "how did they get that answer?". You already know what they are looking at.`;
    }

    // Convert OpenAI style messages to Gemini style
    // chat history should be formatted as { role: 'user' | 'model', parts: [{text: '...'}] }
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Gemini API requires the first message in history to be from a 'user'
    while (history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const currentMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.5-flash',
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(currentMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong during the chat request' },
      { status: 500 }
    );
  }
}
