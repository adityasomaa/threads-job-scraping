"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import type { Job } from "@/lib/types";

interface NavItem { href: string; label: string }

export function SiteNav({ job }: { job: Job }) {
  const e = job.enrichment;
  if (!e) return null;
  const base = `/preview/${job.id}`;
  const isID = e.language === "id";
  const items: NavItem[] = [
    { href: `${base}`,          label: isID ? "Beranda"  : "Home" },
    { href: `${base}/about`,    label: isID ? "Tentang"  : "About" },
    { href: `${base}/services`, label: e.pages.services.sectionLabel || (isID ? "Layanan" : "Services") },
    { href: `${base}/gallery`,  label: isID ? "Galeri"   : "Gallery" },
    { href: `${base}/contact`,  label: isID ? "Kontak"   : "Contact" },
  ];

  return (
    <nav
      className="sticky top-0 z-30 backdrop-blur-md border-b"
      style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={base}
          className="text-xl tracking-tight"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "var(--letter-spacing)" }}
        >
          {e.businessName}
        </Link>
        <NavLinks items={items} />
      </div>
    </nav>
  );
}

function NavLinks({ items }: { items: NavItem[] }) {
  const path = usePathname();
  return (
    <ul className="hidden md:flex items-center gap-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
      {items.map((it) => {
        const active = path === it.href || (it.href.endsWith(it.label.toLowerCase()) && path?.endsWith(it.label.toLowerCase()));
        const isActive = path === it.href;
        return (
          <li key={it.href}>
            <Link
              href={it.href}
              className="relative px-3 py-2 rounded-full transition-colors"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {it.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[2px] h-[1.5px] rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
