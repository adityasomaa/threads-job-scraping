import type { Category } from "./classify.js";

export type NicheKey =
  | "hospitality"   // villa, hotel, homestay, resort
  | "food"          // restaurant, café, catering, bar
  | "services"      // kontraktor, salon, cleaning, konsultan, jasa lainnya
  | "ecommerce"     // toko online, brand fashion, retail
  | "agency"        // digital agency, design studio, marketing
  | "portfolio"     // freelancer, creator, professional
  | "tech"          // SaaS, AI product, software tool
  | "fitness"       // gym, trainer, yoga studio
  | "education"     // course, bootcamp, tutor
  | "generic";

export type StyleKey =
  | "luxury"   // dark navy + gold, serif, spacious
  | "modern"   // off-white + bold accent, sans, geometric
  | "warm"     // cream + terracotta, slab serif, organic
  | "minimal"  // black + white, neutral, lots of whitespace
  | "playful"  // bright + rounded, friendly, illustrative
  | "tech";    // dark + neon, mono accents, grid

export interface PageHighlight {
  title: string;
  body: string;
}

export interface PageValue {
  title: string;
  body: string;
}

export interface ServiceItem {
  name: string;
  desc: string;
  price?: string;
}

export interface Pages {
  home: {
    hero: string;          // main headline
    tagline: string;       // sub-headline
    intro: string;         // 1-2 sentence intro paragraph
    highlights: PageHighlight[]; // 3 cards
    cta: string;           // primary CTA label
  };
  about: {
    headline: string;
    body: string;          // 2-3 paragraphs, returned as single string with \n\n
    values: PageValue[];   // 3 values
  };
  services: {
    headline: string;
    intro: string;
    items: ServiceItem[];  // 4-6 items
    sectionLabel: string;  // e.g. "Services" / "Menu" / "Rooms" / "Packages"
  };
  gallery: {
    headline: string;
    caption: string;
  };
  contact: {
    headline: string;
    intro: string;
    addressHint: string;   // generic city/area hint
    hours: string;         // e.g. "Senin - Sabtu, 09.00 - 18.00 WITA"
  };
}

export interface Enrichment {
  businessName: string;
  niche: NicheKey;
  subniche: string;          // free text used for image search e.g. "luxury villa bali"
  style: StyleKey;
  city: string | null;
  language: "id" | "en";
  pages: Pages;
}

export interface Job {
  id: string;
  category: Category;
  text: string;
  excerpt: string;
  author: string;
  authorUrl: string;
  postUrl: string;
  scrapedAt: string;
  postedAt: string | null;
  language: "id" | "en" | "mixed";
  budget: string | null;
  contact: { wa?: string; email?: string; tg?: string };
  keyword: string;

  // Added by enrich step. Optional so a job is valid even before enrichment.
  enrichment?: Enrichment;
}
