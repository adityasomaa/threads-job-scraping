import { notFound } from "next/navigation";
import Link from "next/link";
import { getJob } from "@/lib/jobs";
import { photosFor } from "@/lib/photos";
import { HomeAnim } from "./parts";

export const dynamic = "force-static";

export default async function HomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job?.enrichment) notFound();
  const e = job.enrichment;
  const photos = photosFor(e.niche);

  return (
    <HomeAnim
      hero={e.pages.home.hero}
      tagline={e.pages.home.tagline}
      intro={e.pages.home.intro}
      cta={e.pages.home.cta}
      highlights={e.pages.home.highlights}
      heroImage={photos.hero}
      city={e.city}
      isID={e.language === "id"}
      jobId={job.id}
      sectionLabel={e.pages.services.sectionLabel}
    />
  );
}
