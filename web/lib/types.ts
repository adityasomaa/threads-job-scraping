export type Category =
  | "web-dev"
  | "fullstack"
  | "ai"
  | "mobile"
  | "automation"
  | "data"
  | "other";

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

export interface JobsFile {
  updatedAt: string;
  jobs: Job[];
}

export const CATEGORY_META: Record<
  Category,
  { label: string; color: string; gradient: string }
> = {
  "web-dev": {
    label: "Web Dev",
    color: "text-accent",
    gradient: "from-lime-400/30 via-emerald-500/20 to-transparent",
  },
  fullstack: {
    label: "Fullstack",
    color: "text-accent-cool",
    gradient: "from-blue-400/30 via-cyan-500/20 to-transparent",
  },
  ai: {
    label: "AI / ML",
    color: "text-accent-plum",
    gradient: "from-purple-400/30 via-fuchsia-500/20 to-transparent",
  },
  mobile: {
    label: "Mobile",
    color: "text-accent-warm",
    gradient: "from-orange-400/30 via-amber-500/20 to-transparent",
  },
  automation: {
    label: "Automation",
    color: "text-pink-300",
    gradient: "from-pink-400/30 via-rose-500/20 to-transparent",
  },
  data: {
    label: "Data",
    color: "text-teal-300",
    gradient: "from-teal-400/30 via-cyan-500/20 to-transparent",
  },
  other: {
    label: "Other",
    color: "text-zinc-300",
    gradient: "from-zinc-400/20 via-zinc-500/10 to-transparent",
  },
};
