"use client";

import * as React from "react";
import Link from "next/link";
import { HeroData, AboutData } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import { ArrowRight, Terminal } from "lucide-react";

interface HeroSectionProps {
  hero: HeroData | null;
  about: AboutData | null;
}

export function HeroSection({ hero, about }: HeroSectionProps) {
  const { locale, t } = useLanguage();

  const heroRole = hero?.role
    ? hero.role[locale] || hero.role.id
    : t.hero.roleFallback;

  const heroSpecialization = hero?.specialization
    ? hero.specialization[locale] || hero.specialization.id
    : "Next.js & React";

  const heroHeadline = hero?.headline
    ? hero.headline[locale] || hero.headline.id
    : "Building modern, fast, and scalable web experiences.";

  const heroDesc = hero?.description
    ? hero.description[locale] || hero.description.id
    : "Specializing in modern frontend & full-stack development with Next.js & PostgreSQL.";

  const heroPrimaryCta = hero?.primaryCtaText
    ? hero.primaryCtaText[locale] || hero.primaryCtaText.id
    : t.hero.viewProjects;

  const heroSecondaryCta = hero?.secondaryCtaText
    ? hero.secondaryCtaText[locale] || hero.secondaryCtaText.id
    : t.hero.contactMe;

  const statusText = about?.status || t.hero.openToWork;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-6 sm:pt-12">
        {/* Left Column: Text & CTAs */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{statusText}</span>
          </div>

          {/* Title & Role */}
          <div className="space-y-3">
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              {hero?.name || "Muhammad Najwa Syarif"}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-orange-600 dark:text-orange-400">
              {heroRole}
            </p>
          </div>

          {/* Tagline / Headline */}
          <h2 className="heading-subtitle text-xl sm:text-2xl text-slate-800 dark:text-slate-200 font-medium">
            {heroHeadline}
          </h2>

          {/* Description */}
          <p className="text-body text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
            {heroDesc}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href={hero?.primaryCtaUrl || "/projects"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <span>{heroPrimaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={hero?.secondaryCtaUrl || "/contact"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-navy-600 font-semibold text-sm transition-all duration-150"
            >
              <span>{heroSecondaryCta}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Avatar / Profile Card */}
        <div className="w-full max-w-md lg:w-[420px] shrink-0">
          <div className="relative p-6 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/80 shadow-xl space-y-6">
            <div className="relative w-full aspect-square rounded-2xl bg-radial from-navy-800 to-navy-950 border border-slate-700/60 overflow-hidden flex flex-col items-center justify-center p-6 text-white shadow-inner">
              {hero?.profileImage ? (
                <img
                  src={hero.profileImage}
                  alt={hero.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="w-24 h-24 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mb-4 shadow-lg">
                    <Terminal className="w-12 h-12" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-bold text-lg tracking-tight">
                      {hero?.name || "Muhammad Najwa Syarif"}
                    </p>
                    <p className="text-xs text-slate-300 font-mono">
                      Full Stack &amp; Frontend Engineer
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Quick Profile Snippets */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  {t.hero.statusLabel}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {statusText}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  {t.hero.specializationLabel}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {heroSpecialization}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
