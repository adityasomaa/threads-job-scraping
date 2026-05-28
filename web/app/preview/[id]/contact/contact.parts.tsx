"use client";
import { motion } from "motion/react";

export function ContactAnim({
  eyebrow,
  headline,
  intro,
  addressHint,
  hours,
  isID,
  threadsUrl,
  author,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  addressHint: string;
  hours: string;
  isID: boolean;
  threadsUrl: string;
  author: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[11px] uppercase tracking-[0.25em] mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
      >
        {headline}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {intro}
      </motion.p>

      <div className="mt-16 md:mt-20 grid md:grid-cols-5 gap-10 md:gap-14">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3 space-y-5"
          onSubmit={(ev) => { ev.preventDefault(); window.open(threadsUrl, "_blank"); }}
        >
          <Field label={isID ? "Nama" : "Name"} placeholder={isID ? "Nama lengkapmu" : "Your name"} type="text" />
          <Field label="Email" placeholder="kamu@email.com" type="email" />
          <Field label={isID ? "Pesan" : "Message"} placeholder={isID ? "Cerita singkat tentang kebutuhanmu…" : "Tell us briefly what you're looking for…"} as="textarea" />

          <button
            type="submit"
            className="inline-flex items-center px-8 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: "var(--radius)",
            }}
          >
            {isID ? "Kirim pesan" : "Send message"}
          </button>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {isID
              ? "Karena ini preview, form akan membuka post Threads-mu. Live form akan tersambung ke email saat website resmi diluncurkan."
              : "Since this is a preview, the form opens your Threads post. The live form will route to email when the real site ships."}
          </p>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="md:col-span-2 space-y-8"
        >
          <Info label={isID ? "Lokasi" : "Location"} value={addressHint || (isID ? "Akan kami umumkan segera" : "Coming soon")} />
          <Info label={isID ? "Jam buka" : "Hours"} value={hours} />
          <Info
            label="Threads"
            value={`@${author}`}
            href={threadsUrl}
          />

          <a
            href={threadsUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-center px-6 py-4 transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--surface-alt)",
              color: "var(--text)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
            }}
          >
            {isID ? "Balas langsung di Threads →" : "Reply on Threads →"}
          </a>
        </motion.aside>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type,
  as,
}: {
  label: string;
  placeholder: string;
  type?: string;
  as?: "textarea";
}) {
  const common = {
    placeholder,
    className: "w-full px-4 py-3 text-base focus:outline-none transition-colors",
    style: {
      background: "var(--surface)",
      color: "var(--text)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      fontFamily: "var(--font-body)",
    } as React.CSSProperties,
  };
  return (
    <label className="block">
      <span
        className="block text-[11px] uppercase tracking-[0.2em] mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      {as === "textarea" ? (
        <textarea rows={5} {...common} />
      ) : (
        <input type={type || "text"} {...common} />
      )}
    </label>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="text-lg underline underline-offset-4" style={{ color: "var(--text)" }}>
          {value}
        </a>
      ) : (
        <p className="text-lg" style={{ color: "var(--text)" }}>
          {value}
        </p>
      )}
    </div>
  );
}
