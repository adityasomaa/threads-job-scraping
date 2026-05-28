import type { Category, Job } from "@/lib/types";
import type { Feature } from "./FeatureGrid";
import type { Phase } from "./Timeline";

export interface PreviewContent {
  accent: string;
  eyebrow: string;
  title: (job: Job) => React.ReactNode;
  subtitle: string;
  features: Feature[];
  phases: Phase[];
  stack: string[];
}

const isID = (job: Job) => job.language === "id" || job.language === "mixed";

export function getContent(job: Job): PreviewContent {
  return TEMPLATES[job.category](job);
}

const TEMPLATES: Record<Category, (job: Job) => PreviewContent> = {
  "web-dev": (job) => ({
    accent: "#a3e635",
    eyebrow: isID(job) ? "Preview website untukmu" : "Your website preview",
    title: () => isID(job) ? "Website yang siap meyakinkan klien-mu dari detik pertama." : "A website that earns trust in the first three seconds.",
    subtitle: isID(job)
      ? "Aku baca post-mu. Aku bangunkan sebuah halaman yang cepat, modern, dan fokus pada konversi — bukan template generik."
      : "I read your post. I'll build you a fast, modern landing page that converts — not a generic template.",
    features: isID(job) ? FEATURES_WEB_ID : FEATURES_WEB_EN,
    phases: isID(job) ? PHASES_WEB_ID : PHASES_WEB_EN,
    stack: ["Next.js 14", "Tailwind CSS", "Framer Motion", "Vercel", "Sanity / Notion CMS", "Responsive · 95+ Lighthouse"],
  }),

  fullstack: (job) => ({
    accent: "#60a5fa",
    eyebrow: isID(job) ? "Preview aplikasi web" : "Your web app preview",
    title: () => isID(job) ? "Aplikasi web yang skalanya ikut bisnis-mu." : "A web app that scales with your business.",
    subtitle: isID(job)
      ? "Frontend cepat, backend stabil, dashboard yang nyaman dipakai tim non-teknis."
      : "Fast frontend, reliable backend, and a dashboard your non-technical team will actually use.",
    features: isID(job) ? FEATURES_FS_ID : FEATURES_FS_EN,
    phases: isID(job) ? PHASES_FS_ID : PHASES_FS_EN,
    stack: ["Next.js + TypeScript", "PostgreSQL / Supabase", "Prisma", "tRPC / REST", "Auth.js / Clerk", "Stripe / Midtrans", "Vercel / Railway"],
  }),

  ai: (job) => ({
    accent: "#c084fc",
    eyebrow: isID(job) ? "Preview produk AI" : "Your AI product preview",
    title: () => isID(job) ? "AI yang mengerti konteks bisnis-mu, bukan demo generik." : "AI that understands your business — not a generic demo.",
    subtitle: isID(job)
      ? "Aku rancang sistem RAG / agen yang aman, terukur, dan benar-benar dipakai user — bukan proof-of-concept yang berhenti di slide."
      : "I design RAG / agent systems that are safe, measurable, and actually used — not a proof-of-concept that dies in a slide deck.",
    features: isID(job) ? FEATURES_AI_ID : FEATURES_AI_EN,
    phases: isID(job) ? PHASES_AI_ID : PHASES_AI_EN,
    stack: ["Claude / OpenAI API", "LangChain / LlamaIndex", "Pinecone / pgvector", "Next.js streaming", "Python / FastAPI", "Prompt caching · evals"],
  }),

  mobile: (job) => ({
    accent: "#fb923c",
    eyebrow: isID(job) ? "Preview aplikasi mobile" : "Your mobile app preview",
    title: () => isID(job) ? "Aplikasi mobile yang terasa premium di Android & iOS." : "A mobile app that feels native on both Android and iOS.",
    subtitle: isID(job)
      ? "Satu codebase, dua platform, performa 60fps, dan UX yang user kamu mau pakai setiap hari."
      : "One codebase, two platforms, 60fps performance, and UX your users actually open every day.",
    features: isID(job) ? FEATURES_MOBILE_ID : FEATURES_MOBILE_EN,
    phases: isID(job) ? PHASES_MOBILE_ID : PHASES_MOBILE_EN,
    stack: ["React Native + Expo", "TypeScript", "Tamagui / NativeWind", "Supabase / Firebase", "EAS Build", "OneSignal push"],
  }),

  automation: (job) => ({
    accent: "#f472b6",
    eyebrow: isID(job) ? "Preview otomasi" : "Your automation preview",
    title: () => isID(job) ? "Otomasi yang menghilangkan kerja berulang, bukan menambah masalah baru." : "Automation that removes busywork — without adding new fires to fight.",
    subtitle: isID(job)
      ? "Workflow yang aman, observable, dan bisa di-pause kalau ada anomali. Bukan script PHP-jadul yang sering tumbang."
      : "Safe, observable workflows that pause themselves when something looks off — not duct-tape scripts that silently fail.",
    features: isID(job) ? FEATURES_AUTO_ID : FEATURES_AUTO_EN,
    phases: isID(job) ? PHASES_AUTO_ID : PHASES_AUTO_EN,
    stack: ["n8n / Make / Zapier", "Python · Playwright", "Cron · Temporal", "Supabase queue", "Slack / Telegram alerts"],
  }),

  data: (job) => ({
    accent: "#2dd4bf",
    eyebrow: isID(job) ? "Preview dashboard data" : "Your data dashboard preview",
    title: () => isID(job) ? "Dashboard yang menjawab pertanyaan bisnis, bukan jadi pajangan." : "A dashboard that answers business questions — not just a museum of charts.",
    subtitle: isID(job)
      ? "Data pipeline yang rapi, metrik yang bisa dipercaya, dan visual yang langsung kebaca."
      : "A clean data pipeline, metrics you can trust, and visuals that are actually legible at a glance.",
    features: isID(job) ? FEATURES_DATA_ID : FEATURES_DATA_EN,
    phases: isID(job) ? PHASES_DATA_ID : PHASES_DATA_EN,
    stack: ["PostgreSQL", "dbt / SQL", "Metabase / Superset", "Python · Polars", "Airflow / cron", "Cloud Storage"],
  }),

  other: (job) => ({
    accent: "#a3e635",
    eyebrow: isID(job) ? "Preview project" : "Your project preview",
    title: () => isID(job) ? "Project teknis yang dikerjakan dengan rapi, terbuka, dan tepat waktu." : "Technical work delivered cleanly, openly, and on time.",
    subtitle: isID(job)
      ? "Aku perlakukan setiap project seperti produk: scope jelas, milestone transparan, hasil yang bisa kamu maintain sendiri."
      : "Every project treated like a product: clear scope, transparent milestones, and code you can maintain yourself.",
    features: isID(job) ? FEATURES_WEB_ID : FEATURES_WEB_EN,
    phases: isID(job) ? PHASES_WEB_ID : PHASES_WEB_EN,
    stack: ["TypeScript", "Next.js / Node.js", "PostgreSQL", "Vercel / Docker", "GitHub Actions"],
  }),
};

