"use client";
import { motion } from "motion/react";
import type { Job } from "@/lib/types";

export function PreviewBanner({ job }: { job: Job }) {
  const isID = job.enrichment?.language === "id";
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[11px] py-2 px-4 text-center"
      style={{
        background: "color-mix(in srgb, var(--accent) 92%, white)",
        color: "var(--bg)",
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ fontFamily: "var(--font-body)" }}>
        {isID ? (
          <>
            <strong>Preview untuk @{job.author}</strong> · dibuat oleh Aditya berdasarkan post Threads-mu ·{" "}
            <a href={job.postUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              balas di Threads →
            </a>
          </>
        ) : (
          <>
            <strong>Preview for @{job.author}</strong> · built by Aditya based on your Threads post ·{" "}
            <a href={job.postUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              reply on Threads →
            </a>
          </>
        )}
      </span>
    </motion.div>
  );
}
