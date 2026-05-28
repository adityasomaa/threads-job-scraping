import { notFound } from "next/navigation";
import { getJob, loadJobs } from "@/lib/jobs";
import { ContactAnim } from "./contact.parts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadJobs().jobs.map((j) => ({ id: j.id }));
}

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job?.enrichment) notFound();
  const e = job.enrichment;
  const isID = e.language === "id";

  return (
    <ContactAnim
      eyebrow={isID ? "Kontak" : "Contact"}
      headline={e.pages.contact.headline}
      intro={e.pages.contact.intro}
      addressHint={e.pages.contact.addressHint || e.city || ""}
      hours={e.pages.contact.hours}
      isID={isID}
      threadsUrl={job.postUrl}
      author={job.author}
    />
  );
}
