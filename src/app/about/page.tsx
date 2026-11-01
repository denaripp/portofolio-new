"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData, getWhatsAppUrl } from "@/data/portfolio";
import { SubtleGrid } from "@/components/SubtleGrid";
import { ContactBanner } from "@/components/ContactBanner";
import { TechLogoBadge, TechStackBar } from "@/components/TechLogo";
import { Cpu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const techCategories = [
  "Frontend",
  "Backend",
  "Database & Cloud",
  "Testing & Tools",
] as const;

export default function AboutPage() {
  const { isBlack } = useTheme();
  const { t } = useLanguage();

  return (
    <div
      className={`flex w-full flex-col items-center transition-colors duration-300 ${
        isBlack ? "bg-black text-white" : "bg-white text-[#171918]"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative w-full overflow-hidden border-b pt-[64px] pb-[56px] transition-colors duration-300 ${
          isBlack ? "border-[#1a1a1a] bg-black" : "border-[#eeeeee] bg-white"
        }`}
      >
        <SubtleGrid height={360} className="top-0" />

        <div className="relative z-10 mx-auto flex w-full max-w-[992px] flex-col items-start gap-[24px] px-4 sm:px-0">
          <p className="font-display text-[16px] text-[#39a875]">
            {t("about.title")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`font-display text-[38px] leading-[44px] tracking-[-0.03em] sm:text-[54px] sm:leading-[60px] ${
              isBlack ? "text-white" : "text-[#171918]"
            }`}
          >
            {portfolioData.profile.fullName} —{" "}
            <span className="text-[#39a875]">{portfolioData.profile.role}</span>
          </motion.h1>
          <p
            className={`font-sans-body max-w-[780px] text-[18px] leading-[28px] ${
              isBlack ? "text-[#d4d4d4]" : "text-[#555555]"
            }`}
          >
            {portfolioData.profile.heroSubheadline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-[40px] items-center gap-[4px] rounded-[5px] border px-[16px] shadow-[3px_3px_0px_0px_rgba(57,168,117,0.35)] transition-all hover:border-[#39a875] ${
                isBlack
                  ? "border-[#777a78] bg-black text-white"
                  : "border-[#777a78] bg-white text-[#171918]"
              }`}
            >
              <span className="text-[14px]">
                {t("contact.cta")} (WhatsApp)
              </span>
              <img
                alt=""
                width={16}
                height={16}
                className={`block ${isBlack ? "invert" : ""}`}
                src="/assets/figma/chevron-right.svg"
              />
            </a>
            <Link
              href="/resume"
              className={`flex h-[40px] items-center gap-[4px] rounded-[5px] border px-[16px] text-[14px] transition-colors hover:border-[#39a875] ${
                isBlack
                  ? "border-[#1e1e1e] bg-[#0a0a0a] text-white"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918]"
              }`}
            >
              {t("nav.resume")}
            </Link>
          </div>
        </div>
      </section>

      {/* Story & Tech Arsenal */}
      <section
        className={`w-full py-[48px] transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[992px] flex-col gap-[48px] px-4 sm:px-0">
          {/* Personal Profile & Narrative Background */}
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-12">
            {/* Left Column: Profile Photo Only (No extra text) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:col-span-4"
            >
              <div
                className={`relative overflow-hidden rounded-[16px] border p-2 transition-all duration-300 ${
                  isBlack
                    ? "border-[#1e1e1e] bg-[#0c0c0c] shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                    : "border-[#e5e5e5] bg-[#fafafa] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-[#111111]">
                  <img
                    src={portfolioData.profile.aboutAvatar || "/assets/about-profile.webp"}
                    alt={portfolioData.profile.fullName}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative Story & Background */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-center space-y-5 md:col-span-8"
            >
              <div>
                <p className="font-display text-[16px] text-[#39a875]">
                  {t("about.storySection")}
                </p>
                <h2
                  className={`mt-1 font-display text-[26px] leading-[34px] sm:text-[32px] sm:leading-[40px] ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {t("about.storyTitle")}
                </h2>
              </div>

              <div className="space-y-4 font-sans-body text-[16px] leading-[28px]">
                <p
                  className={`text-[17px] leading-[29px] font-medium ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {t("about.bioPara1")}
                </p>
                <p
                  className={
                    isBlack ? "text-[#a8a8a8]" : "text-[#555555]"
                  }
                >
                  {t("about.bioPara2")}
                </p>
                <p
                  className={
                    isBlack ? "text-[#a8a8a8]" : "text-[#555555]"
                  }
                >
                  {t("about.bioPara3")}
                </p>
              </div>


            </motion.div>
          </div>

          {/* Full Technology Arsenal */}
          <div className="space-y-6">
            <div>
              <p className="font-display text-[16px] text-[#39a875]">
                Technical Stack
              </p>
              <h2
                className={`mt-1 font-display text-[22px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {t("about.toolsHeading")}
              </h2>
            </div>

            {/* Visual SVG Tech Stack Strip & Categorized Logos */}
            <div
              className={`rounded-[12px] border p-6 transition-colors duration-300 ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a]"
                  : "border-[#e5e5e5] bg-[#f7f7f7]"
              }`}
            >
              <div className="mb-3 flex items-center gap-2 text-[13px] text-[#858786]">
                <Cpu className="size-4 text-[#39a875]" />
                <span>{t("about.drivers")}</span>
              </div>
              <TechStackBar limit={24} />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techCategories.map((cat) => {
                  const items = portfolioData.techStack.filter(
                    (t) => t.category === cat
                  );
                  return (
                    <div
                      key={cat}
                      className={`rounded-[8px] border p-4 transition-colors duration-300 ${
                        isBlack
                          ? "border-[#1a1a1a] bg-black"
                          : "border-[#e0e0e0] bg-white shadow-xs"
                      }`}
                    >
                      <div className="text-[12px] font-semibold text-[#39a875]">
                        {cat}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {items.map((item) => (
                          <TechLogoBadge
                            key={item.id}
                            name={item.name}
                            logoUrl={item.logo}
                            size="sm"
                            showLabel={true}
                            className={isBlack ? "bg-black" : "bg-white"}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBanner />
    </div>
  );
}
