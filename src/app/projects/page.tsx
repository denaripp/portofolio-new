"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, FolderKanban } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SubtleGrid } from "@/components/SubtleGrid";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactBanner } from "@/components/ContactBanner";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryOption {
  value: string;
  labelId: string;
  labelEn: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "All", labelId: "Semua Kategori", labelEn: "All Categories" },
  { value: "Landing Page", labelId: "Landing Page", labelEn: "Landing Page" },
  { value: "Multi Page", labelId: "Multi Page", labelEn: "Multi Page" },
  { value: "Full Stack", labelId: "Full Stack", labelEn: "Full Stack" },
  { value: "Marketplace", labelId: "Marketplace", labelEn: "Marketplace" },
  { value: "UI/UX", labelId: "UI / UX", labelEn: "UI / UX" },
];

export default function ProjectsPage() {
  const { isBlack } = useTheme();
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => {
          const targetNorm = activeCategory.toLowerCase().replace(/[\/\s]/g, "");
          const mainCat = p.category.toLowerCase().replace(/[\/\s]/g, "");
          if (mainCat === targetNorm) return true;
          if (
            p.categories &&
            p.categories.some(
              (c) => c.toLowerCase().replace(/[\/\s]/g, "") === targetNorm
            )
          ) {
            return true;
          }
          return false;
        });

  const activeOption =
    CATEGORY_OPTIONS.find((c) => c.value === activeCategory) ||
    CATEGORY_OPTIONS[0];
  const activeLabel = lang === "id" ? activeOption.labelId : activeOption.labelEn;

  return (
    <div
      className={`flex w-full flex-col items-center transition-colors duration-300 ${
        isBlack ? "bg-black text-white" : "bg-white text-[#171918]"
      }`}
    >
      {/* Header Section */}
      <section
        className={`relative z-20 w-full border-b pt-[64px] pb-[48px] transition-colors duration-300 ${
          isBlack ? "border-[#1a1a1a] bg-black" : "border-[#eeeeee] bg-white"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <SubtleGrid height={320} className="top-0" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[992px] flex-col items-start gap-[20px] px-4 sm:px-0">
          <p className="font-display text-[16px] text-[#39a875]">
            {t("projects.pageTitle")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`font-display text-[36px] leading-[42px] tracking-[-0.03em] sm:text-[48px] sm:leading-[54px] ${
              isBlack ? "text-white" : "text-[#171918]"
            }`}
          >
            {t("projects.pageHeading")}
          </motion.h1>
          <p className="font-sans-body max-w-[720px] text-[16px] leading-[26px] text-[#858786] sm:text-[18px]">
            {t("projects.pageSubtitle")}
          </p>

          {/* Category Filter Dropdown */}
          <div ref={dropdownRef} className="relative z-30 mt-2 inline-block">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-[42px] cursor-pointer items-center gap-3 rounded-[8px] border px-4 text-[14px] font-medium transition-all ${
                isBlack
                  ? "border-[#262626] bg-[#0c0c0c] text-white hover:border-[#39a875]/70 hover:bg-[#141414]"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918] hover:border-[#39a875] hover:bg-[#efefef]"
              } ${isOpen ? "border-[#39a875] ring-2 ring-[#39a875]/20" : ""}`}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#858786]">
                  {lang === "id" ? "Kategori:" : "Category:"}
                </span>
                <span className="font-semibold text-[#39a875]">
                  {activeLabel}
                </span>
              </div>
              <ChevronDown
                className={`size-4 text-[#858786] transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#39a875]" : ""
                }`}
              />
            </button>

            {/* Dropdown Popover Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`absolute left-0 z-50 mt-2 min-w-[240px] overflow-hidden rounded-[10px] border p-1.5 shadow-2xl ${
                    isBlack
                      ? "border-[#262626] bg-[#0f0f0f] shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
                      : "border-[#e0e0e0] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                  }`}
                  role="listbox"
                >
                  {CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = activeCategory === cat.value;

                    return (
                      <button
                        key={cat.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setActiveCategory(cat.value);
                          setIsOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center rounded-[6px] px-3 py-2 text-[13px] transition-colors ${
                          isSelected
                            ? isBlack
                              ? "bg-[#14231b] text-[#39a875] font-semibold"
                              : "bg-[#eef8f3] text-[#39a875] font-semibold"
                            : isBlack
                            ? "text-[#d4d4d4] hover:bg-[#1a1a1a] hover:text-white"
                            : "text-[#2e302f] hover:bg-[#f5f5f5] hover:text-black"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isSelected ? (
                            <Check className="size-3.5 text-[#39a875] shrink-0" />
                          ) : (
                            <span className="w-3.5 shrink-0" />
                          )}
                          <span className="font-medium">
                            {lang === "id" ? cat.labelId : cat.labelEn}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section
        className={`w-full py-[48px] transition-colors duration-300 ${
          isBlack ? "bg-black" : "bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[992px] px-4 sm:px-0">
          {filteredProjects.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center rounded-[16px] border py-16 text-center ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a]"
                : "border-[#e5e5e5] bg-[#f7f7f7]"
              }`}
            >
              <FolderKanban className="size-10 text-[#858786]" />
              <h3 className="mt-3 font-display text-[18px]">
                {lang === "id"
                  ? "Belum ada proyek dalam kategori ini"
                  : "No projects in this category yet"}
              </h3>
              <p className="mt-1 text-[14px] text-[#858786]">
                {lang === "id"
                  ? "Pilih kategori lain atau tampilkan semua proyek."
                  : "Select another category or view all projects."}
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-4 cursor-pointer rounded-[6px] border border-[#39a875] px-4 py-2 text-[13px] font-medium text-[#39a875] hover:bg-[#39a875]/10"
              >
                {lang === "id" ? "Tampilkan Semua" : "View All"}
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <ContactBanner />
    </div>
  );
}
