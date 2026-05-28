import "dotenv/config";
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import slugify from "slugify";
import { SEARCH_KEYWORDS } from "./keywords.js";
import { classify, extractBudget, extractContact } from "./classify.js";
import { loginIfNeeded, searchKeyword } from "./threads.js";
import type { Job } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const STORAGE = path.join(__dirname, "..", "storage.json");
const OUT = path.join(ROOT, "data", "jobs.json");

const MAX_POSTS = Number(process.env.SCRAPE_MAX_POSTS || "30");
const HEADFUL = (process.env.HEADFUL || "true").toLowerCase() !== "false";

function detectLanguage(text: string): "id" | "en" | "mixed" {
  const idHits = (text.match(/\b(butuh|cari|jasa|bikin|aplikasi|website|lowongan|programmer|pekerjaan|harga|bayar|murah|berkualitas|silakan|hubungi)\b/gi) || []).length;
  const enHits = (text.match(/\b(hiring|looking|need|developer|engineer|project|budget|payment|please|contact)\b/gi) || []).length;
  if (idHits > 0 && enHits > 0) return "mixed";
  if (enHits > idHits) return "en";
  return "id";
}

function looksLikeJobPost(text: string): boolean {
  if (text.length < 40) return false;
  // signals that someone is offering work / hiring
  const HIRING = /\b(butuh|cari|hiring|looking for|need a|sedang mencari|open(?:ing)?|lowongan|recruit(?:ing)?|wanted|jasa)\b/i;
  const ROLE = /\b(developer|programmer|engineer|designer|web|app|website|fullstack|backend|frontend|ai|llm|chatbot|automation|otomasi|mobile|android|ios)\b/i;
  return HIRING.test(text) && ROLE.test(text);
}

async function ensureDir(p: string) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function main() {
  const username = process.env.THREADS_USERNAME;
  const password = process.env.THREADS_PASSWORD;

  let storageExists = false;
  try {
    await fs.access(STORAGE);
    storageExists = true;
  } catch {}

  if (!storageExists && (!username || !password)) {
    console.error(
      "✗ No storage.json found AND THREADS_USERNAME/PASSWORD not set in .env.\n" +
        "  Either:\n" +
        "    • run `npm run threads:login` once to save your session, OR\n" +
        "    • fill THREADS_USERNAME / THREADS_PASSWORD in .env"
    );
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: !HEADFUL });
  const ctx = await browser.newContext({
    storageState: storageExists ? STORAGE : undefined,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();

  if (!storageExists) {
    await loginIfNeeded(ctx, page, { username: username!, password: password! });
    await ctx.storageState({ path: STORAGE });
  }

  const jobsById = new Map<string, Job>();

  for (const kw of SEARCH_KEYWORDS) {
    console.log(`\n🔍 Searching: "${kw}"`);
    let raws;
    try {
      raws = await searchKeyword(page, kw, MAX_POSTS);
    } catch (e) {
      console.warn(`  ⚠️  Search failed: ${(e as Error).message}`);
      continue;
    }
    console.log(`  → ${raws.length} candidate posts`);

    for (const r of raws) {
      if (!looksLikeJobPost(r.text)) continue;
      const id = slugify(r.postUrl.replace(/https?:\/\/[^/]+/, ""), { lower: true, strict: true });
      if (jobsById.has(id)) continue;

      const job: Job = {
        id,
        category: classify(r.text),
        text: r.text,
        excerpt: r.text.split("\n").filter(Boolean).slice(0, 3).join(" ").slice(0, 240),
        author: r.author,
        authorUrl: r.authorUrl,
        postUrl: r.postUrl,
        scrapedAt: new Date().toISOString(),
        postedAt: r.postedAt,
        language: detectLanguage(r.text),
        budget: extractBudget(r.text),
        contact: extractContact(r.text),
        keyword: kw,
      };
      jobsById.set(id, job);
    }

    // be polite — avoid hammering
    await page.waitForTimeout(2000 + Math.random() * 2000);
  }

  const jobs = [...jobsById.values()].sort(
    (a, b) => (b.postedAt || "").localeCompare(a.postedAt || "")
  );

  await ensureDir(OUT);
  await fs.writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), jobs }, null, 2));

  console.log(`\n✅ Saved ${jobs.length} jobs → ${path.relative(ROOT, OUT)}`);
  console.log("Breakdown:");
  const byCat = jobs.reduce<Record<string, number>>((acc, j) => {
    acc[j.category] = (acc[j.category] || 0) + 1;
    return acc;
  }, {});
  for (const [c, n] of Object.entries(byCat)) console.log(`  ${c.padEnd(12)} ${n}`);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
