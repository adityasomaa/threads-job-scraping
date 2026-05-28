import { notFound } from "next/navigation";
import { getJob, loadJobs } from "@/lib/jobs";
import { photosFor } from "@/lib/photos";
import { GalleryAnim } from "./gallery.parts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadJobs().jobs.map((j) => ({ id: j.id }));
}

export default async function GalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job?.enrichment) notFound();
  const e = job.enrichment;
  const photos = photosFor(e.niche);

  return (
    <GalleryAnim
      eyebrow={e.language === "id" ? "Galeri" : "Gallery"}
      headline={e.pages.gallery.headline}
      caption={e.pages.gallery.caption}
      photos={photos.gallery}
    />
  );
}
