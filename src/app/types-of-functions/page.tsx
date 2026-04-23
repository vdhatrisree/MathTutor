import Link from "next/link";
import UniversalFunctionVisualizer from "../components/UniversalFunctionVisualizer";

export default function TypesOfFunctionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="p-6 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
          >
            <span>←</span> Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Advanced Function Types</h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-12 px-4 shadow-sm my-12 bg-white rounded-3xl border border-slate-100">
        <div className="mb-10 text-center px-4">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Function Classification</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Determine if a function is <strong>Injective</strong>, <strong>Surjective</strong>, or <strong>Bijective</strong> by drawing its arrow diagram.
          </p>
        </div>
        
        <UniversalFunctionVisualizer mode="advanced" />
      </div>
    </main>
  );
}
