"use client";
import { motion } from "framer-motion";
import type { Job } from "@/lib/types";

export function Hero({
  job,
  eyebrow,
  title,
  subtitle,
}: {
  job: Job;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <section className="pt-16 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-widest text-white/70 mb-6"
      >
        <span className="size-1.5 rounded-full bg-accent animate-pulse" />
        {eyebrow}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] tracking-tight"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed"
      >
        {subtitle}
      </motion.p>

      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 max-w-2xl border-l-2 border-white/20 pl-5 text-[15px] text-white/45 leading-relaxed italic"
      >
        "{job.excerpt}"
        <span className="block mt-2 not-italic text-white/30 text-[12px]">
          — from your post on Threads
        </span>
      </motion.blockquote>
    </section>
  );
}
