import {
  BrainCircuit,
  FileText,
  Sparkles,
} from "lucide-react";

export default function FeatureSection() {
  return (
    <section id="features" className="relative px-12 py-16">

      {/* Heading */}
      <div className="mx-auto mb-10 max-w-3xl text-center">

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
          Features
        </p>

        <h2 className="text-6xl font-bold leading-tight tracking-tight text-white">
          Study smarter
          <br />
          with AI-powered workflows
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Upload notes, generate exam-focused answers,
          and organize revision material instantly.
        </p>

      </div>

      {/* Grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Card 1 */}
        <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 p-10 backdrop-blur-xl">

          {/* Glow */}
          <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl transition duration-500 group-hover:scale-125" />

          <div className="relative z-10">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">

              <FileText className="h-7 w-7 text-blue-400" />

            </div>

            <h3 className="text-3xl font-semibold text-white">
              Upload PDFs
            </h3>

            <p className="mt-4 max-w-md text-zinc-400 leading-relaxed">
              Upload lecture notes, textbooks, and study material
              for instant AI-powered analysis and retrieval.
            </p>

            {/* Bottom Visual */}
            <div className="mt-16 h-52 rounded-[28px] border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/10 backdrop-blur-xl" />

          </div>

        </div>

        {/* Card 2 */}
        <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 p-10 backdrop-blur-xl">

          {/* Glow */}
          <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl transition duration-500 group-hover:scale-125" />

          <div className="relative z-10">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">

              <BrainCircuit className="h-7 w-7 text-violet-400" />

            </div>

            <h3 className="text-3xl font-semibold text-white">
              AI Generates Answers
            </h3>

            <p className="mt-4 max-w-md text-zinc-400 leading-relaxed">
              Generate concise revision notes, summaries,
              and university-style exam answers instantly.
            </p>

            {/* Fake AI Output */}
            <div className="mt-16 space-y-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                • 5-mark answer generated successfully
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                • AI summarized Unit 3 in 12 bullet points
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                • Revision notes optimized for exams
              </div>

            </div>

          </div>

        </div>

        {/* Card 3 Full Width */}
        <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 p-10 backdrop-blur-xl lg:col-span-2">

          {/* Glow */}
          <div className="absolute bottom-0 right-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:scale-110" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}
            <div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <Sparkles className="h-7 w-7 text-cyan-400" />

              </div>

              <h3 className="text-4xl font-semibold text-white">
                Smart Revision Workflow
              </h3>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
                Organize subjects, generate revision plans,
                and quickly retrieve important concepts
                from uploaded notes using semantic AI search.
              </p>

            </div>

            {/* Right Visual */}
            <div className="relative">

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <div className="space-y-4">

                  <div className="rounded-2xl bg-blue-500/10 p-4 text-blue-200">
                    DBMS Revision Notes Generated
                  </div>

                  <div className="rounded-2xl bg-violet-500/10 p-4 text-violet-200">
                    2-Mark Questions Prepared
                  </div>

                  <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-200">
                    AI Retrieval Completed
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}