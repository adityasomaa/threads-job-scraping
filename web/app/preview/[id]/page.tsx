import { notFound } from "next/navigation";
import { loadJobs, getJob } from "@/lib/jobs";
import { PreviewShell } from "@/components/preview/PreviewShell";
import { Hero } from "@/components/preview/Hero";
import { Mockup } from "@/components/preview/Mockup";
import { FeatureGrid } from "@/components/preview/FeatureGrid";
import { Timeline } from "@/components/preview/Timeline";
import { TechStack } from "@/components/preview/TechStack";
import { getContent } from "@/components/preview/templates";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadJobs().jobs.map((j) => ({ id: j.id }));
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  const content = getContent(job);

  return (
    <PreviewShell job={job} accent={content.accent}>
      <Hero
        job={job}
        eyebrow={content.eyebrow}
        title={content.title(job)}
        subtitle={content.subtitle}
      />
      <Mockup category={job.category} accent={content.accent} />
      <FeatureGrid features={content.features} accent={content.accent} />
      <Timeline phases={content.phases} accent={content.accent} />
      <TechStack items={content.stack} accent={content.accent} />
    </PreviewShell>
  );
}
