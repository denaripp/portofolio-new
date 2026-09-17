import type { Metadata } from "next";
import { publicService } from "@/services/public.service";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/server";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { SkillLevel } from "@/types/content";
import { ScrollReveal } from "@/components/public/scroll-reveal";
import {
  Code2,
  Wrench,
  Sparkles,
  Layers,
  Palette,
  Camera,
  Video,
  Megaphone,
  Feather,
  LucideIcon,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return constructPageMetadata("skills", { locale, path: "/skills" });
}

const LEVEL_CONFIG: Record<SkillLevel, { percent: number; color: string }> = {
  BEGINNER: { percent: 40, color: "bg-sky-500" },
  INTERMEDIATE: { percent: 75, color: "bg-orange-500" },
  ADVANCED: { percent: 95, color: "bg-emerald-500" },
};

function getCategoryIcon(categoryName: string): LucideIcon {
  const lower = categoryName.toLowerCase();
  if (lower.includes("dev") || lower.includes("front") || lower.includes("back") || lower.includes("code") || lower.includes("tech")) {
    return Code2;
  }
  if (lower.includes("design") || lower.includes("ui") || lower.includes("ux") || lower.includes("art")) {
    return Palette;
  }
  if (lower.includes("photo") || lower.includes("camera") || lower.includes("gambar")) {
    return Camera;
  }
  if (lower.includes("video") || lower.includes("motion") || lower.includes("film") || lower.includes("animat")) {
    return Video;
  }
  if (lower.includes("market") || lower.includes("seo") || lower.includes("ads") || lower.includes("sales")) {
    return Megaphone;
  }
  if (lower.includes("write") || lower.includes("content") || lower.includes("tulis") || lower.includes("copy")) {
    return Feather;
  }
  if (lower.includes("tool") || lower.includes("ops") || lower.includes("soft")) {
    return Wrench;
  }
  return Layers;
}

export default async function SkillsPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);
  const skills = await publicService.getSkills();

  // Group skills dynamically by category
  const categories = Array.from(new Set(skills.map((s) => s.category || "General").filter(Boolean)));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <ScrollReveal className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          <Sparkles className="w-4 h-4" />
          <span>{t.skills.badge}</span>
        </div>
        <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          {t.skills.title}
        </h1>
        <p className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {t.skills.subtitle}
        </p>
      </ScrollReveal>

      {/* Dynamic Category Sections */}
      {categories.length > 0 ? (
        <div className="space-y-12">
          {categories.map((categoryName) => {
            const categorySkills = skills.filter((s) => (s.category || "General") === categoryName);
            if (categorySkills.length === 0) return null;

            const IconComponent = getCategoryIcon(categoryName);

            return (
              <ScrollReveal key={categoryName} className="space-y-6" duration={500}>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-navy-800">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="heading-title text-xl text-slate-900 dark:text-white">
                      {categoryName}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {categorySkills.length} keahlian &amp; tools terdaftar
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => {
                    const levelCfg = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG.INTERMEDIATE;
                    const levelLabel =
                      skill.level === "BEGINNER"
                        ? t.skills.levels.beginner
                        : skill.level === "INTERMEDIATE"
                        ? t.skills.levels.intermediate
                        : t.skills.levels.advanced;

                    return (
                      <ScrollReveal key={skill.id} delay={index * 50} duration={450}>
                        <div className="hover-lift-card h-full p-5 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-2xs hover:border-orange-500/50 space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-sm overflow-hidden border border-slate-200/80 dark:border-navy-700 shrink-0">
                                {skill.icon && (skill.icon.startsWith("/") || skill.icon.startsWith("http")) ? (
                                  <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-full h-full object-contain p-1.5"
                                  />
                                ) : (
                                  <Layers className="w-5 h-5 text-orange-500" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                                  {skill.name}
                                </h3>
                              </div>
                            </div>

                            {/* Level Badge */}
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700 shrink-0">
                              {levelLabel}
                            </span>
                          </div>

                          {/* Visual Level Progress Bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              <span>{t.skills.proficiency}</span>
                              <span>{levelCfg.percent}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-navy-950 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${levelCfg.color} transition-all duration-500`}
                                style={{ width: `${levelCfg.percent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/40 text-slate-500">
          <Layers className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <p className="font-semibold text-sm">Belum ada skill yang terdaftar.</p>
        </div>
      )}
    </div>
  );
}
