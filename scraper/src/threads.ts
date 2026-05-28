import { type BrowserContext, type Page } from "playwright";

export interface RawPost {
  text: string;
  author: string;
  authorUrl: string;
  postUrl: string;
  postedAt: string | null;
}

/**
 * Threads supports two login flows:
 *   1. Native Threads (rare, often disabled)
 *   2. "Continue with Instagram" — the usual path
 * We try Instagram-style login because that's what most accounts use.
 */
export async function loginIfNeeded(
  ctx: BrowserContext,
  page: Page,
  creds: { username: string; password: string }
): Promise<void> {
  await page.goto("https://www.threads.com/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Are we already authenticated?
  const loggedOut = await page
    .locator('a[href="/login"], div:has-text("Log in")')
    .first()
    .isVisible()
    .catch(() => false);
  if (!loggedOut) {
    console.log("✓ Already authenticated via storage state.");
    return;
  }

  console.log("→ Logging in via Instagram…");
  await page.goto("https://www.threads.com/login", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // Click "Continue with Instagram" if present (sometimes the page goes straight to IG form)
  const igButton = page.locator(
    'a:has-text("Instagram"), div[role="button"]:has-text("Instagram"), button:has-text("Instagram")'
  ).first();
  if (await igButton.isVisible().catch(() => false)) {
    await igButton.click();
    await page.waitForTimeout(1500);
  }

  // We may now be on instagram.com/accounts/login or threads with embedded form.
  // Wait for username field.
  const userField = page
    .locator('input[autocomplete="username"], input[name="username"]')
    .first();
  await userField.waitFor({ state: "visible", timeout: 20_000 });
  await userField.fill(creds.username);

  const passField = page.locator('input[type="password"]').first();
  await passField.fill(creds.password);

  const submit = page
    .locator(
      'button[type="submit"], div[role="button"]:has-text("Log in"), button:has-text("Log in")'
    )
    .first();
  await submit.click();

  // After login, Instagram may ask "Save info?" and a 2FA / suspicious-login check
  await page.waitForTimeout(4000);
  // Try to dismiss "Save your login info?"
  const notNow = page.locator('button:has-text("Not now"), div[role="button"]:has-text("Not now")').first();
  if (await notNow.isVisible().catch(() => false)) {
    await notNow.click().catch(() => {});
    await page.waitForTimeout(1500);
  }

  // Go back to Threads
  await page.goto("https://www.threads.com/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);

  // If still showing login link, something went wrong (likely 2FA / checkpoint)
  const stillOut = await page
    .locator('a[href="/login"]')
    .first()
    .isVisible()
    .catch(() => false);
  if (stillOut) {
    console.warn(
      "⚠️  Login appears incomplete. If 2FA / suspicious-login check is required, run `npm run threads:login` to complete it manually once."
    );
  } else {
    console.log("✓ Login successful.");
  }
}

export async function searchKeyword(
  page: Page,
  keyword: string,
  maxPosts: number
): Promise<RawPost[]> {
  const url = `https://www.threads.com/search?q=${encodeURIComponent(keyword)}&serp_type=default`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);

  const seenUrls = new Set<string>();
  const posts: RawPost[] = [];

  for (let i = 0; i < 8 && posts.length < maxPosts; i++) {
    const batch = await extractVisiblePosts(page);
    for (const p of batch) {
      if (!seenUrls.has(p.postUrl)) {
        seenUrls.add(p.postUrl);
        posts.push(p);
        if (posts.length >= maxPosts) break;
      }
    }
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
    await page.waitForTimeout(1500 + Math.random() * 1500);
  }

  return posts;
}

async function extractVisiblePosts(page: Page): Promise<RawPost[]> {
  return await page.evaluate(() => {
    const out: Array<{
      text: string;
      author: string;
      authorUrl: string;
      postUrl: string;
      postedAt: string | null;
    }> = [];

    const articles = Array.from(
      document.querySelectorAll("div[role='article'], article")
    );
    for (const art of articles) {
      const linkEl = art.querySelector<HTMLAnchorElement>('a[href*="/post/"]');
      if (!linkEl) continue;
      const postUrl = new URL(linkEl.href, location.origin).toString();

      const authorEl = art.querySelector<HTMLAnchorElement>('a[href^="/@"]');
      const authorUrl = authorEl ? new URL(authorEl.href, location.origin).toString() : "";
      const author =
        authorEl?.textContent?.trim() ||
        authorUrl.split("/@")[1]?.split("/")[0] ||
        "";

      const timeEl = art.querySelector("time");
      const postedAt = timeEl?.getAttribute("datetime") || null;

      const text = (art as HTMLElement).innerText.replace(/\s+\n/g, "\n").trim();
      out.push({ text, author, authorUrl, postUrl, postedAt });
    }
    return out;
  });
}