/* -------- copy banks -------- */

const FEATURES_WEB_ID: Feature[] = [
  { icon: "⚡", title: "Cepat sekali", body: "Lighthouse 95+ di mobile. Halaman terbuka dalam <1 detik di 4G." },
  { icon: "🎨", title: "Identitas visual yang konsisten", body: "Bukan template Bootstrap. Komponen kustom yang merefleksikan brand-mu." },
  { icon: "🔍", title: "SEO-ready", body: "Meta tags, sitemap, OpenGraph, structured data — siap di-index Google." },
  { icon: "📱", title: "Responsif penuh", body: "Tampil sempurna dari iPhone SE sampai monitor 4K." },
];

const FEATURES_WEB_EN: Feature[] = [
  { icon: "⚡", title: "Blazing fast", body: "95+ Lighthouse on mobile. Sub-1s load on 4G." },
  { icon: "🎨", title: "Custom visual identity", body: "Not a Bootstrap template — custom components that reflect your brand." },
  { icon: "🔍", title: "SEO-ready", body: "Meta tags, sitemap, OpenGraph, structured data — indexable on day one." },
  { icon: "📱", title: "Fully responsive", body: "Looks right from iPhone SE up to 4K monitors." },
];

const PHASES_WEB_ID: Phase[] = [
  { label: "Discovery", duration: "1-2 hari", body: "Aku tanya goal bisnis dan audiens, sketsa wireframe rough." },
  { label: "Desain visual", duration: "3-4 hari", body: "Mockup hi-fi di Figma yang bisa kamu review dan revisi." },
  { label: "Implementasi", duration: "5-7 hari", body: "Build di Next.js, deploy ke Vercel, kamu lihat progress per hari." },
  { label: "Polish & launch", duration: "1-2 hari", body: "QA cross-browser, performance tuning, custom domain, go live." },
];

