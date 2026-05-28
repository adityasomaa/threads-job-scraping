import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center px-6 dotted">
      <div className="text-center max-w-md">
        <p className="text-[11px] uppercase tracking-widest text-white/40 mb-3">
          404 · not found
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight">
          That preview doesn't exist.
        </h1>
        <p className="mt-4 text-white/60">
          Maybe the job was removed, or the link is stale. Head back and pick another.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-white text-ink font-medium hover:bg-white/90 transition"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
