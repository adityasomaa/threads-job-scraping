import type { StyleKey, NicheKey } from "./types";

export interface Theme {
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentSoft: string;     // tinted background for hero overlay
  fontDisplay: string;    // CSS font-family stack
  fontBody: string;
  radius: string;
  letterSpacing: string;  // for display headings
}

export const THEMES: Record<StyleKey, Theme> = {
  luxury: {
    bg: "#0c0a09",
    surface: "#171311",
    surfaceAlt: "#221b17",
    text: "#fdf6e3",
    textMuted: "#a8a29e",
    border: "#3c2f25",
    accent: "#d4af37",
    accentSoft: "rgba(212,175,55,0.18)",
    fontDisplay: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radius: "4px",
    letterSpacing: "-0.02em",
  },
  modern: {
    bg: "#fafafa",
    surface: "#ffffff",
    surfaceAlt: "#f4f4f5",
    text: "#0a0a0a",
    textMuted: "#52525b",
    border: "#e4e4e7",
    accent: "#000000",
    accentSoft: "rgba(0,0,0,0.06)",
    fontDisplay: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radius: "12px",
    letterSpacing: "-0.03em",
  },
  warm: {
    bg: "#fdf8f3",
    surface: "#ffffff",
    surfaceAlt: "#f3e8db",
    text: "#3a2a1f",
    textMuted: "#7c5c47",
    border: "#e8d4bc",
    accent: "#c2410c",
    accentSoft: "rgba(194,65,12,0.10)",
    fontDisplay: "'Fraunces', 'Playfair Display', Georgia, serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radius: "10px",
    letterSpacing: "-0.01em",
  },
  minimal: {
    bg: "#ffffff",
    surface: "#ffffff",
    surfaceAlt: "#f4f4f5",
    text: "#0a0a0a",
    textMuted: "#71717a",
    border: "#e4e4e7",
    accent: "#0a0a0a",
    accentSoft: "rgba(0,0,0,0.04)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radius: "2px",
    letterSpacing: "-0.025em",
  },
  playful: {
    bg: "#fff7ed",
    surface: "#ffffff",
    surfaceAlt: "#fef3c7",
    text: "#1c1917",
    textMuted: "#57534e",
    border: "#fde68a",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.18)",
    fontDisplay: "'DM Serif Display', Georgia, serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radius: "20px",
    letterSpacing: "-0.02em",
  },
  tech: {
    bg: "#070708",
    surface: "#0d0d10",
    surfaceAlt: "#16161c",
    text: "#e4e4e7",
    textMuted: "#71717a",
    border: "#27272a",
    accent: "#a3e635",
    accentSoft: "rgba(163,230,53,0.12)",
    fontDisplay: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radius: "8px",
    letterSpacing: "-0.025em",
  },
};

// Niche → preferred style when enrichment doesn't specify or for fallbacks
export const NICHE_DEFAULT_STYLE: Record<NicheKey, StyleKey> = {
  hospitality: "luxury",
  food: "warm",
  services: "modern",
  ecommerce: "modern",
  agency: "modern",
  portfolio: "minimal",
  tech: "tech",
  fitness: "playful",
  education: "playful",
  generic: "minimal",
};

export function themeFor(style: StyleKey | undefined, niche: NicheKey | undefined): Theme {
  if (style && THEMES[style]) return THEMES[style];
  if (niche) return THEMES[NICHE_DEFAULT_STYLE[niche]];
  return THEMES.minimal;
}

export function themeCssVars(t: Theme): React.CSSProperties {
  return {
    ["--bg" as any]: t.bg,
    ["--surface" as any]: t.surface,
    ["--surface-alt" as any]: t.surfaceAlt,
    ["--text" as any]: t.text,
    ["--text-muted" as any]: t.textMuted,
    ["--border" as any]: t.border,
    ["--accent" as any]: t.accent,
    ["--accent-soft" as any]: t.accentSoft,
    ["--font-display" as any]: t.fontDisplay,
    ["--font-body" as any]: t.fontBody,
    ["--radius" as any]: t.radius,
    ["--letter-spacing" as any]: t.letterSpacing,
  };
}
