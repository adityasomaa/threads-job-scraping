"use client";
import { motion } from "framer-motion";

export interface Phase {
  label: string;
  duration: string;
  body: string;
}

export function Timeline({ phases, accent }: { phases: Phase[]; accent: string }) {
  return (
    <section className="mt-24">
      <p className="text-[12px] uppercase tracking-widest text-white/40 mb-3">
        Timeline
      </p>
      <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
        How we'll get there.
      </h2>

      <div className="mt-12 relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
        <div className="space-y-8">
          {phases.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-12"
            >
              <div
                className="absolute left-0 top-1.5 size-6 rounded-full border-2 flex items-center justify-center text-[10px] font-mono"
                style={{ borderColor: accent, color: accent, background: "#0a0a0a" }}
              >
                {i + 1}
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-xl font-display font-semibold">{p.label}</h3>
                <span className="text-[12px] font-mono text-white/40">{p.duration}</span>
              </div>
              <p className="mt-2 text-white/55 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
