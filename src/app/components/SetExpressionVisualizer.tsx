"use client";

import { useState } from "react";

type StepData = {
  title: string;
  result: string[];
  explain: string;
  grid?: { r1: string[]; r2: string[] };
};

export default function SetExpressionVisualizer() {
  const [sets, setSets] = useState({
    A: "1, 2, 3",
    B: "2, 3, 5",
    C: "3, 4",
    D: "1, 3, 5",
  });
  const [expr, setExpr] = useState("(A ∩ C) × (B ∩ D)");
  const [steps, setSteps] = useState<StepData[]>([]);
  const [error, setError] = useState("");

  const evaluateExpression = () => {
    setError("");
    setSteps([]);

    const parsed: Record<string, string[]> = {
      A: sets.A.split(",").map((x) => x.trim()).filter(Boolean),
      B: sets.B.split(",").map((x) => x.trim()).filter(Boolean),
      C: sets.C.split(",").map((x) => x.trim()).filter(Boolean),
      D: sets.D.split(",").map((x) => x.trim()).filter(Boolean),
    };

    const newSteps: StepData[] = [];
    let stepNum = 1;

    const pattern = /\(([A-D])\s*([∩∪−])\s*([A-D])\)/g;
    const matches = Array.from(expr.matchAll(pattern));
    const results: string[][] = [];

    for (const m of matches) {
      const s1 = m[1];
      const op = m[2];
      const s2 = m[3];

      const left = parsed[s1] || [];
      const right = parsed[s2] || [];
      let res: string[] = [];
      let opName = "";

      if (op === "∩") {
        res = left.filter((x) => right.includes(x));
        opName = "Intersection (AND)";
      } else if (op === "∪") {
        res = Array.from(new Set([...left, ...right]));
        opName = "Union (OR)";
      } else if (op === "−") {
        res = left.filter((x) => !right.includes(x));
        opName = "Difference (NOT)";
      }

      results.push(res);
      newSteps.push({
        title: `Step ${stepNum}: Evaluate ${s1} ${op} ${s2} >> ${opName}`,
        result: res,
        explain: op === "∩" 
          ? `We found elements that are in BOTH ${s1} and ${s2}.`
          : op === "∪"
          ? `We combined all unique elements from BOTH ${s1} and ${s2}.`
          : `We took all elements in ${s1} and REMOVED any that also appear in ${s2}.`,
      });
      stepNum++;
    }

    if (expr.includes("×")) {
      let r1: string[] = [];
      let r2: string[] = [];

      if (results.length >= 2) {
        r1 = results[0];
        r2 = results[1];
      } else {
        const basicPattern = /([A-D])\s*×\s*([A-D])/g;
        const basicMatches = Array.from(expr.matchAll(basicPattern));
        if (basicMatches.length > 0) {
          const s1Name = basicMatches[0][1];
          const s2Name = basicMatches[0][2];
          r1 = parsed[s1Name] || [];
          r2 = parsed[s2Name] || [];
        } else if (results.length === 1 && expr.match(/([A-D])\s*×/)) {
            const leftMatch = expr.match(/([A-D])\s*×/);
            if(leftMatch) r1 = parsed[leftMatch[1]] || [];
            r2 = results[0];
        } else if (results.length === 1 && expr.match(/×\s*([A-D])/)) {
            r1 = results[0];
            const rightMatch = expr.match(/×\s*([A-D])/);
            if(rightMatch) r2 = parsed[rightMatch[1]] || [];
        } else {
          setError("Invalid expression structure for Cartesian Product.");
          return;
        }
      }

      const cart: string[] = [];
      r1.forEach((a) => {
        r2.forEach((b) => {
          cart.push(`(${a}, ${b})`);
        });
      });

      newSteps.push({
        title: `Step ${stepNum}: Cartesian Product (×)`,
        result: cart,
        explain: `Every single item from the first bracket mathematically pairs with every item from the second bracket to form ${r1.length * r2.length} ordered sets.`,
        grid: { r1, r2 },
      });
    }

    if (newSteps.length === 0) {
      setError(
        "Expression could not be parsed. Use uppercase letters A-D, operations ∩, ∪, −, and ×."
      );
    } else {
      setSteps(newSteps);
    }
  };

  const handleSetChange = (name: string, value: string) => {
    setSets((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-12 px-4 font-sans text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 text-center">
        Set Expression Visualizer
      </h2>

      {/* Educational Operations Guide Panel */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl w-full mb-10 text-indigo-900 shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-indigo-800 border-b border-indigo-200 pb-2">Mathematical Operations Guide:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <li className="flex items-start">
            <span className="text-2xl font-bold bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm mr-4 shrink-0">∪</span>
            <span><strong>Union (OR):</strong> Collects ALL unique elements present from both combined sets.</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl font-bold bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm mr-4 shrink-0">∩</span>
            <span><strong>Intersection (AND):</strong> Keeps ONLY the elements that are strictly shared across both sets.</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl font-bold bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm mr-4 shrink-0">−</span>
            <span><strong>Difference (NOT):</strong> Subtracts any overlapping elements belonging to the 2nd set away from the 1st set.</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl font-bold bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm mr-4 shrink-0">×</span>
            <span><strong>Cartesian Product:</strong> Multiplies sets to create coordinate (ordered pair) clusters.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
          1. Define Sets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["A", "B", "C", "D"].map((setLetter) => (
            <div key={setLetter} className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">
                Set {setLetter}
              </label>
              <input
                value={sets[setLetter as keyof typeof sets]}
                onChange={(e) => handleSetChange(setLetter, e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. 1, 2, 3"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
          2. Master Expression
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="flex-1 p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-xl transition-all w-full"
            placeholder="e.g. (A ∩ C) × (B ∩ D)"
          />

          <div className="flex gap-2">
            {["∩", "∪", "−", "×"].map((sym) => (
              <button
                key={sym}
                onClick={() => setExpr((e) => e + sym)}
                className="w-12 h-12 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xl rounded-lg border border-indigo-200 transition-colors shadow-sm"
                title={`Insert ${sym}`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={evaluateExpression}
            className="px-10 py-4 text-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Compute Mathematical Steps
          </button>
        </div>
      </div>

      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 font-medium">
          {error}
        </div>
      )}

      {steps.length > 0 && (
        <div className="w-full space-y-6 animate-fade-in relative">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 px-2">
            Evaluation Steps Analysis
          </h3>
          <div className="absolute left-[39px] top-16 bottom-0 w-1 bg-indigo-200 -z-10 hidden md:block rounded-full"></div>
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 border-l-8 border-l-indigo-500 flex flex-col gap-4 relative z-0 ml-0 md:ml-6"
            >
              <div className="absolute -left-10 md:-left-12 top-6 w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center shadow-md hidden md:flex">
                {idx + 1}
              </div>
              <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
              <p className="text-gray-600 text-lg">{step.explain}</p>
              
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-lg mt-2">
                <span className="font-semibold text-indigo-900">Calculated Result: </span>
                <span className="font-bold text-indigo-700">
                  {"{ " + step.result.join(", ") + " }"}
                </span>
              </div>

              {step.grid && (
                <div className="mt-6 overflow-x-auto w-full">
                  <table className="border-collapse border border-gray-300 text-lg shadow-sm mx-auto min-w-[50%] bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-6 py-4 font-bold text-gray-800 bg-gray-200"></th>
                        {step.grid.r2.map((b, i) => (
                          <th
                            key={`h-${i}`}
                            className="border border-gray-300 px-6 py-4 font-bold text-indigo-800 bg-indigo-50"
                          >
                            {b}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {step.grid.r1.map((a, i) => (
                        <tr
                          key={`r-${i}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <th className="border border-gray-300 px-6 py-4 font-bold text-indigo-800 bg-indigo-50">
                            {a}
                          </th>
                          {step.grid!.r2.map((b, j) => (
                            <td
                              key={`c-${i}-${j}`}
                              className="border border-gray-300 px-6 py-4 text-center font-medium text-gray-600"
                            >
                              ({a},{b})
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
