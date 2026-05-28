"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0a", color: "#fafafa", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem" }}>
          <div style={{ textAlign: "center", maxWidth: 28 + "rem" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#ffffff66", marginBottom: 12 }}>
              500 · something broke
            </p>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 600 }}>Server error.</h1>
            <p style={{ marginTop: "1rem", color: "#ffffff99" }}>{error.message || "An unexpected error occurred."}</p>
            <button
              onClick={reset}
              style={{
                marginTop: "2rem",
                padding: "0.75rem 1.5rem",
                borderRadius: 9999,
                background: "#fafafa",
                color: "#0a0a0a",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
