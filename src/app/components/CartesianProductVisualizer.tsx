"use client";

import { useState } from "react";

export default function CartesianProductVisualizer() {
  const [setAInput, setSetAInput] = useState("1, 2, 3");
  const [setBInput, setSetBInput] = useState("4, 5");
  const [setA, setSetA] = useState<string[]>([]);
  const [setB, setSetB] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"grid" | "arrow">("grid");
  const [hasGenerated, setHasGenerated] = useState(false);

  const generate = () => {
    const arrA = setAInput
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x !== "");
    const arrB = setBInput
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x !== "");
    setSetA(arrA);
    setSetB(arrB);
    setHasGenerated(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-12 px-4 font-sans text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center">
        Cartesian Product Visualizer
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl text-center text-lg">
        The Cartesian Product of two sets, denoted as <strong className="text-green-700">A × B</strong>, represents the set of all possible ordered pairs where the first element is from Set A and the second element is from Set B.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full max-w-2xl justify-center">
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-gray-700" htmlFor="setA">
            Set A Elements
          </label>
          <input
            id="setA"
            value={setAInput}
            onChange={(e) => setSetAInput(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
            placeholder="e.g. 1, 2, 3"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-gray-700" htmlFor="setB">
            Set B Elements
          </label>
          <input
            id="setB"
            value={setBInput}
            onChange={(e) => setSetBInput(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
            placeholder="e.g. 4, 5"
          />
        </div>
      </div>

      <button
        onClick={generate}
        className="px-8 py-4 mb-8 text-lg font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"
      >
        Generate Product A × B
      </button>

      {hasGenerated && (
        <div className="w-full max-w-4xl flex flex-col items-center animate-fade-in shadow-xl rounded-2xl bg-white border border-gray-200 overflow-hidden mt-4">
          
          {/* Pedagogical Header */}
          <div className="w-full bg-green-50 p-6 flex flex-col md:flex-row justify-between items-center text-lg border-b border-green-200">
             <div className="font-semibold text-green-900">
               Size of Set A: <span className="font-bold">|A| = {setA.length}</span>
             </div>
             <div className="font-semibold text-green-900">
               Size of Set B: <span className="font-bold">|B| = {setB.length}</span>
             </div>
             <div className="font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 shadow-sm mt-4 md:mt-0">
               Total Pairs: {setA.length} × {setB.length} = {setA.length * setB.length}
             </div>
          </div>

          <div className="flex w-full bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("grid")}
              className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${
                activeTab === "grid"
                  ? "bg-white text-green-700 border-b-2 border-green-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Matrix Grid View
            </button>
            <button
              onClick={() => setActiveTab("arrow")}
              className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${
                activeTab === "arrow"
                  ? "bg-white text-green-700 border-b-2 border-green-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Relational Arrow View
            </button>
          </div>

          <div className="p-8 w-full flex flex-col items-center min-h-[300px]">
            {activeTab === "grid" && (
              <>
                <p className="text-gray-500 mb-6 italic text-center">
                  This table shows every combination systematically. The rows represent elements from Set A, and the columns represent elements from Set B.
                </p>
                <div className="overflow-x-auto w-full flex justify-center">
                  <table className="border-collapse border border-gray-300 text-lg shadow-sm mx-auto min-w-[50%] bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-6 py-4 font-bold text-gray-800 bg-gray-200">
                          A \ B
                        </th>
                        {setB.map((b, i) => (
                          <th
                            key={`head-${i}`}
                            className="border border-gray-300 px-6 py-4 font-bold text-green-800 bg-green-50"
                          >
                            {b}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {setA.map((a, i) => (
                        <tr
                          key={`row-${i}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <th className="border border-gray-300 px-6 py-4 font-bold text-blue-800 bg-blue-50">
                            {a}
                          </th>
                          {setB.map((b, j) => (
                            <td
                              key={`cell-${i}-${j}`}
                              className="border border-gray-300 px-6 py-4 text-center font-medium text-gray-600 bg-white"
                            >
                              (<span className="text-blue-700">{a}</span>, <span className="text-green-700">{b}</span>)
                            </td>
                          ))}
                        </tr>
                      ))}
                      {setA.length === 0 && (
                        <tr>
                          <td
                            colSpan={setB.length + 1}
                            className="p-4 text-center text-gray-500"
                          >
                            Set A is empty
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === "arrow" && (
              <>
                <p className="text-gray-500 mb-6 italic text-center">
                  This list explicitly maps every item from the first set to every item in the second set sequentially.
                </p>
                <div className="flex flex-col gap-4 w-full max-w-md">
                  {setA.map((a) =>
                    setB.map((b, j) => (
                      <div
                        key={`arrow-${a}-${b}-${j}`}
                        className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4 text-xl">
                          <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                            {a}
                          </span>
                          <span className="text-gray-400 font-bold">➜</span>
                          <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                            {b}
                          </span>
                        </div>
                        <div className="text-xl font-bold text-gray-800 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
                          (<span className="text-blue-700">{a}</span>, <span className="text-green-700">{b}</span>)
                        </div>
                      </div>
                    ))
                  )}
                  {(setA.length === 0 || setB.length === 0) && (
                    <p className="text-center text-gray-500 p-4 font-medium">
                      One or both sets are empty. Please enter values.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
