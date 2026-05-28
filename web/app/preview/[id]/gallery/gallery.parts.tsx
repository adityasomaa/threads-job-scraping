"use client";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/site/ImageWithFallback";

export function GalleryAnim({
  eyebrow,
  headline,
  caption,
  photos,
}: {
  eyebrow: string;
  headline: string;
  caption: string;
  photos: string[];
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
        className="text-4xl md:text-6xl leading-[1.05] max-w-3xl"
      >
        {headline}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-lg max-w-2xl leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {caption}
      </motion.p>

      <div className="mt-16 grid grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
        {photos.map((src, i) => {
          const spans = [
            "col-span-8 row-span-2",
            "col-span-4 row-span-1",
            "col-span-4 row-span-1",
            "col-span-6 row-span-2",
            "col-span-6 row-span-1",
            "col-span-6 row-span-1",
          ];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              className={`${spans[i % spans.length]} overflow-hidden cursor-zoom-in`}
              style={{ borderRadius: "var(--radius)" }}
            >
              <ImageWithFallback
                src={src}
                alt={`Gallery photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
