import { notFound } from "next/navigation";
import { getJob, loadJobs } from "@/lib/jobs";
import { photosFor } from "@/lib/photos";
import { AboutAnim } from "./about.parts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadJobs().jobs.map((j) => ({ id: j.id }));
}

export default async function AboutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job?.enrichment) notFound();
  const e = job.enrichment;
  const photos = photosFor(e.niche);

  return (
    <AboutAnim
      eyebrow={e.language === "id" ? "Tentang Kami" : "About Us"}
      headline={e.pages.about.headline}
      body={e.pages.about.body}
      values={e.pages.about.values}
      photo={photos.gallery[1] || photos.hero}
    />
  );
}
