"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { CATEGORY_META, type Job } from "@/lib/types";

export function JobCard({ job, index }: { job: Job; index: number }) {
  const meta = CATEGORY_META[job.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.4), ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-soft/60 backdrop-blur-sm p-5 hover:border-white/10 transition-colors"
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${meta.gradient}`}
      />

      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium ${meta.color}`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {meta.label}
        </span>
        {job.budget && (
          <span className="text-[11px] text-white/50 font-mono">{job.budget}</span>
        )}
      </div>

      <p className="text-[15px] leading-relaxed text-white/90 line-clamp-4">
        {job.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between text-[12px]">
        <span className="text-white/40">
          @{job.author || "unknown"}
          {job.postedAt && (
            <> · {new Date(job.postedAt).toLocaleDateString()}</>
          )}
        </span>
        <Link
          href={`/preview/${job.id}`}
          className="inline-flex items-center gap-1 text-white/80 hover:text-accent transition-colors"
        >
          Preview →
        </Link>
      </div>
    </motion.div>
  );
}