const PHASES_WEB_EN: Phase[] = [
  { label: "Discovery", duration: "1-2 days", body: "Sync on goals and audience, sketch rough wireframes." },
  { label: "Visual design", duration: "3-4 days", body: "Hi-fi mockups in Figma for review and iteration." },
  { label: "Build", duration: "5-7 days", body: "Implement in Next.js, deploy to Vercel, daily progress preview." },
  { label: "Polish & launch", duration: "1-2 days", body: "Cross-browser QA, performance, custom domain, ship it." },
];

const FEATURES_FS_ID: Feature[] = [
  { icon: "🔐", title: "Auth & role", body: "Login email/Google, permission level admin / user / guest." },
  { icon: "💳", title: "Payment terintegrasi", body: "Midtrans, Xendit, atau Stripe — siap menerima transaksi nyata." },
  { icon: "📊", title: "Admin dashboard", body: "Kamu bisa lihat, edit, dan export data tanpa nyentuh database." },
  { icon: "📈", title: "Siap di-scale", body: "Arsitektur yang bisa nampung 10k user tanpa rewrite." },
];

const FEATURES_FS_EN: Feature[] = [
  { icon: "🔐", title: "Auth & roles", body: "Email/Google login, with admin / user / guest permission tiers." },
  { icon: "💳", title: "Integrated payments", body: "Stripe, Midtrans, or Xendit — ready to take real transactions." },
  { icon: "📊", title: "Admin dashboard", body: "View, edit, and export data without ever touching the database." },
  { icon: "📈", title: "Scale-ready", body: "Architecture that handles 10k users without a rewrite." },
];

const PHASES_FS_ID: Phase[] = [
  { label: "Spec & data model", duration: "2-3 hari", body: "Aku petakan entitas, flow user, dan skema database." },
  { label: "MVP berfungsi", duration: "1-2 minggu", body: "Fitur inti bisa dipakai end-to-end di staging." },
  { label: "Integrasi & UI polish", duration: "1 minggu", body: "Payment, email, dashboard polish, error states." },
  { label: "Launch & handover", duration: "2-3 hari", body: "Production deploy, dokumentasi, training tim-mu." },
];

const PHASES_FS_EN: Phase[] = [
  { label: "Spec & data model", duration: "2-3 days", body: "Map entities, user flows, and DB schema." },
  { label: "Working MVP", duration: "1-2 weeks", body: "Core features usable end-to-end in staging." },
  { label: "Integrations & polish", duration: "1 week", body: "Payments, email, dashboard polish, error states." },
  { label: "Launch & handover", duration: "2-3 days", body: "Production deploy, docs, team walkthrough." },
];

const FEATURES_AI_ID: Feature[] = [
  { icon: "🧠", title: "Konteks bisnis-mu", body: "RAG di atas dokumen / data kamu — bukan jawaban umum dari internet." },
  { icon: "🛡️", title: "Safe by default", body: "Filter PII, audit log, rate-limit, dan guardrails per use case." },
  { icon: "💸", title: "Hemat biaya API", body: "Prompt caching + model routing — bisa hemat 60% biaya inference." },
  { icon: "📐", title: "Bisa diukur", body: "Setiap fitur punya eval — kita tahu kapan AI-nya cukup baik untuk launch." },
];

