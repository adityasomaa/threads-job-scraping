"use client";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/site/ImageWithFallback";

export function AboutAnim({
  eyebrow,
  headline,
  body,
  values,
  photo,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  values: { title: string; body: string }[];
  photo: string;
}) {
  const paragraphs = body.split(/\n\n+/);

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
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
      >
        {headline}
      </motion.h1>

      <div className="mt-16 md:mt-24 grid md:grid-cols-5 gap-8 md:gap-14">
        <div className="md:col-span-3 space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: i === 0 ? "var(--text)" : "var(--text-muted)" }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 aspect-[4/5] overflow-hidden"
          style={{ borderRadius: "var(--radius)" }}
        >
          <ImageWithFallback src={photo} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <section className="mt-28 md:mt-36">
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 md:p-10"
              style={{ background: "var(--surface)" }}
            >
              <p className="text-xs font-mono mb-6" style={{ color: "var(--accent)" }}>
                / 0{i + 1}
              </p>
              <h3 className="text-2xl mb-3">{v.title}</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
