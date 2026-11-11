"use client";

import React from "react";
import { getTechLogo, portfolioData } from "@/data/portfolio";
import { useTheme } from "@/context/ThemeContext";

interface TechLogoBadgeProps {
  name: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function TechLogoBadge({
  name,
  logoUrl,
  size = "md",
  showLabel = false,
  className = "",
}: TechLogoBadgeProps) {
  const { isBlack } = useTheme();
  const resolvedLogo = logoUrl || getTechLogo(name);
  const isVercelDark = isBlack && resolvedLogo.endsWith("/vercel.svg");

  const iconSizes = {
    sm: "size-[16px]",
    md: "size-[20px]",
    lg: "size-[22px]",
  };

  const boxSizes = {
    sm: "size-[28px]",
    md: "size-[32px]",
    lg: "size-[36px]",
  };

  if (showLabel) {
    return (
      <span
        className={`group/label inline-flex items-center gap-2 rounded-[6px] border px-2.5 py-1.5 text-[12px] font-medium transition-all hover:border-[#39a875] ${
          isBlack
            ? "border-[#222222] bg-[#0a0a0a] text-white hover:bg-[#111111]"
            : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918] hover:bg-[#efefef]"
        } ${className}`}
      >
        <img
          src={resolvedLogo}
          alt={`${name} logo`}
          className={`${iconSizes[size]} shrink-0 object-contain transition-transform duration-200 group-hover/label:scale-110 ${isVercelDark ? "invert" : ""}`}
        />
        <span>{name}</span>
      </span>
    );
  }

  return (
    <div
      className={`group/badge relative inline-flex ${boxSizes[size]} shrink-0 items-center justify-center rounded-[6px] border transition-all duration-200 hover:-translate-y-0.5 hover:border-[#39a875]/80 ${
        isBlack
          ? "border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#111111]"
          : "border-[#e0e0e0] bg-[#f7f7f7] hover:bg-[#efefef] shadow-xs"
      } ${className}`}
      title={name}
    >
      <img
        src={resolvedLogo}
        alt={`${name} logo`}
        className={`${iconSizes[size]} object-contain transition-transform duration-200 group-hover/badge:scale-110 ${isVercelDark ? "invert" : ""}`}
      />
      {/* Tooltip on Hover */}
      <span
        className={`pointer-events-none absolute -top-8 left-1/2 z-30 -translate-x-1/2 rounded-[4px] border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap opacity-0 shadow-md transition-opacity duration-150 group-hover/badge:opacity-100 ${
          isBlack
            ? "border-[#262626] bg-black text-white"
            : "border-[#e0e0e0] bg-white text-black shadow-sm"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

interface TechStackBarProps {
  limit?: number;
}

export function TechStackBar({ limit = 17 }: TechStackBarProps) {
  const { isBlack } = useTheme();

  const items = portfolioData.techStack.slice(0, limit);
  const splitIndex = Math.ceil(items.length / 2);
  const baseRow1 = items.slice(0, splitIndex);
  const baseRow2 = items.slice(splitIndex);

  // Repeat each base row 3x per half so tracks cover wider viewports seamlessly at -50% loop
  const half1 = [...baseRow1, ...baseRow1, ...baseRow1];
  const half2 = [...baseRow2, ...baseRow2, ...baseRow2];
  const row1Items = [...half1, ...half1];
  const row2Items = [...half2, ...half2];

  return (
    <div className="marquee-group relative w-full overflow-hidden py-1">
      {/* Edge Gradient Fade Masks */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-16 bg-gradient-to-r transition-colors duration-300 ${
          isBlack
            ? "from-black via-black/80 to-transparent"
            : "from-white via-white/80 to-transparent"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-16 bg-gradient-to-l transition-colors duration-300 ${
          isBlack
            ? "from-black via-black/80 to-transparent"
            : "from-white via-white/80 to-transparent"
        }`}
      />

      <div className="flex flex-col gap-[10px]">
        {/* Row 1: Leftward Infinite Marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-[10px]">
            {row1Items.map((tech, idx) => (
              <TechLogoBadge
                key={`r1-${tech.id}-${idx}`}
                name={tech.name}
                logoUrl={tech.logo}
                size="md"
                showLabel={false}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-[10px]">
            {row2Items.map((tech, idx) => (
              <TechLogoBadge
                key={`r2-${tech.id}-${idx}`}
                name={tech.name}
                logoUrl={tech.logo}
                size="md"
                showLabel={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
