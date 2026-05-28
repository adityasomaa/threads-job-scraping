"use client";
import { motion } from "motion/react";

export function ServicesAnim({
  eyebrow,
  headline,
  intro,
  items,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  items: { name: string; desc: string; price?: string }[];
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[11px] uppercase tracking-[0.25em] mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
      >
        {headline}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {intro}
      </motion.p>

      <section className="mt-16 md:mt-24 grid gap-px" style={{ background: "var(--border)" }}>
        {items.map((it, i) => (
          <motion.article
            key={it.name + i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className="px-6 md:px-10 py-8 md:py-10 grid md:grid-cols-12 gap-6 items-baseline"
            style={{ background: "var(--surface)" }}
          >
            <div className="md:col-span-1">
              <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>
                0{i + 1}
              </span>
            </div>
            <h3 className="md:col-span-4 text-2xl md:text-3xl">{it.name}</h3>
            <p
              className="md:col-span-5 text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {it.desc}
            </p>
            <div className="md:col-span-2 md:text-right">
              {it.price ? (
                <span
                  className="inline-block text-sm font-mono px-3 py-1.5"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {it.price}
                </span>
              ) : null}
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
