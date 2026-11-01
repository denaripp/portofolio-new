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
          className={`${iconSizes[size]} shrink-0 object-contain transition-transform duration-200 group-hover/label:scale-110`}
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
        className={`${iconSizes[size]} object-contain transition-transform duration-200 group-hover/badge:scale-110`}
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

const TECH_ROW_1 = [
  { id: "nextjs", name: "Next.js", logo: "/assets/tech/nextjs.svg" },
  { id: "typescript", name: "TypeScript", logo: "/assets/tech/typescript.svg" },
  { id: "react", name: "React", logo: "/assets/tech/react.svg" },
  { id: "tailwindcss", name: "Tailwind CSS", logo: "/assets/tech/tailwindcss.svg" },
  { id: "nodejs", name: "Node.js", logo: "/assets/tech/nodejs.svg" },
  { id: "playwright", name: "Playwright", logo: "/assets/tech/playwright.svg" },
  { id: "python", name: "Python", logo: "/assets/tech/python.svg" },
  { id: "vite", name: "Vite", logo: "/assets/tech/vite.svg" },
  { id: "figma", name: "Figma", logo: "/assets/tech/figma.svg" },
  { id: "html", name: "HTML", logo: "/assets/tech/html.svg" },
  { id: "javascript", name: "JavaScript", logo: "/assets/tech/javascript.svg" },
  { id: "zustand", name: "Zustand", logo: "/assets/tech/zustand.svg" },
];

const TECH_ROW_2 = [
  { id: "postgresql", name: "PostgreSQL", logo: "/assets/tech/postgresql.svg" },
  { id: "supabase", name: "Supabase", logo: "/assets/tech/supabase.svg" },
  { id: "prisma", name: "Prisma", logo: "/assets/tech/prisma.svg" },
  { id: "nestjs", name: "NestJS", logo: "/assets/tech/nestjs.svg" },
  { id: "laravel", name: "Laravel", logo: "/assets/tech/laravel.svg" },
  { id: "docker", name: "Docker", logo: "/assets/tech/docker.svg" },
  { id: "git", name: "Git", logo: "/assets/tech/git.svg" },
  { id: "github", name: "GitHub", logo: "/assets/tech/github.svg" },
  { id: "postman", name: "Postman", logo: "/assets/tech/postman.svg" },
  { id: "cicd", name: "CI/CD", logo: "/assets/tech/cicd.svg" },
  { id: "wordpress", name: "WordPress", logo: "/assets/tech/wordpress.svg" },
  { id: "vercel", name: "Vercel", logo: "/assets/tech/vercel.svg" },
];

export function TechStackBar({ limit = 24 }: TechStackBarProps) {
  const { isBlack } = useTheme();

  // Duplicate arrays to achieve seamless infinite loop
  const row1Items = [...TECH_ROW_1, ...TECH_ROW_1];
  const row2Items = [...TECH_ROW_2, ...TECH_ROW_2];

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
