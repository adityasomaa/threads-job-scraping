import { loadJobs } from "@/lib/jobs";
import { DashboardClient } from "@/components/DashboardClient";

export const dynamic = "force-static";

export default function Page() {
  const { jobs, updatedAt } = loadJobs();

  return (
    <main className="min-h-screen dotted">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-widest text-white/60 mb-6">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Threads job pipeline
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight">
            Live job board
            <br />
            <span className="text-white/40">from Threads.</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/60 leading-relaxed">
            Auto-scraped IT, web dev, AI and software development opportunities.
            Click any card to see a personalized proposal preview you can share with the poster.
          </p>
        </header>

        <DashboardClient jobs={jobs} updatedAt={updatedAt} />
      </div>
    </main>
  );
}
