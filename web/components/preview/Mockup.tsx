"use client";
import { motion } from "motion/react";
import type { Category } from "@/lib/types";

export function Mockup({ category, accent }: { category: Category; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
      style={{ perspective: 1400 }}
      className="mt-16 relative"
    >
      <div
        className="absolute -inset-10 -z-10 blur-3xl opacity-40 rounded-full"
        style={{ background: accent }}
      />
      <div className="rounded-3xl border border-white/10 bg-ink-soft/80 backdrop-blur-sm shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
        <BrowserBar />
        <div className="p-6 md:p-10 min-h-[360px]">
          {renderMockup(category, accent)}
        </div>
      </div>
    </motion.div>
  );
}

function BrowserBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
      <span className="size-2.5 rounded-full bg-red-400/60" />
      <span className="size-2.5 rounded-full bg-yellow-400/60" />
      <span className="size-2.5 rounded-full bg-green-400/60" />
      <div className="ml-4 flex-1 max-w-md px-3 py-1 rounded-md bg-white/5 text-[11px] text-white/40 font-mono">
        yourproject.com
      </div>
    </div>
  );
}

function renderMockup(c: Category, accent: string) {
  switch (c) {
    case "web-dev":
      return <WebMock accent={accent} />;
    case "fullstack":
      return <FullstackMock accent={accent} />;
    case "ai":
      return <AiMock accent={accent} />;
    case "mobile":
      return <MobileMock accent={accent} />;
    case "automation":
      return <AutomationMock accent={accent} />;
    case "data":
      return <DataMock accent={accent} />;
    default:
      return <WebMock accent={accent} />;
  }
}

function WebMock({ accent }: { accent: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-3 w-32 rounded bg-white/30" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2 w-12 rounded bg-white/10" />
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 pt-6">
        <div className="space-y-3">
          <motion.div
            animate={{ width: ["60%", "80%", "70%"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="h-8 rounded bg-white/20"
          />
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="h-3 w-5/6 rounded bg-white/10" />
          <div className="h-3 w-4/6 rounded bg-white/10" />
          <div className="mt-4 inline-block px-4 py-2 rounded-full text-sm font-medium"
               style={{ background: accent, color: "#0a0a0a" }}>
            Get started
          </div>
        </div>
        <div className="aspect-square rounded-2xl"
             style={{ background: `linear-gradient(135deg, ${accent}30, transparent)` }}>
          <div className="h-full grid place-items-center text-white/30 text-sm">hero image</div>
        </div>
      </div>
    </div>
  );
}

function FullstackMock({ accent }: { accent: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-white/40 text-xs">
        <span>Dashboard</span>
        <span>•••</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["Revenue", "Users", "Orders"].map((k, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="text-[10px] uppercase text-white/40">{k}</div>
            <div className="mt-2 text-xl font-semibold" style={{ color: accent }}>
              {["$24k", "1,284", "342"][i]}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <svg viewBox="0 0 300 80" className="w-full h-20">
          <motion.path
            d="M 0 60 Q 50 30 100 40 T 200 25 T 300 35"
            stroke={accent}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

function AiMock({ accent }: { accent: string }) {
  const lines = [
    "→ Analyzing your data…",
    "✓ Found 3 trends",
    "→ Generating recommendations",
    "✓ Ready",
  ];
  return (
    <div className="space-y-3 font-mono text-sm">
      <div className="flex gap-2 text-white/50 text-xs items-center">
        <span className="size-2 rounded-full" style={{ background: accent }} />
        agent.thinking
      </div>
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.35 }}
          className="text-white/80"
        >
          {l}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-6 p-4 rounded-xl border"
        style={{ borderColor: accent + "40", background: accent + "10" }}
      >
        <div className="text-white/90 text-sm">
          Based on the conversation history, I recommend prioritizing customer
          churn analysis — engagement dropped 14% last quarter.
        </div>
      </motion.div>
    </div>
  );
}

function MobileMock({ accent }: { accent: string }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-56 h-[380px] rounded-[2.2rem] border-4 border-white/10 bg-ink overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black/70" />
        <div className="pt-10 px-4 space-y-3">
          <div className="h-6 w-24 rounded bg-white/20" />
          <div className="h-3 w-32 rounded bg-white/10" />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
            >
              <div className="size-8 rounded-full" style={{ background: accent }} />
              <div className="flex-1">
                <div className="h-2 w-20 rounded bg-white/20 mb-1" />
                <div className="h-2 w-32 rounded bg-white/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationMock({ accent }: { accent: string }) {
  const nodes = [
    { label: "Trigger", x: 0 },
    { label: "Filter", x: 33 },
    { label: "Transform", x: 66 },
    { label: "Deliver", x: 100 },
  ];
  return (
    <div className="relative h-64">
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="8%" y1="50%" x2="92%" y2="50%"
          stroke={accent}
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4 }}
        />
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.18 }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl border bg-ink-soft text-center text-sm"
          style={{ left: `${n.x}%`, borderColor: accent + "60", boxShadow: `0 0 30px ${accent}30` }}
        >
          {n.label}
        </motion.div>
      ))}
    </div>
  );
}

function DataMock({ accent }: { accent: string }) {
  const bars = [40, 65, 50, 80, 70, 90, 60];
  return (
    <div>
      <div className="text-xs text-white/50 mb-4">Weekly metrics</div>
      <div className="flex items-end gap-3 h-48">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
            className="flex-1 rounded-t-md"
            style={{ background: `linear-gradient(to top, ${accent}, ${accent}40)` }}
          />
        ))}
      </div>
      <div className="flex gap-3 mt-3 text-[10px] text-white/40">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="flex-1 text-center">{d}</div>
        ))}
      </div>
    </div>
  );
}
