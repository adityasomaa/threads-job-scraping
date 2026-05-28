export type Category =
  | "web-dev"
  | "fullstack"
  | "ai"
  | "mobile"
  | "automation"
  | "data"
  | "other";

const RULES: Array<{ category: Category; patterns: RegExp[] }> = [
  {
    category: "ai",
    patterns: [
      /\b(ai|a\.i\.|ml|llm|machine learning|chatbot|gpt|openai|claude|generative|agent|rag)\b/i,
      /\b(ai engineer|prompt engineer|data scientist)\b/i,
    ],
  },
  {
    category: "mobile",
    patterns: [
      /\b(android|ios|flutter|react ?native|kotlin|swift|aplikasi mobile|mobile app)\b/i,
    ],
  },
  {
    category: "automation",
    patterns: [
      /\b(automation|otomasi|bot|scraper|scraping|rpa|n8n|zapier|make\.com|workflow)\b/i,
    ],
  },
  {
    category: "data",
    patterns: [
      /\b(data engineer|data analyst|dashboard|etl|bi|business intelligence|analytics|tableau|power bi|metabase)\b/i,
    ],
  },
  {
    category: "fullstack",
    patterns: [
      /\b(fullstack|full[- ]stack|saas|aplikasi web|web app|crm|erp|pos|booking|marketplace|dashboard admin)\b/i,
    ],
  },
  {
    category: "web-dev",
    patterns: [
      /\b(website|web ?developer|landing page|company profile|wordpress|webflow|web design|frontend|next\.?js|react)\b/i,
      /\b(jasa (bikin|buat|pembuatan) website)\b/i,
    ],
  },
];

export function classify(text: string): Category {
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(text))) return rule.category;
  }
  return "other";
}

// crude budget extraction — looks for IDR / USD-ish numbers
export function extractBudget(text: string): string | null {
  const idr = text.match(/\b(?:rp\.?|idr)\s?[\d.,]+\s?(?:rb|ribu|jt|juta|k|m)?\b/i);
  if (idr) return idr[0];
  const usd = text.match(/\$\s?\d[\d.,]*\s?(?:k|usd)?\b/i);
  if (usd) return usd[0];
  return null;
}

// crude contact extraction
export function extractContact(text: string): { wa?: string; email?: string; tg?: string } {
  const out: { wa?: string; email?: string; tg?: string } = {};
  const email = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (email) out.email = email[0];
  const wa = text.match(/(?:wa\.?me\/|whatsapp[: ]?|0\s?8)\s?[\d -]{7,}/i);
  if (wa) out.wa = wa[0].replace(/\s+/g, " ").trim();
  const tg = text.match(/(?:t\.me\/|telegram[: @]+)[\w_]+/i);
  if (tg) out.tg = tg[0];
  return out;
}
