// Reads data/jobs.json, calls Gemini per job (skipping already-enriched), writes back.
// Throttled to respect free-tier rate limits.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import type { Job } from "./types.js";
import { enrich } from "./gemini.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
dotenv.config({ path: path.join(ROOT, ".env") });
const JOBS_PATH = path.join(ROOT, "data", "jobs.json");

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
// Free-tier limits per minute:
//   gemini-2.0-flash      → 15 RPM
//   gemini-2.5-flash      → 10 RPM
//   gemini-2.5-pro        → 5 RPM
// Add a small buffer.
const RPM_BY_MODEL: Record<string, number> = {
  "gemini-2.0-flash": 12,
  "gemini-2.5-flash": 8,
  "gemini-2.5-pro": 4,
};
const RPM = RPM_BY_MODEL[MODEL] ?? 10;
const DELAY_MS = Math.ceil((60_000 / RPM) + 200);

const FORCE = process.argv.includes("--force");

async function main() {
  const file = JSON.parse(await fs.readFile(JOBS_PATH, "utf8")) as {
    updatedAt: string;
    jobs: Job[];
  };

  const todo = file.jobs.filter((j) => FORCE || !j.enrichment);
  console.log(
    `📚 ${file.jobs.length} total jobs · ${todo.length} to enrich · model=${MODEL} · ${RPM} RPM`
  );

  if (todo.length === 0) {
    console.log("✓ Nothing to do. Use --force to re-enrich existing jobs.");
    return;
  }

  let ok = 0;
  let fail = 0;
  const startedAt = Date.now();

  for (let i = 0; i < todo.length; i++) {
    const job = todo[i];
    const label = `[${i + 1}/${todo.length}]`;
    try {
      const enrichment = await enrich({ text: job.text, postedAt: job.postedAt });
      job.enrichment = enrichment;
      ok++;
      console.log(
        `${label} ✓ ${enrichment.businessName} (${enrichment.niche} / ${enrichment.style})`
      );
    } catch (e) {
      fail++;
      console.warn(`${label} ✗ ${(e as Error).message}`);
    }

    // Write incrementally every 5 jobs so a crash doesn't lose progress.
    if ((i + 1) % 5 === 0 || i === todo.length - 1) {
      file.updatedAt = new Date().toISOString();
      await fs.writeFile(JOBS_PATH, JSON.stringify(file, null, 2));
    }

    if (i < todo.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`\n✅ Enriched ${ok}, failed ${fail} in ${elapsed}s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
