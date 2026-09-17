"use client";

import * as React from "react";
import Link from "next/link";
import { SkillItem } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import { Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/public/scroll-reveal";
import { SkillIcon } from "@/components/ui/skill-icon";

interface HomeSkillsPreviewProps {
  skills: SkillItem[];
}

export function HomeSkillsPreview({ skills }: HomeSkillsPreviewProps) {
  const { t } = useLanguage();
  const topSkills = skills.slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <Sparkles className="w-4 h-4" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="heading-title text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {t.skills.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.skills.subtitle}
          </p>
        </div>

        <Link
          href="/skills"
          className="btn-interactive inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 transition-colors"
        >
          <span>{t.skills.viewAll}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {topSkills.map((skill, index) => (
          <ScrollReveal key={skill.id} delay={index * 60} duration={450}>
            <div className="hover-lift-card h-full p-4 rounded-xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-2xs hover:border-orange-500/50 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-lg bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-orange-600 dark:text-orange-400 overflow-hidden border border-slate-200/80 dark:border-navy-700">
                <SkillIcon
                  icon={skill.icon}
                  name={skill.name}
                  className="w-full h-full object-contain p-1.5"
                  fallbackClassName="w-5 h-5 text-orange-500"
                />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {skill.name}
                </p>
                <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{skill.category}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