const FEATURES_AI_EN: Feature[] = [
  { icon: "🧠", title: "Your business context", body: "RAG on your own docs / data — not generic internet answers." },
  { icon: "🛡️", title: "Safe by default", body: "PII filtering, audit logs, rate limits, per-use-case guardrails." },
  { icon: "💸", title: "Cheap to run", body: "Prompt caching + model routing — typically 60% cheaper inference." },
  { icon: "📐", title: "Measurable", body: "Every feature ships with evals — we know when it's good enough." },
];

const PHASES_AI_ID: Phase[] = [
  { label: "Use-case framing", duration: "1-2 hari", body: "Apa pertanyaan terpentingnya? Eval seperti apa yang menentukan sukses?" },
  { label: "Prototype RAG / agent", duration: "1 minggu", body: "Pipeline jalan end-to-end di data sample." },
  { label: "Evaluation & iterate", duration: "1 minggu", body: "Tuning prompt, retrieval, dan tools sampai eval lulus target." },
  { label: "Productionize", duration: "3-5 hari", body: "Deploy, monitoring, biaya per request, kontrol akses." },
];

const PHASES_AI_EN: Phase[] = [
  { label: "Use-case framing", duration: "1-2 days", body: "What's the key question? What eval defines success?" },
  { label: "RAG / agent prototype", duration: "1 week", body: "Pipeline runs end-to-end on sample data." },
  { label: "Evaluate & iterate", duration: "1 week", body: "Tune prompts, retrieval, and tools until evals pass." },
  { label: "Productionize", duration: "3-5 days", body: "Deploy, monitoring, per-request cost, access control." },
];

const FEATURES_MOBILE_ID: Feature[] = [
  { icon: "📲", title: "Native feel", body: "Animasi 60fps, gestur native, transisi halus seperti app populer." },
  { icon: "🔄", title: "Offline-first", body: "Bisa dipakai walau sinyal hilang, sync otomatis saat online." },
  { icon: "🔔", title: "Push notification", body: "Engagement loop lewat OneSignal / FCM, dengan deep-linking." },
  { icon: "🏪", title: "Siap Play Store / App Store", body: "Build via EAS, screenshot, deskripsi, dan submission aku urus." },
];

const FEATURES_MOBILE_EN: Feature[] = [
  { icon: "📲", title: "Native feel", body: "60fps animation, native gestures, transitions that feel polished." },
  { icon: "🔄", title: "Offline-first", body: "Usable without signal, auto-syncs when back online." },
  { icon: "🔔", title: "Push notifications", body: "Engagement loop via OneSignal / FCM, with deep linking." },
  { icon: "🏪", title: "Store-ready", body: "EAS builds, screenshots, descriptions, submissions all handled." },
];

const PHASES_MOBILE_ID: Phase[] = [
  { label: "Flow & desain layar", duration: "3-4 hari", body: "Sketsa user flow + mockup tiap screen di Figma." },
  { label: "Build & internal beta", duration: "2-3 minggu", body: "Fitur inti, TestFlight + Internal Track Google Play." },
  { label: "Polish & QA device", duration: "1 minggu", body: "Test di 5+ device, edge case, error states, accessibility." },
  { label: "Submission store", duration: "1 minggu", body: "Asset, deskripsi, review submission, sampai approved." },
];

const PHASES_MOBILE_EN: Phase[] = [
  { label: "Flows & screen design", duration: "3-4 days", body: "User flows + per-screen Figma mockups." },
  { label: "Build & internal beta", duration: "2-3 weeks", body: "Core features on TestFlight + Google Play Internal." },
  { label: "Polish & device QA", duration: "1 week", body: "Test on 5+ devices, edge cases, error states, a11y." },
  { label: "Store submission", duration: "1 week", body: "Assets, copy, review submission until approved." },
];

const FEATURES_AUTO_ID: Feature[] = [
  { icon: "⚙️", title: "Workflow yang reliable", body: "Retry logic, dead-letter queue, dan alert otomatis kalau gagal." },
  { icon: "👀", title: "Observability", body: "Dashboard log: kamu lihat tiap step jalan atau error real-time." },
  { icon: "🔌", title: "Integrasi siap", body: "Google Sheets, WhatsApp, Telegram, Slack, Notion, Airtable, lainnya." },
  { icon: "🧰", title: "Maintainable", body: "Pakai tool (n8n / Make) yang kamu bisa edit sendiri kalau butuh." },
];

