// Gemini API client. Free-tier friendly with prompt caching off, structured JSON output.
import type { Enrichment, NicheKey, StyleKey } from "./types.js";

const NICHES: NicheKey[] = [
  "hospitality", "food", "services", "ecommerce",
  "agency", "portfolio", "tech", "fitness", "education", "generic",
];
const STYLES: StyleKey[] = [
  "luxury", "modern", "warm", "minimal", "playful", "tech",
];

const SCHEMA = {
  type: "object",
  properties: {
    businessName: { type: "string", description: "Real or plausible business name. Use what's in the post if mentioned; otherwise invent a natural one in the same language as the post." },
    niche: { type: "string", enum: NICHES },
    subniche: { type: "string", description: "Specific kind, used for image search e.g. 'luxury villa bali', 'specialty coffee shop', 'wedding photographer'" },
    style: { type: "string", enum: STYLES },
    city: { type: "string", description: "City name in the post, or empty string." },
    language: { type: "string", enum: ["id", "en"] },
    pages: {
      type: "object",
      properties: {
        home: {
          type: "object",
          properties: {
            hero: { type: "string", description: "Big headline, 4-9 words, evocative not generic." },
            tagline: { type: "string", description: "Sub-headline, 12-22 words." },
            intro: { type: "string", description: "Welcoming paragraph, 2-3 sentences." },
            highlights: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string", description: "3-5 words" },
                  body: { type: "string", description: "1-2 sentence body" },
                },
                required: ["title", "body"],
              },
              minItems: 3,
              maxItems: 3,
            },
            cta: { type: "string", description: "Primary CTA label, 2-4 words" },
          },
          required: ["hero", "tagline", "intro", "highlights", "cta"],
        },
        about: {
          type: "object",
          properties: {
            headline: { type: "string" },
            body: { type: "string", description: "2-3 paragraphs separated by \\n\\n. Tell the brand story, why they exist, who they serve." },
            values: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  body: { type: "string" },
                },
                required: ["title", "body"],
              },
              minItems: 3,
              maxItems: 3,
            },
          },
          required: ["headline", "body", "values"],
        },
        services: {
          type: "object",
          properties: {
            headline: { type: "string" },
            intro: { type: "string" },
            sectionLabel: { type: "string", description: "What to call this section: 'Services' / 'Menu' / 'Rooms' / 'Packages' / 'Programs' — choose what makes sense for the niche, in the right language." },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  desc: { type: "string", description: "1-2 sentences" },
                  price: { type: "string", description: "Optional price hint or empty string. Use IDR for ID, USD for EN." },
                },
                required: ["name", "desc"],
              },
              minItems: 4,
              maxItems: 6,
            },
          },
          required: ["headline", "intro", "sectionLabel", "items"],
        },
        gallery: {
          type: "object",
          properties: {
            headline: { type: "string" },
            caption: { type: "string" },
          },
          required: ["headline", "caption"],
        },
        contact: {
          type: "object",
          properties: {
            headline: { type: "string" },
            intro: { type: "string" },
            addressHint: { type: "string", description: "Generic area hint e.g. 'Canggu, Bali' or empty string" },
            hours: { type: "string", description: "Plausible hours line, language matches the post" },
          },
          required: ["headline", "intro", "addressHint", "hours"],
        },
      },
      required: ["home", "about", "services", "gallery", "contact"],
    },
  },
  required: ["businessName", "niche", "subniche", "style", "city", "language", "pages"],
};

const SYSTEM_INSTRUCTION = `You are a senior brand & web copywriter. Given a real job-hire post from Threads, you imagine a polished website concept for that exact prospect.

Rules:
- Match the post's language exactly. Indonesian post → all copy in Indonesian. English post → English.
- Use the business name from the post if mentioned. If not mentioned, invent a name that fits the niche and feels real (not generic like "Your Business").
- Pick the most likely niche from the enum. When in doubt, "services" for jasa, "generic" only if nothing fits.
- Style: luxury (premium hospitality), modern (tech/agency), warm (food/community), minimal (portfolio/professional), playful (fitness/education kids), tech (SaaS/AI).
- Avoid corporate clichés. Be specific, sensory, and human. No "we are passionate about" or "leverage synergies".
- Output ONLY the JSON, conforming to the provided schema.`;

export async function enrich(post: { text: string; postedAt: string | null }): Promise<Enrichment> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  if (!apiKey) throw new Error("GEMINI_API_KEY missing in .env");

  const userText = `Threads post:\n"""\n${post.text}\n"""\n\nGenerate the website concept JSON now.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: "user", parts: [{ text: userText }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: SCHEMA,
          temperature: 0.8,
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini ${res.status}: ${body.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("Gemini returned no content");

  let parsed: Enrichment;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`Gemini returned non-JSON: ${raw.slice(0, 300)}`);
  }

  // Coerce empty-string city to null
  if (!parsed.city || parsed.city.trim() === "") {
    (parsed as Enrichment).city = null;
  }

  return parsed;
}
