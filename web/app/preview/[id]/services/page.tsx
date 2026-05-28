import { notFound } from "next/navigation";
import { getJob, loadJobs } from "@/lib/jobs";
import { ServicesAnim } from "./services.parts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadJobs().jobs.map((j) => ({ id: j.id }));
}

export default async function ServicesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job?.enrichment) notFound();
  const e = job.enrichment;

  return (
    <ServicesAnim
      eyebrow={e.pages.services.sectionLabel}
      headline={e.pages.services.headline}
      intro={e.pages.services.intro}
      items={e.pages.services.items}
    />
  );
}
