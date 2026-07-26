import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI with the API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const dynamic = 'force-dynamic';

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
    let systemPrompt = [
      'You are a friendly AI Math Tutor for Samacheer Kalvi Class 10 math.',
      '',
      'ABSOLUTE RULES (violating these is a critical failure):',
      '- NEVER use markdown headers. The characters # ## ### #### are FORBIDDEN. Do not write them ever.',
      '- NEVER use horizontal rules (---). They are FORBIDDEN.',
      '- NEVER use section titles like "Significance", "Resolution", "Summary", "Checklist", "Step-by-step explanation". These words as standalone labels are BANNED.',
      '- Keep answers SHORT. Maximum 150 words. Students are on mobile phones with tiny screens.',
      '- Write like you are texting a friend who needs math help. Be warm, casual, and direct.',
      '- Use **bold** for emphasis only.',
      '- Use bullet points (*) for short lists.',
      '- For math: use \\( ... \\) for inline math and \\[ ... \\] for block equations.',
      '',
      'GOOD example response:',
      '**A × B** (read as "A cross B") is called the **Cartesian Product**. It means you pair every element of set A with every element of set B.',
      '',
      'For example, if A = {1, 2} and B = {a, b}, then:',
      '\\[ A \\times B = \\{(1,a), (1,b), (2,a), (2,b)\\} \\]',
      '',
      'Think of it like making all possible outfits from shirts and pants! 👕👖',
    ].join('\n');

    if (problemContext) {
      systemPrompt += '\n\n--- CURRENT PAGE CONTEXT ---\n'
        + 'The student is viewing: ' + problemContext.title + '\n'
        + 'Content: ' + problemContext.htmlContent + '\n'
        + '---\nUse this context if they ask about "this problem" or "explain this".';
    }

    // Convert messages to Gemini format
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
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(currentMessage);
    const response = await result.response;
    let text = response.text();

    // SERVER-SIDE CLEANUP: Force-strip any headers or rules the model sneaks in
    console.log('RAW GEMINI RESPONSE (first 200 chars):', text.substring(0, 200));
    
    // Strip markdown headers (### Header -> **Header**)
    text = text.replace(/^#{1,6}\s+(.*)/gm, '**$1**');
    // Strip horizontal rules
    text = text.replace(/^-{3,}$/gm, '');
    text = text.replace(/^\*{3,}$/gm, '');
    text = text.replace(/^_{3,}$/gm, '');
    // Collapse excessive newlines  
    text = text.replace(/\n{3,}/g, '\n\n');
    
    console.log('CLEANED RESPONSE (first 200 chars):', text.substring(0, 200));

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong during the chat request' },
      { status: 500 }
    );
  }
}
