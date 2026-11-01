"use client";

import React from "react";
import { portfolioData, getWhatsAppUrl } from "@/data/portfolio";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export function ContactBanner() {
  const { isBlack } = useTheme();
  const { t } = useLanguage();

  return (
    <section
      className={`no-print w-full py-[48px] transition-colors duration-300 ${
        isBlack ? "bg-black" : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-[992px] px-4 sm:px-0">
        <div
          className={`flex flex-col items-start gap-[16px] rounded-[8px] border p-[24px] sm:min-h-[200px] sm:p-[32px] transition-colors duration-300 ${
            isBlack
              ? "border-[#1a1a1a] bg-[#0a0a0a]"
              : "border-[#e5e5e5] bg-[#f7f7f7]"
          }`}
        >
          <div className="flex items-center gap-[16px]">
            <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[20px] border border-[#39a875]/30 bg-[#39a875]/15">
              <div className="relative size-[24px] shrink-0">
                <img
                  alt=""
                  width={24}
                  height={24}
                  className="block"
                  src="/assets/figma/rocket.svg"
                />
              </div>
            </div>
            <h2
              className={`font-display text-[20px] tracking-[-0.7px] ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              {t("contact.title")}
            </h2>
          </div>

          <p className="font-sans-body text-[16px] leading-[24px] font-normal text-[#858786]">
            {t("contact.subtitle")}
          </p>

          {/* Contact & Social Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-[40px] shrink-0 items-center gap-[6px] rounded-[5px] border px-[16px] shadow-[3px_3px_0px_0px_rgba(57,168,117,0.35)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:border-[#39a875] hover:shadow-[2px_2px_0px_0px_rgba(57,168,117,0.6)] ${
                isBlack
                  ? "border-[#777a78] bg-black text-white"
                  : "border-[#777a78] bg-white text-[#171918]"
              }`}
            >
              <span className="font-sans-body text-[14px] font-normal">
                {t("contact.cta")} (WhatsApp)
              </span>
              <div className="relative size-[16px] shrink-0 transition-transform group-hover:translate-x-0.5">
                <img
                  alt=""
                  width={16}
                  height={16}
                  className={`block ${isBlack ? "invert" : ""}`}
                  src="/assets/figma/chevron-right.svg"
                />
              </div>
            </a>

            <a
              href={portfolioData.profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`flex h-[40px] shrink-0 items-center gap-[8px] rounded-[5px] border px-[14px] transition-all hover:border-[#39a875] ${
                isBlack
                  ? "border-[#262626] bg-[#111111] text-white hover:bg-[#161616]"
                  : "border-[#e0e0e0] bg-white text-[#171918] shadow-xs hover:bg-[#fbfbfb]"
              }`}
            >
              <img
                alt="GitHub"
                width={18}
                height={18}
                className={`block ${isBlack ? "invert" : ""}`}
                src="/assets/figma/github.svg"
              />
              <span className="font-sans-body text-[14px]">GitHub</span>
            </a>

            <a
              href={portfolioData.profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`flex h-[40px] shrink-0 items-center gap-[8px] rounded-[5px] border px-[14px] transition-all hover:border-[#39a875] ${
                isBlack
                  ? "border-[#262626] bg-[#111111] text-white hover:bg-[#161616]"
                  : "border-[#e0e0e0] bg-white text-[#171918] shadow-xs hover:bg-[#fbfbfb]"
              }`}
            >
              <img
                alt="LinkedIn"
                width={18}
                height={18}
                className={`block ${isBlack ? "invert" : ""}`}
                src="/assets/figma/linkedin.svg"
              />
              <span className="font-sans-body text-[14px]">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