const FEATURES_AUTO_EN: Feature[] = [
  { icon: "⚙️", title: "Reliable workflows", body: "Retry logic, dead-letter queues, and auto-alerts when they fail." },
  { icon: "👀", title: "Observability", body: "Log dashboard — see each step run or fail in real time." },
  { icon: "🔌", title: "Pre-built integrations", body: "Sheets, WhatsApp, Telegram, Slack, Notion, Airtable, and more." },
  { icon: "🧰", title: "Maintainable", body: "Built on tools (n8n / Make) you can edit yourself later." },
];

const PHASES_AUTO_ID: Phase[] = [
  { label: "Audit proses", duration: "1-2 hari", body: "Petakan step manual yang sekarang dilakukan tim-mu." },
  { label: "Build workflow", duration: "3-5 hari", body: "Setup di n8n / Make, integrasi, error handling." },
  { label: "Trial run", duration: "1 minggu", body: "Workflow jalan paralel dengan proses manual untuk diverifikasi." },
  { label: "Cutover & SOP", duration: "2-3 hari", body: "Matikan manual flow, kasih SOP dan training tim." },
];

const PHASES_AUTO_EN: Phase[] = [
  { label: "Process audit", duration: "1-2 days", body: "Map the manual steps your team does today." },
  { label: "Build workflow", duration: "3-5 days", body: "Set up in n8n / Make, integrations, error handling." },
  { label: "Trial run", duration: "1 week", body: "Workflow runs in parallel with the manual one for verification." },
  { label: "Cutover & SOP", duration: "2-3 days", body: "Retire manual flow, deliver SOP and team walkthrough." },
];

const FEATURES_DATA_ID: Feature[] = [
  { icon: "🧹", title: "Data bersih", body: "Pipeline yang validasi tipe data, deteksi anomali, dan handle null." },
  { icon: "📊", title: "Metrik yang bisa dipercaya", body: "Single source of truth — semua chart pakai definisi yang sama." },
  { icon: "🔁", title: "Refresh otomatis", body: "Dashboard auto-update tiap jam / hari, sesuai kebutuhan." },
  { icon: "🧭", title: "Dokumentasi metrik", body: "Setiap angka punya penjelasan: apa, kenapa, dari mana." },
];

const FEATURES_DATA_EN: Feature[] = [
  { icon: "🧹", title: "Clean data", body: "Pipeline that validates types, detects anomalies, and handles nulls." },
  { icon: "📊", title: "Metrics you can trust", body: "Single source of truth — every chart uses the same definition." },
  { icon: "🔁", title: "Auto-refresh", body: "Dashboards update hourly / daily as needed." },
  { icon: "🧭", title: "Documented metrics", body: "Every number has a definition: what, why, where from." },
];

const PHASES_DATA_ID: Phase[] = [
  { label: "Audit sumber data", duration: "1-2 hari", body: "Petakan sumber: DB produksi, sheet, API, file mentah." },
  { label: "Pipeline & warehouse", duration: "3-5 hari", body: "Setup ETL, definisi metrik, schema warehouse." },
  { label: "Dashboard build", duration: "3-5 hari", body: "Bikin dashboard utama + drill-down per metrik penting." },
  { label: "Handover & training", duration: "2-3 hari", body: "Tim-mu bisa edit metrik dan tambah chart sendiri." },
];

const PHASES_DATA_EN: Phase[] = [
  { label: "Data audit", duration: "1-2 days", body: "Map sources: production DB, sheets, APIs, raw files." },
  { label: "Pipeline & warehouse", duration: "3-5 days", body: "Set up ETL, metric definitions, warehouse schema." },
  { label: "Dashboard build", duration: "3-5 days", body: "Main dashboard + drill-downs for key metrics." },
  { label: "Handover & training", duration: "2-3 days", body: "Your team can edit metrics and add charts themselves." },
];
