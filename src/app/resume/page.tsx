"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Printer, Mail, MapPin, ZoomIn } from "lucide-react";
import { portfolioData, getWhatsAppUrl, getLocalizedProject } from "@/data/portfolio";
import { SubtleGrid } from "@/components/SubtleGrid";
import { TechLogoBadge } from "@/components/TechLogo";
import { CertificateLightbox, type CertificateModalData } from "@/components/CertificateLightbox";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ResumePage() {
  const { isBlack } = useTheme();
  const { t, lang } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);

  return (
    <div
      className={`flex w-full flex-col items-center transition-colors duration-300 ${
        isBlack ? "bg-black text-white" : "bg-white text-[#171918]"
      }`}
    >
      {/* Top Action Header */}
      <section
        className={`no-print relative w-full overflow-hidden border-b pt-[56px] pb-[40px] transition-colors duration-300 ${
          isBlack ? "border-[#1a1a1a] bg-black" : "border-[#eeeeee] bg-white"
        }`}
      >
        <SubtleGrid height={280} className="top-0" />

        <div className="relative z-10 mx-auto flex w-full max-w-[992px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-end sm:px-0">
          <div>
            <p className="font-display text-[16px] text-[#39a875]">
              {t("resume.badge")}
            </p>
            <h1
              className={`mt-1 font-display text-[36px] leading-[42px] tracking-[-0.03em] sm:text-[48px] sm:leading-[52px] ${
                isBlack ? "text-white" : "text-[#171918]"
              }`}
            >
              {t("resume.title")}
            </h1>
            <p className="mt-2 font-sans-body text-[15px] text-[#858786]">
              {portfolioData.profile.role} · {portfolioData.profile.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              download={`${portfolioData.profile.firstName}-Resume-2026.pdf`}
              className={`inline-flex h-[40px] items-center gap-2 rounded-[5px] border px-[16px] text-[14px] shadow-[3px_3px_0px_0px_rgba(57,168,117,0.35)] transition-all hover:border-[#39a875] ${
                isBlack
                  ? "border-[#777a78] bg-black text-white"
                  : "border-[#777a78] bg-white text-[#171918]"
              }`}
            >
              <Download className="size-4 text-[#39a875]" />
              {t("resume.download")}
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className={`inline-flex h-[40px] cursor-pointer items-center gap-2 rounded-[5px] border px-[16px] text-[14px] transition-colors hover:border-[#39a875] ${
                isBlack
                  ? "border-[#1e1e1e] bg-[#0a0a0a] text-white"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918]"
              }`}
            >
              <Printer className="size-4 text-[#858786]" />
              {t("resume.print")}
            </button>
          </div>
        </div>
      </section>

      {/* Main Resume Document Container */}
      <section
        className={`w-full py-[48px] transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[992px] px-4 sm:px-0">
          <div
            className={`rounded-[20px] border p-6 sm:p-10 transition-colors duration-300 ${
              isBlack
                ? "border-[#1a1a1a] bg-[#0a0a0a]"
                : "border-[#e5e5e5] bg-[#f7f7f7]"
            }`}
          >
            {/* Resume Identity Header */}
            <div
              className={`flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-center ${
                isBlack ? "border-[#1a1a1a]" : "border-[#e5e5e5]"
              }`}
            >
              <div>
                <h2
                  className={`font-display text-[28px] sm:text-[34px] ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {portfolioData.profile.fullName}
                </h2>
                <p className="mt-1 font-display text-[18px] text-[#39a875]">
                  {portfolioData.profile.role}
                </p>
                <p className="mt-3 max-w-[600px] font-sans-body text-[15px] leading-[24px] text-[#858786]">
                  {portfolioData.profile.heroSubheadline}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-[13px] text-[#858786]">
                <div
                  className={`flex items-center gap-2 ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  <MapPin className="size-4 text-[#39a875]" />
                  <span>{portfolioData.profile.location}</span>
                </div>
                <a
                  href={`mailto:${portfolioData.profile.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-[#39a875]"
                >
                  <Mail className="size-4 text-[#39a875]" />
                  <span>{portfolioData.profile.email}</span>
                </a>

                {/* Social & Contact Direct Links (Icon Only) */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    className={`flex size-[32px] items-center justify-center rounded-[8px] border transition-all hover:scale-105 hover:border-[#39a875] ${
                      isBlack
                        ? "border-[#262626] bg-[#141414] hover:bg-[#1a1a1a]"
                        : "border-[#e0e0e0] bg-white shadow-xs hover:bg-[#f7f7f7]"
                    }`}
                  >
                    <img
                      src="/assets/figma/whatsapp.svg"
                      alt="WhatsApp"
                      width={18}
                      height={18}
                      className="block size-[18px] object-contain"
                    />
                  </a>

                  <a
                    href={portfolioData.profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className={`flex size-[32px] items-center justify-center rounded-[8px] border transition-all hover:scale-105 hover:border-[#39a875] ${
                      isBlack
                        ? "border-[#262626] bg-[#141414] hover:bg-[#1a1a1a]"
                        : "border-[#e0e0e0] bg-white shadow-xs hover:bg-[#f7f7f7]"
                    }`}
                  >
                    <img
                      src="/assets/figma/github.svg"
                      alt="GitHub"
                      width={18}
                      height={18}
                      className={`block size-[18px] object-contain ${
                        isBlack ? "invert" : ""
                      }`}
                    />
                  </a>

                  <a
                    href={portfolioData.profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className={`flex size-[32px] items-center justify-center rounded-[8px] border transition-all hover:scale-105 hover:border-[#39a875] ${
                      isBlack
                        ? "border-[#262626] bg-[#141414] hover:bg-[#1a1a1a]"
                        : "border-[#e0e0e0] bg-white shadow-xs hover:bg-[#f7f7f7]"
                    }`}
                  >
                    <img
                      src="/assets/figma/linkedin.svg"
                      alt="LinkedIn"
                      width={18}
                      height={18}
                      className={`block size-[18px] object-contain ${
                        isBlack ? "invert" : ""
                      }`}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Work Experience Section */}
            <div
              className={`mt-8 border-b pb-8 ${
                isBlack ? "border-[#1a1a1a]" : "border-[#e5e5e5]"
              }`}
            >
              <div className="mb-6">
                <p className="font-display text-[14px] text-[#39a875]">
                  01 / {t("resume.workHistory")}
                </p>
                <h3
                  className={`font-display text-[22px] ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {t("resume.workHeading")}
                </h3>
              </div>

              <div className="space-y-6">
                {portfolioData.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className={`rounded-[12px] border p-5 sm:p-6 transition-colors duration-300 ${
                      isBlack
                        ? "border-[#1a1a1a] bg-black"
                        : "border-[#e5e5e5] bg-white shadow-xs"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(exp)}
                          title="Klik untuk memperbesar sertifikat"
                          aria-label={`Lihat sertifikat ${exp.role}`}
                          className={`group/thumb relative size-[48px] shrink-0 overflow-hidden rounded-[12px] border p-1 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center ${
                            isBlack
                              ? "border-[#262626] bg-[#141414] hover:border-[#39a875] hover:shadow-[0_0_12px_rgba(57,168,117,0.3)]"
                              : "border-[#e0e0e0] bg-white hover:border-[#39a875] hover:shadow-[0_0_12px_rgba(57,168,117,0.2)]"
                          }`}
                          style={{ width: 48, height: 48, minWidth: 48 }}
                        >
                          <img
                            alt={exp.organization}
                            width={40}
                            height={40}
                            className="size-full object-contain transition-transform duration-200 group-hover/thumb:scale-110"
                            src={exp.logoImage || `/assets/org/${exp.logoVariant}.png`}
                          />
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center rounded-[11px]">
                            <ZoomIn className="size-3.5 text-[#39a875]" />
                          </div>
                        </button>
                        <div>
                          <h4
                            onClick={() => setSelectedCert(exp)}
                            className={`font-display text-[18px] cursor-pointer transition-colors hover:text-[#39a875] ${
                              isBlack ? "text-white" : "text-[#171918]"
                            }`}
                          >
                            {exp.role}
                          </h4>
                          <p className="font-mono-ui text-[14px] text-[#858786]">
                            {exp.organization} · {exp.employmentType}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`rounded-[4px] border px-3 py-1 font-sans-body text-[13px] text-[#39a875] ${
                          isBlack
                            ? "border-[#1f1f1f] bg-[#0a0a0a]"
                            : "border-[#e5e5e5] bg-[#f7f7f7]"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <p
                      className={`mt-4 font-sans-body text-[15px] leading-[24px] ${
                        isBlack ? "text-[#d4d4d4]" : "text-[#555555]"
                      }`}
                    >
                      {exp.summary}
                    </p>

                    <ul className="mt-3 space-y-2">
                      {exp.highlights.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[14px] leading-[22px] text-[#858786]"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#39a875]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <TechLogoBadge
                            key={tech}
                            name={tech}
                            size="sm"
                            showLabel={true}
                            className={isBlack ? "bg-black" : "bg-white"}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects Summary */}
            <div
              className={`mt-8 border-b pb-8 ${
                isBlack ? "border-[#1a1a1a]" : "border-[#e5e5e5]"
              }`}
            >
              <div className="mb-6">
                <p className="font-display text-[14px] text-[#39a875]">
                  02 / {t("resume.selectedOutput")}
                </p>
                <h3
                  className={`font-display text-[22px] ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {t("resume.featuredSystems")}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {portfolioData.projects.map((proj) => {
                  const item = getLocalizedProject(proj, lang);
                  return (
                    <Link
                      key={item.slug}
                      href={`/projects/${item.slug}`}
                      className={`group flex flex-col justify-between rounded-[12px] border p-5 transition-all hover:border-[#39a875] ${
                        isBlack
                          ? "border-[#1a1a1a] bg-black"
                          : "border-[#e5e5e5] bg-white shadow-xs"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-display text-[18px] transition-colors group-hover:text-[#39a875] ${
                              isBlack ? "text-white" : "text-[#171918]"
                            }`}
                          >
                            {item.title}
                          </h4>
                          <span className="font-mono-ui text-[12px] text-[#858786]">
                            {item.year}
                          </span>
                        </div>
                        <p className="mt-2 font-sans-body text-[14px] leading-[22px] text-[#858786]">
                          {item.summary}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.techStack.map((t) => (
                          <TechLogoBadge
                            key={t}
                            name={t}
                            size="sm"
                            showLabel={true}
                            className={isBlack ? "bg-black" : "bg-white"}
                          />
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Skills & Education */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="font-display text-[14px] text-[#39a875]">
                  03 / {t("resume.skills")}
                </p>
                <h3
                  className={`mt-1 font-display text-[20px] ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {t("resume.techSkills")}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {portfolioData.techStack.map((skill) => (
                    <TechLogoBadge
                      key={skill.id}
                      name={skill.name}
                      logoUrl={skill.logo}
                      size="sm"
                      showLabel={true}
                      className={isBlack ? "bg-black" : "bg-white"}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-[14px] text-[#39a875]">
                  04 / {t("resume.academic")}
                </p>
                <h3
                  className={`mt-1 font-display text-[20px] ${
                    isBlack ? "text-white" : "text-[#171918]"
                  }`}
                >
                  {t("resume.education")}
                </h3>
                <div className="mt-4 space-y-4">
                  {portfolioData.education.map((edu) => (
                    <div
                      key={edu.degree}
                      className={`rounded-[10px] border p-4 transition-colors duration-300 ${
                        isBlack
                          ? "border-[#1a1a1a] bg-black"
                          : "border-[#e5e5e5] bg-white shadow-xs"
                      }`}
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div
                          className={`font-display text-[16px] tracking-tight ${
                            isBlack ? "text-white" : "text-[#171918]"
                          }`}
                        >
                          {edu.degree}
                        </div>
                        <div className="font-mono-ui text-[13px] font-semibold text-[#39a875]">
                          {edu.period}
                        </div>
                      </div>
                      {edu.institution && (
                        <div className="mt-1 text-[13px] text-[#858786]">
                          {edu.institution}
                        </div>
                      )}
                      {edu.description && (
                        <p className="mt-2 text-[13px] leading-[20px] text-[#858786]">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Lightbox Modal */}
      <CertificateLightbox
        isOpen={!!selectedCert}
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
