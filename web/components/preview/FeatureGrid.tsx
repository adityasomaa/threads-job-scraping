"use client";
import { motion } from "motion/react";

export interface Feature {
  title: string;
  body: string;
  icon: string;
}

export function FeatureGrid({ features, accent }: { features: Feature[]; accent: string }) {
  return (
    <section className="mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[12px] uppercase tracking-widest text-white/40 mb-3">
          What you get
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
          Built around your brief.
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative p-6 rounded-2xl border border-white/10 bg-ink-soft/40 backdrop-blur-sm hover:border-white/20 transition-colors"
          >
            <div
              className="size-10 rounded-xl flex items-center justify-center text-xl mb-4"
              style={{ background: accent + "20", color: accent }}
            >
              {f.icon}
            </div>
            <h3 className="text-lg font-display font-semibold">{f.title}</h3>
            <p className="mt-2 text-[14px] text-white/55 leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
