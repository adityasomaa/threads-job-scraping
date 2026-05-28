"use client";
import { motion } from "framer-motion";
import { CATEGORY_META, type Category } from "@/lib/types";

export function FilterBar({
  active,
  counts,
  onChange,
}: {
  active: Category | "all";
  counts: Record<string, number>;
  onChange: (c: Category | "all") => void;
}) {
  const cats: (Category | "all")[] = [
    "all",
    "web-dev",
    "fullstack",
    "ai",
    "mobile",
    "automation",
    "data",
    "other",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {cats.map((c) => {
        const label = c === "all" ? "All" : CATEGORY_META[c].label;
        const count = c === "all" ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[c] || 0;
        const isActive = active === c;
        return (
          <motion.button
            key={c}
            onClick={() => onChange(c)}
            whileTap={{ scale: 0.96 }}
            className={`relative px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              isActive
                ? "bg-white text-ink"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
            <span className={`ml-2 text-[10px] ${isActive ? "text-ink/60" : "text-white/40"}`}>
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
