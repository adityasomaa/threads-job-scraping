"use client";
import Link from "next/link";
import type { Job } from "@/lib/types";

export function Footer({ job }: { job: Job }) {
  const e = job.enrichment;
  if (!e) return null;
  const isID = e.language === "id";
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-32 pt-12 pb-10 px-6 border-t"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        <div>
          <h4
            className="text-2xl mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {e.businessName}
          </h4>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {year} {e.businessName}. {isID ? "Hak cipta dilindungi." : "All rights reserved."}
          </p>
        </div>

        <div>
          <p
            className="text-[11px] uppercase tracking-widest mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {isID ? "Jelajahi" : "Explore"}
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text)" }}>
            <li><Link href={`/preview/${job.id}`}>{isID ? "Beranda" : "Home"}</Link></li>
            <li><Link href={`/preview/${job.id}/about`}>{isID ? "Tentang" : "About"}</Link></li>
            <li><Link href={`/preview/${job.id}/services`}>{e.pages.services.sectionLabel}</Link></li>
            <li><Link href={`/preview/${job.id}/gallery`}>{isID ? "Galeri" : "Gallery"}</Link></li>
            <li><Link href={`/preview/${job.id}/contact`}>{isID ? "Kontak" : "Contact"}</Link></li>
          </ul>
        </div>

        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          <p
            className="text-[11px] uppercase tracking-widest mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {isID ? "Catatan" : "Note"}
          </p>
          <p className="leading-relaxed">
            {isID
              ? "Ini adalah konsep desain awal yang dibuat untuk kamu. Setiap detail bisa kita diskusikan dan sesuaikan."
              : "This is an initial design concept built for you. Every detail is open for discussion and refinement."}
          </p>
        </div>
      </div>
    </footer>
  );
}
