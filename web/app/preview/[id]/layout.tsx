import { notFound } from "next/navigation";
import { getJob, loadJobs } from "@/lib/jobs";
import { themeFor, themeCssVars } from "@/lib/theme";
import { SiteNav } from "@/components/site/SiteNav";
import { PreviewBanner } from "@/components/site/PreviewBanner";
import { Footer } from "@/components/site/Footer";
import "./preview.css";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadJobs().jobs.map((j) => ({ id: j.id }));
}

export default async function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  const theme = themeFor(job.enrichment?.style, job.enrichment?.niche);
  const vars = themeCssVars(theme);

  return (
    <div
      className="min-h-screen preview-root"
      style={{
        ...vars,
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-body)",
      }}
    >
      <PreviewBanner job={job} />
      <SiteNav job={job} />
      <main>{children}</main>
      <Footer job={job} />
    </div>
  );
}
