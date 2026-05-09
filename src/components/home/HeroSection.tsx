"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Search,
  BrainCircuit,
  FileText,
} from "lucide-react";

const prompts = [
  {
    query: "Generate DBMS revision notes",
    result: "AI generated concise DBMS revision summary",
  },
  {
    query: "Create 5-mark answer on normalization",
    result: "Generated university-style structured answer",
  },
  {
    query: "Summarize Operating System unit 3",
    result: "AI summarized key concepts and definitions",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let current = 0;

    setTyped("");
    setShowResult(false);

    const currentPrompt = prompts[index].query;

    const interval = setInterval(() => {
      current++;

      setTyped(currentPrompt.slice(0, current));

      if (current === currentPrompt.length) {
        clearInterval(interval);

        setTimeout(() => {
          setShowResult(true);
        }, 1000);
      }
    }, 50);

    const next = setTimeout(() => {
      setIndex((prev) => (prev + 1) % prompts.length);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(next);
    };
  }, [index]);

  return (
    <section id="home" className="relative flex min-h-screen items-center px-12 py-10">

      <div className="grid w-full items-center gap-12 lg:grid-cols-2">

        {/* LEFT */}
        <div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            <Sparkles className="h-4 w-4 text-blue-400" />
            AI-Powered Exam Preparation
          </div>

          <h1 className="text-6xl font-bold leading-tight tracking-tight text-white">
            Turn PDFs into
            <span className="text-blue-500"> Smart AI Notes</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Upload study materials and instantly generate
            summaries, revision notes, and exam-focused answers.
          </p>

          <div className="mt-10 flex gap-4">

            <button className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
              Get Started
            </button>

            <button className="rounded-2xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:bg-zinc-900/50">
              Watch Demo
            </button>

          </div>

        </div>

        {/* RIGHT AI INTERACTION */}
        <div className="relative hidden lg:flex items-center justify-center">

          <div className="w-[500px] rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">

            {/* Search Bar */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4">

              <Search className="h-5 w-5 text-zinc-400" />

              <div className="text-zinc-300">
                {typed}
                <span className="animate-pulse">|</span>
              </div>

            </div>

            {/* Searching */}
            {!showResult && (
              <div className="mt-6 flex items-center gap-3 text-zinc-400">

                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

                AI searching through notes...

              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 animate-in fade-in duration-500">

                <div className="mb-4 flex items-center gap-2">

                  <BrainCircuit className="h-5 w-5 text-violet-400" />

                  <p className="font-medium text-white">
                    AI Generated Result
                  </p>

                </div>

                <div className="space-y-3">

                  <div className="rounded-xl bg-white/5 p-4 text-sm text-zinc-300">
                    {prompts[index].result}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-blue-500/10 p-4 text-sm text-blue-200">
                    • Retrieved from uploaded PDFs
                  </div>

                  <div className="rounded-xl bg-white/5 p-4 text-sm text-zinc-300">
                    • Optimized for exam preparation
                  </div>

                </div>

              </div>
            )}

            {/* Floating Upload Card */}
            <div className="absolute -right-8 -top-8 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-500/20 p-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>

                <div>

                  <p className="text-sm font-medium text-white">
                    PDF Uploaded
                  </p>

                  <p className="text-xs text-zinc-400">
                    124 pages processed
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}