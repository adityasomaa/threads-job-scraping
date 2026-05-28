"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/site/ImageWithFallback";

export function HomeAnim({
  hero,
  tagline,
  intro,
  cta,
  highlights,
  heroImage,
  city,
  isID,
  jobId,
  sectionLabel,
}: {
  hero: string;
  tagline: string;
  intro: string;
  cta: string;
  highlights: { title: string; body: string }[];
  heroImage: string;
  city: string | null;
  isID: boolean;
  jobId: string;
  sectionLabel: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ImageWithFallback src={heroImage} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--bg) 92%, transparent) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 40%, transparent 80%)",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 md:pt-36 md:pb-40 min-h-[78vh] flex flex-col justify-end">
          {city && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="size-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              {city}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl"
          >
            {hero}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-2xl max-w-2xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href={`/preview/${jobId}/${sectionLabel.toLowerCase().includes("menu") ? "services" : "services"}`}
              className="inline-flex items-center px-7 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: "var(--radius)",
              }}
            >
              {cta}
            </Link>
            <Link
              href={`/preview/${jobId}/contact`}
              className="inline-flex items-center px-7 py-3.5 text-sm font-medium border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                borderRadius: "var(--radius)",
              }}
            >
              {isID ? "Hubungi kami" : "Get in touch"}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-24 md:mt-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-xl md:text-3xl max-w-3xl leading-relaxed"
          style={{ color: "var(--text)" }}
        >
          {intro}
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-24 md:mt-32 grid md:grid-cols-3 gap-4 md:gap-6">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 md:p-8 border"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              borderRadius: "var(--radius)",
            }}
          >
            <div
              className="size-8 mb-5 rounded-full flex items-center justify-center text-xs font-mono"
              style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              0{i + 1}
            </div>
            <h3 className="text-xl md:text-2xl mb-3">{h.title}</h3>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {h.body}
            </p>
          </motion.div>
        ))}
      </section>
    </>
  );
}
