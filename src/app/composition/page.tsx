import VisualComposition from "../components/VisualComposition";
import Link from "next/link";

export default function CompositionPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Function Tools
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Interactive visualization for understanding how functions can be
              composed together.
            </p>
          </header>

          <div className="border-t border-gray-100 pt-8 mt-2">
            <VisualComposition />
          </div>
        </div>
      </div>
    </main>
  );
}
