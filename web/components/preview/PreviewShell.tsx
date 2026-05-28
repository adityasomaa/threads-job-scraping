"use client";
import { motion } from "motion/react";
import type { Job } from "@/lib/types";

export function PreviewShell({
  job,
  accent,
  children,
}: {
  job: Job;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-[520px] -z-10 blur-3xl opacity-40"
        style={{
          background: `radial-gradient(closest-side, ${accent}, transparent 70%)`,
        }}
      />
      <div className="dotted absolute inset-0 -z-20 opacity-50" />

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between text-[12px] text-white/40"
        >
          <span>Proposal preview for @{job.author || "you"}</span>
          <a
            href={job.postUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            ← view original post
          </a>
        </motion.div>

        {children}

        <ContactFooter job={job} />
      </div>
    </main>
  );
}

function ContactFooter({ job }: { job: Job }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-24 rounded-3xl border border-white/10 bg-ink-soft/40 p-8 md:p-12 backdrop-blur-sm"
    >
      <div className="grid md:grid-cols-2 gap-8 items-end">
        <div>
          <p className="text-[12px] uppercase tracking-widest text-white/40 mb-3">
            Next step
          </p>
          <h3 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            Let's turn this into something real.
          </h3>
          <p className="mt-4 text-white/60 max-w-md">
            I built this preview specifically for your post. Reply on Threads or
            hit me on the channels below — I can start within 24 hours.
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={job.postUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center px-6 py-4 rounded-2xl bg-white text-ink font-semibold hover:bg-white/90 transition"
          >
            Reply on Threads →
          </a>
          <div className="text-[12px] text-white/40 text-center">
            or DM me on Threads / WhatsApp · response within 1 hour
          </div>
        </div>
      </div>
    </motion.section>
  );
}
