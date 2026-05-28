"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { JobCard } from "./JobCard";
import { FilterBar } from "./FilterBar";
import type { Category, Job } from "@/lib/types";

export function DashboardClient({ jobs, updatedAt }: { jobs: Job[]; updatedAt: string }) {
  const [active, setActive] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    return jobs.reduce<Record<string, number>>((acc, j) => {
      acc[j.category] = (acc[j.category] || 0) + 1;
      return acc;
    }, {});
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (active !== "all" && j.category !== active) return false;
      if (q && !j.text.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [jobs, active, query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <FilterBar active={active} counts={counts} onChange={setActive} />
        <input
          placeholder="Search posts…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
        />
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-white/40"
        >
          <p className="text-lg">No jobs match your filters.</p>
          <p className="text-sm mt-2">
            Run <code className="bg-white/5 px-2 py-0.5 rounded text-accent">npm run scrape</code> to fetch new posts.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j, i) => (
            <JobCard key={j.id} job={j} index={i} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center text-[11px] text-white/30">
        Last updated {new Date(updatedAt).toLocaleString()} · {jobs.length} total jobs
      </div>
    </>
  );
}
