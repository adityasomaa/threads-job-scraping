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
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-16">
        {city && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] mb-8"
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
          className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-5xl"
        >
          {hero}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 grid md:grid-cols-12 gap-8 items-end"
        >
          <p
            className="md:col-span-7 text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {tagline}
          </p>
          <div className="md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end">
            <Link
              href={`/preview/${jobId}/services`}
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
          </div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        <div
          className="relative aspect-[16/9] md:aspect-[21/9] mx-auto max-w-7xl overflow-hidden"
          style={{ borderRadius: "var(--radius)" }}
        >
          <ImageWithFallback
            src={heroImage}
            alt={hero}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto px-6 mt-20 md:mt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-4xl leading-tight max-w-3xl"
          style={{ color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "var(--letter-spacing)" }}
        >
          {intro}
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-20 md:mt-28 grid md:grid-cols-3 gap-4 md:gap-6">
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
