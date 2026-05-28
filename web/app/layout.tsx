import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threads Job Pipeline",
  description: "Scraped IT / web / AI jobs from Threads with auto-generated proposal previews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
