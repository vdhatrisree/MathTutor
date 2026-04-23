"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const DOMAIN = ["a", "b", "c"];
const CODOMAIN = ["x", "y", "z"];

interface UniversalFunctionVisualizerProps {
  mode: "basic" | "advanced";
}

export default function UniversalFunctionVisualizer({ mode }: UniversalFunctionVisualizerProps) {
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [mappings, setMappings] = useState<{ input: string; output: string }[]>([]);
  const [lines, setLines] = useState<{ id: string; x1: number; y1: number; x2: number; y2: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const outputRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const updateLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newLines = mappings.map((mapping) => {
      const inputEl = inputRefs.current[mapping.input];
      const outputEl = outputRefs.current[mapping.output];

      if (!inputEl || !outputEl) return null;

      const r1 = inputEl.getBoundingClientRect();
      const r2 = outputEl.getBoundingClientRect();

      return {
        id: `${mapping.input}-${mapping.output}`,
        x1: r1.right - containerRect.left,
        y1: r1.top + r1.height / 2 - containerRect.top,
        x2: r2.left - containerRect.left,
        y2: r2.top + r2.height / 2 - containerRect.top,
      };
    }).filter(Boolean) as { id: string; x1: number; y1: number; x2: number; y2: number }[];

    setLines(newLines);
  }, [mappings]);

  useEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [updateLines]);

  const handleInputClick = (input: string) => {
    setSelectedInput(input === selectedInput ? null : input);
  };

  const handleOutputClick = (output: string) => {
    if (!selectedInput) return;

    const exists = mappings.some(m => m.input === selectedInput && m.output === output);
    if (exists) {
      setMappings(mappings.filter(m => !(m.input === selectedInput && m.output === output)));
    } else {
      setMappings([...mappings, { input: selectedInput, output }]);
    }
    setSelectedInput(null);
  };

  const resetMappings = () => {
    setMappings([]);
    setSelectedInput(null);
  };

  // Evaluation logic
  const inputCounts: Record<string, string[]> = {};
  mappings.forEach(m => {
    if (!inputCounts[m.input]) inputCounts[m.input] = [];
    inputCounts[m.input].push(m.output);
  });

  const hasMultipleOutputs = Object.keys(inputCounts).find(k => inputCounts[k].length > 1);
  const multipleOutputInputKey = hasMultipleOutputs;
  const mappedOutputs = DOMAIN.map(d => inputCounts[d] ? inputCounts[d][0] : null).filter(Boolean) as string[];
  const allInputsMapped = DOMAIN.every(d => inputCounts[d] && inputCounts[d].length >= 1);

  let resultTitle = "";
  let resultReason = "";
  let statusColor = "gray"; // gray, red, green, amber

  if (hasMultipleOutputs) {
    resultTitle = "Not a Function";
    resultReason = `Input '${hasMultipleOutputs}' connects to multiple outputs. This violates the functional rule that each input must have exactly ONE output.`;
    statusColor = "red";
  } else if (!allInputsMapped) {
    resultTitle = "Incomplete Mapping";
    resultReason = "For a mapping to be a Function, ALL elements in the Domain must be assigned to an output.";
    statusColor = "amber";
  } else {
    // It's a valid function! Now classify if in advanced mode
    if (mode === "basic") {
      resultTitle = "This is a Valid Function";
      resultReason = "Success! Every input in the Domain maps to exactly ONE output in the Codomain.";
      statusColor = "green";
    } else {
      const uniqueOutputs = Array.from(new Set(mappedOutputs));
      const isOneOne = uniqueOutputs.length === mappedOutputs.length;
      const isOnto = uniqueOutputs.length === CODOMAIN.length;

      if (isOneOne && isOnto) {
        resultTitle = "Bijective (One-to-One & Onto)";
        resultReason = "Every input has a unique output AND every output is assigned. A perfect 1-to-1 match!";
        statusColor = "green";
      } else if (isOneOne && !isOnto) {
        resultTitle = "Injective (One-to-One Into)";
        resultReason = "Every input maps to a unique output, but some outputs in the codomain are unused.";
        statusColor = "green";
      } else if (!isOneOne && isOnto) {
        resultTitle = "Surjective (Many-to-One Onto)";
        resultReason = "Multiple inputs share outputs, but every single output in the codomain is used.";
        statusColor = "green";
      } else {
        resultTitle = "Many-to-One Into Function";
        resultReason = "Multiple inputs share outputs, and some codomain elements remain unused.";
        statusColor = "green";
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-12 px-4 font-sans text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 text-center">
        {mode === "basic" ? "Function Diagram Tester" : "Types of Functions Visualizer"}
      </h2>

      {/* Rules Panels */}
      {mode === "basic" ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl w-full max-w-2xl shadow-sm mb-10 text-blue-900">
          <h3 className="font-bold text-lg mb-2">The Two Rules of a Function:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Rule 1:</strong> Every input (Domain) must have a mapping.</li>
            <li><strong>Rule 2:</strong> An input can ONLY map to <em>exactly one</em> output.</li>
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-10">
          <div className="bg-cyan-50 border-t-4 border-cyan-500 p-6 rounded-b-xl shadow-sm text-cyan-900 border-x border-b border-cyan-100">
            <h3 className="font-bold text-xl mb-3 border-b border-cyan-200 pb-2">1. The {"\""}To-One{"\""} Rules</h3>
            <ul className="text-base space-y-3 mt-3">
              <li><strong className="text-cyan-700 bg-white px-2 py-1 rounded">One-to-One (Injective):</strong> Every output node receives at most ONE incoming arrow.</li>
              <li><strong className="text-cyan-700 bg-white px-2 py-1 rounded">Many-to-One:</strong> At least one output node is shared by multiple input nodes.</li>
            </ul>
          </div>
          <div className="bg-sky-50 border-t-4 border-sky-500 p-6 rounded-b-xl shadow-sm text-sky-900 border-x border-b border-sky-100">
            <h3 className="font-bold text-xl mb-3 border-b border-sky-200 pb-2">2. The {"\""}Onto/Into{"\""} Rules</h3>
            <ul className="text-base space-y-3 mt-3">
              <li><strong className="text-sky-700 bg-white px-2 py-1 rounded">Onto (Surjective):</strong> EVERY element in the Codomain has at least one incoming arrow.</li>
              <li><strong className="text-sky-700 bg-white px-2 py-1 rounded">Into:</strong> At least one element in the Codomain is left unused (no arrows).</li>
            </ul>
          </div>
        </div>
      )}

      {/* Mapping Canvas */}
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl bg-white border border-gray-200 shadow-sm rounded-3xl p-10 flex justify-between overflow-hidden"
      >
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          {lines.map((line) => {
            const isInvalid = multipleOutputInputKey === line.id.split('-')[0];
            return (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={isInvalid ? "#ef4444" : "#0ea5e9"}
                strokeWidth="4"
                strokeLinecap="round"
                className={`animate-fade-in drop-shadow-sm transition-all duration-300 ${isInvalid ? 'animate-pulse' : ''}`}
              />
            );
          })}
        </svg>

        <div className="flex flex-col gap-8 z-20 w-32">
          <h3 className="font-bold text-gray-400 text-center mb-2 tracking-widest uppercase text-xs border-b-2 border-gray-200 pb-2">Domain</h3>
          {DOMAIN.map((input) => {
            const hasError = multipleOutputInputKey === input;
            const isConnected = !!inputCounts[input];
            return (
              <div
                key={input}
                ref={(el) => { inputRefs.current[input] = el; }}
                onClick={() => handleInputClick(input)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold cursor-pointer transition-all duration-300 shadow-md border-4 select-none mx-auto ${
                  selectedInput === input
                    ? "bg-[#FFD700] border-yellow-500 scale-110 ring-4 ring-yellow-200"
                    : hasError
                    ? "bg-red-100 border-red-500 text-red-900 animate-pulse ring-4 ring-red-100"
                    : isConnected
                    ? "bg-cyan-200 border-cyan-400"
                    : "bg-gray-50 border-gray-200 hover:scale-105 hover:bg-gray-100"
                } text-gray-900`}
              >
                {input}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-8 z-20 w-32">
          <h3 className="font-bold text-gray-400 text-center mb-2 tracking-widest uppercase text-xs border-b-2 border-gray-200 pb-2">Codomain</h3>
          {CODOMAIN.map((output) => {
            const isUsedByAny = mappings.some(m => m.output === output);
            const isSelectedInputValid = !!selectedInput;
            return (
            <div
              key={output}
              ref={(el) => { outputRefs.current[output] = el; }}
              onClick={() => handleOutputClick(output)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 shadow-md border-4 select-none mx-auto ${
                isSelectedInputValid
                  ? "bg-sky-50 border-sky-400 hover:bg-sky-100 hover:scale-105 cursor-pointer ring-4 ring-sky-50 text-sky-900"
                  : isUsedByAny
                  ? "bg-sky-100 border-sky-300 text-sky-800"
                  : "bg-gray-50 border-gray-200 cursor-not-allowed opacity-80 text-gray-400"
              }`}
            >
              {output}
            </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center w-full max-w-2xl">
        <button
          onClick={resetMappings}
          className="px-8 py-3 bg-red-50 hover:bg-red-100 active:scale-95 transition-all text-red-600 font-bold rounded-xl shadow-sm border border-red-200"
        >
          Reset Mapping
        </button>
      </div>

      {/* Result Card */}
      <div className={`mt-8 p-8 rounded-3xl border shadow-sm w-full max-w-2xl flex flex-col items-center text-center transition-all duration-500 ${
        statusColor === "green" ? 'bg-green-50 border-green-200' : 
        statusColor === "red" ? 'bg-red-50 border-red-200' : 
        statusColor === "amber" ? 'bg-amber-50 border-amber-200' : 
        'bg-gray-50 border-gray-200'
      }`}>
        <div className={`text-2xl md:text-3xl font-bold mb-4 ${
          statusColor === "green" ? "text-green-700" : 
          statusColor === "red" ? "text-red-600" : 
          statusColor === "amber" ? "text-amber-600" : 
          "text-gray-400"
        }`}>
          {resultTitle || "Draw Mappings"}
        </div>
        <div className="text-gray-700 font-medium text-lg leading-relaxed">
          {resultReason || "Select an input node then an output node to create a mapping."}
        </div>
      </div>
    </div>
  );
}
