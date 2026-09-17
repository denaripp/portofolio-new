"use client";

import * as React from "react";
import Link from "next/link";
import { AboutData } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import { Sparkles, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/public/scroll-reveal";

interface AboutPreviewProps {
  about: AboutData | null;
}

export function AboutPreview({ about }: AboutPreviewProps) {
  const { locale, t } = useLanguage();

  const aboutBio = about?.bio ? about.bio[locale] || about.bio.id : "";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal duration={500}>
        <div className="hover-lift-card p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/40 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <Sparkles className="w-4 h-4" />
              <span>{t.about.badge}</span>
            </div>
            <h2 className="heading-title text-2xl sm:text-3xl text-slate-900 dark:text-white">
              {t.about.title}
            </h2>
            <p className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base line-clamp-3">
              {aboutBio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                {about?.location || "Indonesia"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
                {about?.currentEducation || "Informatika / Computer Science"}
              </span>
            </div>
          </div>

          <Link
            href="/about"
            className="btn-interactive inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-800/60 font-semibold text-xs transition-colors shrink-0"
          >
            <span>{t.about.viewMore}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
