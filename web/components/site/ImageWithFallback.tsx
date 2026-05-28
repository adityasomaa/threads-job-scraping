"use client";
import { useState } from "react";

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background:
            "linear-gradient(135deg, var(--accent-soft), color-mix(in srgb, var(--accent) 8%, var(--surface)))",
        }}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}
