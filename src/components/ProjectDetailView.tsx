"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2, Layers } from "lucide-react";
import { ProjectItem } from "@/data/portfolio";
import { SubtleGrid } from "@/components/SubtleGrid";
import { ContactBanner } from "@/components/ContactBanner";
import { TechLogoBadge } from "@/components/TechLogo";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectDetailViewProps {
  project: ProjectItem;
  nextProject: ProjectItem;
}

export function ProjectDetailView({
  project,
  nextProject,
}: ProjectDetailViewProps) {
  const { isBlack } = useTheme();
  const { t } = useLanguage();

  return (
    <div
      className={`flex w-full flex-col items-center transition-colors duration-300 ${
        isBlack ? "bg-black text-white" : "bg-white text-[#171918]"
      }`}
    >
      {/* Header Section */}
      <section
        className={`relative w-full overflow-hidden border-b pt-[48px] pb-[48px] transition-colors duration-300 ${
          isBlack ? "border-[#1a1a1a] bg-black" : "border-[#eeeeee] bg-white"
        }`}
      >
        <SubtleGrid height={360} className="top-0" />

        <div className="relative z-10 mx-auto flex w-full max-w-[992px] flex-col items-start gap-[24px] px-4 sm:px-0">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[14px] text-[#858786] transition-colors hover:text-[#39a875]"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            {t("projects.back")}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-[5px] border border-[#39a875]/30 bg-[#39a875]/15 px-3 py-1 text-[12px] font-medium text-[#39a875]">
              {project.category}
            </span>
            <span className="font-mono-ui text-[13px] text-[#858786]">
              {project.year} · {project.clientOrContext}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`font-display text-[38px] leading-[44px] tracking-[-0.03em] sm:text-[52px] sm:leading-[58px] ${
              isBlack ? "text-white" : "text-[#171918]"
            }`}
          >
            {project.title}
          </motion.h1>

          <p
            className={`font-sans-body max-w-[780px] text-[18px] leading-[28px] ${
              isBlack ? "text-[#d4d4d4]" : "text-[#555555]"
            }`}
          >
            {project.description}
          </p>

          {/* Meta & Action Bar */}
          <div
            className={`mt-2 flex w-full flex-col justify-between gap-6 border-t pt-6 sm:flex-row sm:items-center ${
              isBlack ? "border-[#1a1a1a]" : "border-[#eeeeee]"
            }`}
          >
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-[12px] text-[#858786]">
                  {t("projects.role")}
                </div>
                <div
                  className={`mt-0.5 text-[14px] font-medium ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {project.role}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#858786]">
                  {t("projects.timeline")}
                </div>
                <div
                  className={`mt-0.5 text-[14px] font-medium ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {project.duration}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#858786]">
                  {t("projects.year")}
                </div>
                <div
                  className={`mt-0.5 text-[14px] font-medium ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {project.year}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-[40px] items-center gap-2 rounded-[5px] border px-[16px] text-[14px] shadow-[3px_3px_0px_0px_rgba(57,168,117,0.35)] transition-all hover:border-[#39a875] ${
                    isBlack
                      ? "border-[#777a78] bg-black text-white"
                      : "border-[#777a78] bg-white text-[#171918]"
                  }`}
                >
                  {t("projects.livePreview")}
                  <ExternalLink className="size-3.5 text-[#39a875]" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-[40px] items-center gap-2 rounded-[5px] border px-[16px] text-[14px] transition-colors hover:border-[#39a875] ${
                    isBlack
                      ? "border-[#1e1e1e] bg-[#0a0a0a] text-white"
                      : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918]"
                  }`}
                >
                  {t("projects.sourceCode")}
                  <img
                    alt=""
                    width={16}
                    height={16}
                    className={`block ${isBlack ? "invert" : ""}`}
                    src="/assets/figma/github.svg"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Content */}
      <section
        className={`w-full py-[48px] transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[992px] flex-col gap-[40px] px-4 sm:px-0">
          {/* Visual Showcase Container */}
          <div
            className={`flex flex-col items-center justify-center overflow-hidden rounded-[12px] border p-4 sm:p-8 transition-colors duration-300 ${
              isBlack
                ? "border-[#1a1a1a] bg-[#0a0a0a]"
                : "border-[#e5e5e5] bg-[#f7f7f7]"
            }`}
          >
            <div
              className={`relative h-[274px] w-full max-w-[488px] overflow-hidden rounded-[8px] border ${
                isBlack ? "border-[#1f1f1f]" : "border-[#e0e0e0]"
              }`}
              style={{ height: 274, maxHeight: 274 }}
            >
              <Image
                src={project.coverImage || `/assets/projects/${project.slug}.png`}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 488px"
                className="object-cover pointer-events-none"
              />
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className={`flex flex-col justify-between rounded-[8px] border p-6 transition-colors duration-300 ${
                  isBlack
                    ? "border-[#1a1a1a] bg-[#0a0a0a]"
                    : "border-[#e5e5e5] bg-[#f7f7f7]"
                }`}
              >
                <span className="text-[13px] text-[#858786]">
                  {metric.label}
                </span>
                <span className="mt-2 font-display text-[32px] tracking-[-0.02em] text-[#39a875]">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className={`rounded-[8px] border p-6 sm:p-8 transition-colors duration-300 ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a]"
                  : "border-[#e5e5e5] bg-[#f7f7f7]"
              }`}
            >
              <div className="font-display text-[14px] text-[#39a875]">
                01 / {t("projects.challenge")}
              </div>
              <h2
                className={`mt-2 font-display text-[22px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {project.challengeTitle || t("projects.challenge")}
              </h2>
              <p className="mt-4 font-sans-body text-[16px] leading-[26px] text-[#858786]">
                {project.challenge}
              </p>
            </div>

            <div
              className={`rounded-[8px] border p-6 sm:p-8 transition-colors duration-300 ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a]"
                  : "border-[#e5e5e5] bg-[#f7f7f7]"
              }`}
            >
              <div className="font-display text-[14px] text-[#39a875]">
                02 / {t("projects.solution")}
              </div>
              <h2
                className={`mt-2 font-display text-[22px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {project.solutionTitle || t("projects.solution")}
              </h2>
              <p className="mt-4 font-sans-body text-[16px] leading-[26px] text-[#858786]">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features & Architecture */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className={`rounded-[8px] border p-6 sm:p-8 transition-colors duration-300 ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a]"
                  : "border-[#e5e5e5] bg-[#f7f7f7]"
              }`}
            >
              <h3
                className={`font-display flex items-center gap-2 text-[20px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                <CheckCircle2 className="size-5 text-[#39a875]" />
                {t("projects.capabilities")}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {project.keyFeatures.map((feat) => (
                  <li
                    key={feat}
                    className={`flex items-start gap-3 text-[15px] leading-[24px] ${
                      isBlack ? "text-[#d4d4d4]" : "text-[#555555]"
                    }`}
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#39a875]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-[8px] border p-6 sm:p-8 transition-colors duration-300 ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a]"
                  : "border-[#e5e5e5] bg-[#f7f7f7]"
              }`}
            >
              <h3
                className={`font-display flex items-center gap-2 text-[20px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                <Layers className="size-5 text-[#39a875]" />
                {t("projects.architecture")}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {project.architectureHighlights.map((arch) => (
                  <li
                    key={arch}
                    className={`flex items-start gap-3 text-[15px] leading-[24px] ${
                      isBlack ? "text-[#d4d4d4]" : "text-[#555555]"
                    }`}
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#39a875]" />
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-6 border-t pt-5 ${
                  isBlack ? "border-[#1a1a1a]" : "border-[#eeeeee]"
                }`}
              >
                <div className="text-[12px] font-medium text-[#858786]">
                  {t("projects.techUsed")}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechLogoBadge
                      key={tech}
                      name={tech}
                      size="sm"
                      showLabel={true}
                      className={isBlack ? "bg-black" : "bg-white"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Case Study Navigation */}
          <div
            className={`flex flex-col items-start justify-between gap-4 rounded-[8px] border p-6 sm:flex-row sm:items-center transition-colors duration-300 ${
              isBlack
                ? "border-[#1a1a1a] bg-[#0a0a0a]"
                : "border-[#e5e5e5] bg-[#f7f7f7]"
            }`}
          >
            <div>
              <div className="text-[12px] text-[#39a875]">
                {t("projects.next")}
              </div>
              <div
                className={`mt-1 font-display text-[20px] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {nextProject.title}
              </div>
              <p className="mt-0.5 text-[14px] text-[#858786]">
                {nextProject.summary}
              </p>
            </div>
            <Link
              href={`/projects/${nextProject.slug}`}
              className={`group flex h-[40px] shrink-0 items-center gap-[4px] rounded-[5px] border px-[16px] transition-colors hover:border-[#39a875] ${
                isBlack
                  ? "border-[#1e1e1e] bg-black text-white"
                  : "border-[#e0e0e0] bg-white text-[#171918]"
              }`}
            >
              <span className="text-[14px]">{t("projects.view")}</span>
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

      <ContactBanner />
    </div>
  );
}
