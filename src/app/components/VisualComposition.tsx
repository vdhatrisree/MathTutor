"use client";

import { useState } from "react";

export default function VisualComposition() {
  const [x, setX] = useState<number | null>(null);
  const [gResult, setGResult] = useState<number | null>(null);
  const [fResult, setFResult] = useState<number | null>(null);

  const compose = (inputX: number) => {
    const g = inputX + 2;
    const f = g * g;

    setX(inputX);
    setGResult(g);
    setFResult(f);
  };

  const reset = () => {
    setX(null);
    setGResult(null);
    setFResult(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-12 px-4 font-sans text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center">
        Function Composition Visualizer
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl text-center text-lg">
        Function composition is applying one function to the results of another. We write this as <strong>f(g(x))</strong>, which means we first evaluate the inner function <strong>g(x)</strong> and then use its result as the input for the outer function <strong>f(x)</strong>.
      </p>

      {/* Interactive Pipeline */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mt-6 w-full relative">
        {/* Input Block */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-500 mb-2">Input (x)</div>
          <div
            className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-3xl font-bold rounded-xl shadow-md transition-all duration-500 ${
              x !== null
                ? "bg-[#ffd27f] border-[#c48b3c] scale-110"
                : "bg-orange-100 border-orange-300"
            } border-4 relative`}
          >
            {x !== null ? x : "x"}
          </div>
        </div>

        <div className="text-4xl text-gray-400 font-bold rotate-90 md:rotate-0 mt-6 md:mt-0">
          →
        </div>

        {/* Machine g(x) */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-500 mb-2">Inner Function g(x)</div>
          <div
            className={`w-36 h-36 md:w-48 md:h-48 flex flex-col items-center justify-center rounded-xl shadow-md transition-all duration-500 ${
              gResult !== null
                ? "bg-[#ffedaa] border-[#d49942] scale-110"
                : "bg-amber-100 border-amber-300"
            } border-4 relative`}
          >
            <span className="text-md md:text-lg font-semibold text-gray-800 mb-2">
              g(x) = x + 2
            </span>
            <div className="text-xl md:text-2xl font-bold text-blue-700 h-8 flex items-center bg-white/50 px-4 py-1 rounded-full">
              {gResult !== null ? `g(${x}) = ${gResult}` : "Waiting..."}
            </div>
          </div>
        </div>

        <div className="text-4xl text-gray-400 font-bold rotate-90 md:rotate-0 mt-6 md:mt-0">
          →
        </div>

        {/* Machine f(x) */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-500 mb-2">Outer Function f(x)</div>
          <div
            className={`w-36 h-36 md:w-48 md:h-48 flex flex-col items-center justify-center rounded-xl shadow-md transition-all duration-500 ${
              fResult !== null
                ? "bg-[#ffedaa] border-[#d49942] scale-110"
                : "bg-amber-100 border-amber-300"
            } border-4 relative`}
          >
            <span className="text-md md:text-lg font-semibold text-gray-800 mb-2">
              f(x) = x²
            </span>
            <div className="text-xl md:text-2xl font-bold text-blue-700 h-8 flex items-center bg-white/50 px-4 py-1 rounded-full">
              {fResult !== null ? `f(${gResult}) = ${fResult}` : "Waiting..."}
            </div>
          </div>
        </div>

        <div className="text-4xl text-gray-400 font-bold rotate-90 md:rotate-0 mt-6 md:mt-0">
          →
        </div>

        {/* Output Block */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-500 mb-2">Final Result</div>
          <div
            className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-3xl font-bold rounded-xl shadow-md transition-all duration-500 ${
              fResult !== null
                ? "bg-[#ffd27f] border-[#c48b3c] scale-110"
                : "bg-orange-100 border-orange-300"
            } border-4 relative`}
          >
            {fResult !== null ? fResult : "?"}
          </div>
        </div>
      </div>

      {/* Didactic Step-by-Step Breakdown */}
      {x !== null && fResult !== null && (
        <div className="mt-16 bg-blue-50 border-l-8 border-blue-500 p-6 rounded-r-xl w-full max-w-2xl shadow-sm animate-fade-in">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Step-by-Step Breakdown:</h3>
          <ol className="list-decimal list-inside space-y-3 text-lg text-blue-800 font-medium">
            <li>You chose the starting input <strong className="text-indigo-700">x = {x}</strong>.</li>
            <li>First, substitute <strong className="text-indigo-700">{x}</strong> into the inner function <strong>g(x) = x + 2</strong>.
              <br/><span className="pl-6 text-gray-600 block mt-1">Calculation: g({x}) = {x} + 2 = <strong className="text-indigo-700">{gResult}</strong></span>
            </li>
            <li>Next, take the result (<strong className="text-indigo-700">{gResult}</strong>) and substitute it into the outer function <strong>f(x) = x²</strong>.
              <br/><span className="pl-6 text-gray-600 block mt-1">Calculation: f({gResult}) = ({gResult})² = <strong className="text-indigo-700">{fResult}</strong></span>
            </li>
          </ol>
          <div className="mt-6 pt-4 border-t border-blue-200 text-center text-2xl font-bold text-blue-900">
            Therefore, f(g({x})) = {fResult}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-2xl">
        <h3 className="text-xl font-bold text-gray-700 mb-6">
          Interactive Controls: Select an Input (x)
        </h3>
        <div className="flex gap-6">
          {[1, 2, 3].map((val) => (
            <button
              key={val}
              onClick={() => compose(val)}
              className={`w-16 h-16 md:w-20 md:h-20 text-2xl font-bold rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center ${
                x === val
                  ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-300 ring-opacity-50"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              {val}
            </button>
          ))}
        </div>

        {fResult !== null && (
          <button
            onClick={reset}
            className="mt-8 px-8 py-3 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg font-bold transition-all"
          >
            Reset Pipeline
          </button>
        )}
      </div>

    </div>
  );
}
