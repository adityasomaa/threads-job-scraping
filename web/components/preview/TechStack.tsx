"use client";
import { motion } from "framer-motion";

export function TechStack({ items, accent }: { items: string[]; accent: string }) {
  return (
    <section className="mt-24">
      <p className="text-[12px] uppercase tracking-widest text-white/40 mb-3">
        Stack
      </p>
      <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
        Modern, proven tools.
      </h2>

      <div className="mt-10 flex flex-wrap gap-2">
        {items.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -2, borderColor: accent }}
            className="px-4 py-2 rounded-full border border-white/10 bg-ink-soft/50 text-sm text-white/80 transition-colors"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
