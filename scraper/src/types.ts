import type { Category } from "./classify.js";

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
}
