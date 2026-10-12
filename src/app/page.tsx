"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ChapterExamples {
  html_files: string[];
  images: string[];
}

interface ChapterExercises {
  [exerciseId: string]: string[];
}

interface ContentIndex {
  examples: Record<string, ChapterExamples>;
  exercises: Record<string, ChapterExercises>;
}

const chapterList = [
  { name: "Relation and Functions", slug: "chapter_1_html" },
  { name: "Numbers and Sequences", slug: "chapter_2_html" },
  { name: "Algebra", slug: "chapter_3_html" },
  { name: "Geometry", slug: "chapter_4_html" },
  { name: "Coordinate Geometry", slug: "chapter_5_html" },
  { name: "Trigonometry", slug: "chapter_6_html" },
  { name: "Mensuration", slug: "chapter_7_html" },
  { name: "Statistics and Probability", slug: "chapter_8_html" },
];

export default function Home() {
  const [data, setData] = useState<ContentIndex | null>(null);

  useEffect(() => {
    fetch("/content_index.json")
      .then((res) => res.json())
      .then((json: ContentIndex) => setData(json));
  }, []);

  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-xl font-medium text-gray-500">Loading your mathematics journey...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        {/* Modern Hero Section */}
        <header className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200 p-8 md:p-16 mb-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[400px] h-[400px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-sm">
              Welcome to the future of learning
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Master Math with <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Interactive Learning
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              Your personal toolkit and guide to mastering mathematics. Explore chapters, visualize complex formulas natively, and practice exercises seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#tools" className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
                Explore Tools <span className="opacity-80">↓</span>
              </a>
              <a href="#chapters" className="px-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center">
                View Chapters
              </a>
            </div>
          </div>

          <div className="relative z-10 hidden md:flex items-center justify-center p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border-2 border-white shadow-inner flex-shrink-0">
             <Image src="/hero_math.png" alt="Math Tutor App" width={300} height={300} className="object-cover rounded-3xl drop-shadow-xl animate-fade-in" />
          </div>
        </header>

        {/* Tools Section */}
        <section id="tools" className="mb-20 scroll-mt-10">
          <div className="flex flex-col mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Visualizers</h2>
            <p className="text-slate-500 mt-2 text-lg">Hands-on tools to help you intuitively understand core math concepts.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/composition" className="group block">
              <div className="flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                <div className="flex items-center gap-5 mb-5 relative z-10">
                  <span className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    ƒ(x)
                  </span>
                  <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors">
                    Function Composition
                  </h3>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">
                  Visualize and understand how functions can be chained together step-by-step through a pipeline.
                </p>
              </div>
            </Link>

            <Link href="/cartesian-product" className="group block">
              <div className="flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                <div className="flex items-center gap-5 mb-5 relative z-10">
                  <span className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-xl shadow-sm group-hover:scale-110 transition-transform">
                    A×B
                  </span>
                  <h3 className="font-bold text-xl text-slate-800 group-hover:text-emerald-700 transition-colors">
                    Cartesian Product
                  </h3>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">
                  Generate the comprehensive cross-product of subsets with interactive grid matrix and arrow views.
                </p>
              </div>
            </Link>

            <Link href="/arrow-diagram" className="group block">
              <div className="flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                <div className="flex items-center gap-5 mb-5 relative z-10">
                  <span className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold text-xl shadow-sm group-hover:scale-110 transition-transform">
                    a➜x
                  </span>
                  <h3 className="font-bold text-xl text-slate-800 group-hover:text-purple-700 transition-colors">
                    Arrow Diagram Tester
                  </h3>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">
                  Interactively map inputs to outputs to visually verify if the relations form a valid bounding function.
                </p>
              </div>
            </Link>

            <Link href="/set-expression" className="group block">
              <div className="flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                <div className="flex items-center gap-5 mb-5 relative z-10">
                  <span className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-xl shadow-sm group-hover:scale-110 transition-transform">
                    A∪B
                  </span>
                  <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                    Set Expression Visualizer
                  </h3>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">
                  Evaluate complete mathematical set expressions and logic operations dynamically step-by-step.
                </p>
              </div>
            </Link>

            <Link href="/types-of-functions" className="group block">
              <div className="flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-sky-200 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                <div className="flex items-center gap-5 mb-5 relative z-10">
                  <span className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 text-white font-bold text-2xl shadow-sm group-hover:scale-110 transition-transform font-serif italic">
                    x
                  </span>
                  <h3 className="font-bold text-xl text-slate-800 group-hover:text-sky-700 transition-colors">
                    Types of Functions
                  </h3>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">
                  Explore and classify mathematical relationships strictly (One-to-One, Onto, Into logic rules).
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="chapters" className="scroll-mt-10">
          <div className="flex flex-col mb-8 border-t border-slate-200 pt-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Course Chapters</h2>
            <p className="text-slate-500 mt-2 text-lg">Study materials and practice modules sorted chronologically by topic.</p>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapterList.map((chapter, index) => (
              <li
                key={chapter.slug}
                className="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent flex rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                
                <div className="flex-grow relative z-10">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold text-xl shadow-sm group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <h2 className="font-bold text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                      {chapter.name}
                    </h2>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                  <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/chapter/${chapter.slug}/examples`}
                    className="w-full sm:flex-1 inline-flex justify-center items-center bg-slate-50 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-700 text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow"
                  >
                    View Examples
                  </Link>

                  <Link
                    href={`/chapter/${chapter.slug}/exercises`}
                    className="w-full sm:flex-1 inline-flex justify-center items-center bg-slate-50 border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 text-slate-700 text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow"
                  >
                    View Exercises
                  </Link>
                </div>

                {(
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    <a
                      href={`/unit${index + 1}/theory.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white text-blue-700 text-sm font-bold py-3 px-4 rounded-xl transition-all"
                    >
                      Theory
                    </a>

                    <a
                      href={`/unit${index + 1}/formulas.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center bg-emerald-50 border border-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-700 text-sm font-bold py-3 px-4 rounded-xl transition-all"
                    >
                      Formulas
                    </a>

                    <a
                      href={`/unit${index + 1}/sample_questions.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center bg-purple-50 border border-purple-100 hover:bg-purple-600 hover:text-white text-purple-700 text-sm font-bold py-3 px-4 rounded-xl transition-all"
                    >
                      Sample Questions
                    </a>
                  </div>
                )}
              </div>
              </li>
            ))}
          </ul>
        </section>
        
        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Math Tutor. Empowering mathematical education.</p>
        </footer>
      </div>
    </main>
  );
}