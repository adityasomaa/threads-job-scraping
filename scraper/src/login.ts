// One-shot helper: opens a real browser so you can log in manually.
// Saves auth state to scraper/storage.json (gitignored).
// Run with: npm run threads:login
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORAGE = path.join(__dirname, "..", "storage.json");

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext();
const page = await ctx.newPage();

await page.goto("https://www.threads.com/login");
console.log("\n👉 Log in to Threads in the browser window. The session will be saved when you press Enter here.\n");

process.stdin.resume();
await new Promise<void>((resolve) => process.stdin.once("data", () => resolve()));

await ctx.storageState({ path: STORAGE });
console.log(`✅ Auth saved to ${STORAGE}`);
await browser.close();
process.exit(0);
