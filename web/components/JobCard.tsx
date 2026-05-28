"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { CATEGORY_META, NICHE_LABEL, type Job } from "@/lib/types";

export function JobCard({ job, index }: { job: Job; index: number }) {
  const meta = CATEGORY_META[job.category];
  const e = job.enrichment;

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

      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium ${meta.color}`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {meta.label}
        </span>
        <div className="flex items-center gap-2 text-[11px]">
          {e && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/60">
              {NICHE_LABEL[e.niche]} · {e.style}
            </span>
          )}
          {job.budget && (
            <span className="text-white/40 font-mono">{job.budget}</span>
          )}
        </div>
      </div>

      {e ? (
        <>
          <h3 className="text-lg font-display font-semibold mb-1 text-white">
            {e.businessName}
          </h3>
          <p className="text-[13px] text-white/55 line-clamp-2 mb-3">
            {e.pages.home.tagline}
          </p>
          <p className="text-[11px] text-white/30 line-clamp-2 italic">
            "{job.excerpt.slice(0, 120)}…"
          </p>
        </>
      ) : (
        <p className="text-[15px] leading-relaxed text-white/90 line-clamp-4">
          {job.excerpt}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between text-[12px]">
        <span className="text-white/40">
          @{job.author || "unknown"}
          {job.postedAt && <> · {new Date(job.postedAt).toLocaleDateString()}</>}
        </span>
        <Link
          href={`/preview/${job.id}`}
          className="inline-flex items-center gap-1 text-white/80 hover:text-accent transition-colors"
        >
          {e ? "View site →" : "Preview →"}
        </Link>
      </div>
    </motion.div>
  );
}
