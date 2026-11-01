import React from "react";

interface SubtleGridProps {
  height?: number;
  className?: string;
}

export function SubtleGrid({ height = 520, className = "" }: SubtleGridProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 overflow-hidden select-none ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <div
        className="mx-auto h-full w-[1440px] max-w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
    </div>
  );
}
