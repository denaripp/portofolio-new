"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SubtleGrid } from "@/components/SubtleGrid";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactBanner } from "@/components/ContactBanner";
import { TechStackBar } from "@/components/TechLogo";
import { CertificateLightbox, type CertificateModalData } from "@/components/CertificateLightbox";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const projectContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function HomePage() {
  const { isBlack } = useTheme();
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);
  const featuredProjects = portfolioData.projects.filter((p) => p.featured);

  return (
    <div
      className={`flex w-full flex-col items-center transition-colors duration-300 ${
        isBlack ? "bg-black text-white" : "bg-white text-[#171918]"
      }`}
    >
      {/* 1. Introduction / Hero Section */}
      <section
        className={`relative min-h-[576px] w-full overflow-hidden transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        {/* Subtle Grid Texture */}
        <SubtleGrid height={520} className="top-[16px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[992px] flex-col items-start px-4 pt-[76px] pb-[48px] sm:px-0">
          {/* Intro Copy with Framer Motion Stagger */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-col items-start gap-[28px]"
          >
            <motion.h1
              variants={heroItemVariants}
              className={`font-display text-[42px] leading-[48px] tracking-[-0.03em] sm:text-[60px] sm:leading-[64px] ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              <span className="block">
                <span>{t("hero.greeting")}{" "}</span>
                <span className="text-[#39a875]">
                  {portfolioData.profile.heroHighlightName}
                </span>
              </span>
              <span className="block">{t("hero.title")}</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className={`font-sans-body max-w-[880px] text-[18px] leading-[28px] font-semibold sm:text-[20px] ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={heroItemVariants}>
              <Link
                href="/about"
                className={`group flex h-[40px] shrink-0 items-center gap-[4px] rounded-[5px] border px-[16px] shadow-[3px_3px_0px_0px_rgba(57,168,117,0.35)] transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] hover:translate-x-[1px] hover:translate-y-[1px] hover:border-[#39a875] hover:shadow-[2px_2px_0px_0px_rgba(57,168,117,0.6)] ${
                  isBlack
                    ? "border-[#777a78] bg-black text-white"
                    : "border-[#777a78] bg-white text-[#171918]"
                }`}
              >
                <span className="font-sans-body text-[14px] font-normal">
                  {t("hero.cta")}
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
              </Link>
            </motion.div>
          </motion.div>

          {/* Technology Stack Dual-Direction Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="mt-[64px] flex w-full max-w-[680px] flex-col items-start gap-[14px]"
          >
            <p
              className={`font-display text-[15px] font-semibold tracking-wide ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              {t("hero.techstack")}
            </p>
            <TechStackBar />
          </motion.div>
        </div>
      </section>

      {/* 2. Highlighted Projects Section */}
      <section
        id="projects"
        className={`w-full py-[36px] transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[992px] flex-col items-start gap-[16px] px-4 sm:px-0">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col items-start gap-[4px]"
          >
            <p className="font-display text-[16px] text-[#39a875]">
              {t("projects.section")}
            </p>
            <h2
              className={`font-display text-[20px] ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              {t("projects.headline")}
            </h2>
          </motion.div>

          {/* Project Gallery with Stagger */}
          <motion.div
            variants={projectContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2"
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>

          {/* See All Projects Button */}
          <div className="mt-[28px] flex w-full items-center justify-center">
            <Link
              href="/projects"
              className={`group flex h-[40px] shrink-0 items-center gap-[4px] rounded-[5px] border px-[16px] transition-all hover:border-[#39a875] ${
                isBlack
                  ? "border-[#1e1e1e] bg-[#0a0a0a] text-white"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918]"
              }`}
            >
              <span className="font-sans-body text-[14px] font-normal">
                {t("projects.seeAll")}
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
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Experience / Certificates Section */}
      <section
        className={`w-full py-[36px] transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[992px] flex-col items-start gap-[14px] px-4 sm:px-0">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col items-start gap-[4px]"
          >
            <p className="font-display text-[16px] text-[#39a875]">
              {t("exp.section")}
            </p>
            <h2
              className={`font-display text-[20px] ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              {t("exp.headline")}
            </h2>
          </motion.div>

          {/* Certificates List with Stagger */}
          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className={`flex w-full flex-col items-start overflow-hidden rounded-[20px] border transition-colors duration-300 ${
              isBlack
                ? "border-[#1a1a1a] bg-[#0a0a0a]"
                : "border-[#e5e5e5] bg-[#f7f7f7]"
            }`}
          >
            {portfolioData.experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={listItemVariants}
                className={`flex min-h-[86px] w-full flex-col justify-between gap-[12px] border-b px-[20px] py-[16px] transition-colors last:border-b-0 sm:flex-row sm:items-center sm:gap-[16px] sm:py-0 ${
                  isBlack
                    ? "border-[#1a1a1a] hover:bg-[#111111]"
                    : "border-[#e5e5e5] hover:bg-[#efefef]"
                }`}
              >
                <div className="flex items-center gap-[16px]">
                  {/* Organization Logo / Thumbnail Trigger */}
                  <button
                    type="button"
                    onClick={() => setSelectedCert(exp)}
                    title="Klik untuk memperbesar sertifikat"
                    aria-label={`Lihat sertifikat ${exp.role}`}
                    className={`group/thumb relative size-[46px] shrink-0 overflow-hidden rounded-[12px] border p-1 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center ${
                      isBlack
                        ? "border-[#262626] bg-[#141414] hover:border-[#39a875] hover:shadow-[0_0_12px_rgba(57,168,117,0.3)]"
                        : "border-[#e0e0e0] bg-white hover:border-[#39a875] hover:shadow-[0_0_12px_rgba(57,168,117,0.2)]"
                    }`}
                    style={{ width: 46, height: 46, minWidth: 46 }}
                  >
                    <img
                      alt={exp.organization}
                      width={38}
                      height={38}
                      className="size-full object-contain transition-transform duration-200 group-hover/thumb:scale-110"
                      src={exp.logoImage || `/assets/org/${exp.logoVariant}.png`}
                    />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center rounded-[11px]">
                      <ZoomIn className="size-3.5 text-[#39a875]" />
                    </div>
                  </button>

                  {/* Role Details */}
                  <div className="flex flex-col items-start gap-[6px]">
                    <h3
                      onClick={() => setSelectedCert(exp)}
                      className={`font-display text-[18px] tracking-[-0.4px] cursor-pointer transition-colors hover:text-[#39a875] ${
                        isBlack ? "text-white" : "text-[#171918]"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <p className="font-mono-ui text-[14px] font-normal text-[#858786]">
                      {exp.organization} · {exp.employmentType}
                    </p>
                  </div>
                </div>

                <p className="font-sans-body pl-[60px] text-[14px] font-normal whitespace-nowrap text-[#858786] sm:pl-0">
                  {exp.period}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* See Full Resume Action */}
          <div className="mt-[24px] flex w-full items-center justify-center">
            <Link
              href="/resume"
              className={`group flex h-[40px] shrink-0 items-center gap-[4px] rounded-[5px] border px-[16px] transition-all hover:border-[#39a875] ${
                isBlack
                  ? "border-[#1e1e1e] bg-[#0a0a0a] text-white"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918]"
              }`}
            >
              <span className="font-sans-body text-[14px] font-normal">
                {t("exp.seeFull")}
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
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Contact CTA Banner */}
      <ContactBanner />

      {/* Certificate Lightbox Modal */}
      <CertificateLightbox
        isOpen={!!selectedCert}
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
