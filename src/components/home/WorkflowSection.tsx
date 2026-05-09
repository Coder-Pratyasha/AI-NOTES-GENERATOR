import {
  Upload,
  BrainCircuit,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function WorkflowSection() {
  return (
    <section id="workflow" className="relative flex min-h-screen items-center px-12 py-20">

      <div className="w-full">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Workflow
          </p>

          <h2 className="text-5xl font-bold leading-tight tracking-tight text-white">
            From PDFs to
            <br />
            AI-generated exam notes
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            A seamless AI workflow designed for faster
            revision and smarter exam preparation.
          </p>

        </div>

        {/* Workflow Cards */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Step 1 */}
          <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-xl">

            <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl transition duration-500 group-hover:scale-125" />

            <div className="relative z-10">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">

                <Upload className="h-7 w-7 text-blue-400" />

              </div>

              <p className="mb-3 text-sm font-medium text-blue-400">
                STEP 01
              </p>

              <h3 className="text-3xl font-semibold text-white">
                Upload Notes
              </h3>

              <p className="mt-4 text-zinc-400 leading-relaxed">
                Upload PDFs, lecture slides,
                handwritten notes, and study material.
              </p>

            </div>

          </div>

          {/* Step 2 */}
          <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-xl">

            <div className="absolute -top-16 right-0 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl transition duration-500 group-hover:scale-125" />

            <div className="relative z-10">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">

                <BrainCircuit className="h-7 w-7 text-violet-400" />

              </div>

              <p className="mb-3 text-sm font-medium text-violet-400">
                STEP 02
              </p>

              <h3 className="text-3xl font-semibold text-white">
                AI Processing
              </h3>

              <p className="mt-4 text-zinc-400 leading-relaxed">
                AI analyzes content using embeddings,
                retrieval, and semantic search.
              </p>

            </div>

          </div>

          {/* Step 3 */}
          <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-xl">

            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl transition duration-500 group-hover:scale-125" />

            <div className="relative z-10">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <FileText className="h-7 w-7 text-cyan-400" />

              </div>

              <p className="mb-3 text-sm font-medium text-cyan-400">
                STEP 03
              </p>

              <h3 className="text-3xl font-semibold text-white">
                Generate Notes
              </h3>

              <p className="mt-4 text-zinc-400 leading-relaxed">
                Instantly create summaries,
                revision notes, and exam answers.
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Flow Line */}
        <div className="mt-12 hidden items-center justify-center gap-6 lg:flex">

          <div className="h-px w-24 bg-white/10" />

          <ArrowRight className="h-5 w-5 text-zinc-500" />

          <div className="h-px w-24 bg-white/10" />

          <ArrowRight className="h-5 w-5 text-zinc-500" />

          <div className="h-px w-24 bg-white/10" />

        </div>

      </div>

    </section>
  );
}