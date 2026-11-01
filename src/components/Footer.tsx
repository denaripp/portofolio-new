"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { SubtleGrid } from "@/components/SubtleGrid";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { isBlack } = useTheme();
  const { t } = useLanguage();

  return (
    <footer
      className={`no-print relative w-full overflow-hidden border-t transition-colors duration-300 ${
        isBlack
          ? "border-[#1a1a1a] bg-black text-white"
          : "border-[#eeeeee] bg-white text-[#171918]"
      }`}
    >
      {/* Subtle Grid Texture */}
      <SubtleGrid height={316} className="top-0" />

      <div className="relative z-10 mx-auto flex min-h-[316px] w-full max-w-[992px] flex-col justify-between px-4 pt-[39px] pb-[28px] sm:px-0">
        {/* Footer Panel */}
        <div
          className={`flex w-full flex-col justify-between gap-8 rounded-[20px] border p-[24px] sm:min-h-[200px] sm:flex-row sm:items-start sm:p-[32px] transition-colors duration-300 ${
            isBlack
              ? "border-[#1a1a1a] bg-[#0a0a0a]"
              : "border-[#e5e5e5] bg-[#f7f7f7]"
          }`}
        >
          {/* Left: Profile Identity */}
          <div className="flex max-w-[380px] flex-col items-start gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <div
                className="relative size-[36px] shrink-0 overflow-hidden rounded-[6px] flex items-center justify-center border border-[#262626] bg-[#0a0a0a] p-1.5"
                style={{ width: 36, height: 36, minWidth: 36 }}
              >
                <img
                  alt="Arif Monogram"
                  width={22}
                  height={22}
                  className="pointer-events-none object-contain"
                  src="/assets/logo.svg"
                />
              </div>
              <p
                className={`font-display text-[14px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {portfolioData.profile.fullName}
              </p>
            </div>

            <div className="flex flex-col items-start gap-[8px] text-[14px]">
              <p
                className={`font-mono-ui font-semibold ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {portfolioData.profile.role}
              </p>
              <p className="font-mono-ui leading-[20px] font-normal text-[#858786]">
                {portfolioData.profile.shortBio}
              </p>
            </div>
          </div>

          {/* Right: Explore + Connect */}
          <div className="flex items-start gap-[56px] sm:gap-[80px]">
            <div className="flex flex-col items-start gap-[12px] text-[14px]">
              <p
                className={`font-mono-ui font-semibold ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {t("footer.explore")}
              </p>
              <Link
                href="/"
                className="font-mono-ui font-normal text-[#858786] transition-colors hover:text-[#39a875]"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className="font-mono-ui font-normal text-[#858786] transition-colors hover:text-[#39a875]"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/projects"
                className="font-mono-ui font-normal text-[#858786] transition-colors hover:text-[#39a875]"
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="/resume"
                className="font-mono-ui font-normal text-[#858786] transition-colors hover:text-[#39a875]"
              >
                {t("nav.resume")}
              </Link>
            </div>

            <div className="flex flex-col items-start gap-[16px]">
              <p
                className={`font-mono-ui text-[14px] font-semibold ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {t("footer.connect")}
              </p>
              <div className="flex items-start gap-[12px]">
                <a
                  href={portfolioData.profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`flex size-[40px] shrink-0 items-center justify-center rounded-[20px] border transition-colors hover:border-[#39a875] ${
                    isBlack
                      ? "border-[#262626] bg-black"
                      : "border-[#e0e0e0] bg-white shadow-xs"
                  }`}
                >
                  <div className="relative size-[20px] shrink-0">
                    <img
                      alt="GitHub"
                      width={20}
                      height={20}
                      className={`block ${isBlack ? "invert" : ""}`}
                      src="/assets/figma/github.svg"
                    />
                  </div>
                </a>

                <a
                  href={portfolioData.profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`flex size-[40px] shrink-0 items-center justify-center rounded-[20px] border transition-colors hover:border-[#39a875] ${
                    isBlack
                      ? "border-[#262626] bg-black"
                      : "border-[#e0e0e0] bg-white shadow-xs"
                  }`}
                >
                  <div className="relative size-[20px] shrink-0">
                    <img
                      alt="LinkedIn"
                      width={20}
                      height={20}
                      className={`block ${isBlack ? "invert" : ""}`}
                      src="/assets/figma/linkedin.svg"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Location */}
        <div className="mt-6 flex w-full flex-col items-start justify-between gap-2 text-[12px] text-[#858786] sm:flex-row sm:items-center">
          <p>
            © 2026 {portfolioData.profile.fullName}. {t("footer.rights")}
          </p>
          <p>{portfolioData.profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
