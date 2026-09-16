"use client";

import * as React from "react";
import Link from "next/link";
import { AboutData } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface AboutContentProps {
  about: AboutData | null;
}

export function AboutContent({ about }: AboutContentProps) {
  const { locale, t } = useLanguage();

  const bio = about?.bio ? about.bio[locale] || about.bio.id : "";
  const bioSecondary = about?.bioSecondary
    ? about.bioSecondary[locale] || about.bioSecondary.id
    : locale === "en"
    ? "In every project, I prioritize clean architectural patterns, maintainability, and optimal rendering performance across both client and server boundaries. I am adept with modern toolings, creative workflows, and database architectures."
    : "Dalam setiap project, saya memprioritaskan arsitektur kode yang rapi, kemudahan pemeliharaan, serta performa rendering yang optimal di sisi client maupun server. Saya terbiasa menggunakan ekosistem tools modern, alur kerja kreatif, dan arsitektur database.";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          <Sparkles className="w-4 h-4" />
          <span>{t.about.badge}</span>
        </div>
        <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          {t.about.title}
        </h1>
        <p className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {t.about.subtitle}
        </p>
      </div>

      {/* Main About Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/70 shadow-xs space-y-6">
          <div className="relative aspect-square rounded-2xl bg-radial from-navy-800 to-navy-950 border border-slate-700/60 overflow-hidden flex flex-col items-center justify-center p-6 text-white text-center">
            {about?.profileImage ? (
              <img
                src={about.profileImage}
                alt={about.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="w-24 h-24 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mb-4 shadow-lg">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="heading-title text-xl font-bold">
                  {about?.name || "Muhammad Najwa Syarif"}
                </h2>
                <p className="text-xs text-slate-300 mt-1">Web Developer</p>
              </>
            )}
          </div>

          {/* Quick Meta Fields */}
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {t.about.location}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {about?.location || "Indonesia"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
              <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {t.about.education}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {about?.currentEducation || "Informatika / Computer Science"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
              <Briefcase className="w-4 h-4 text-orange-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {t.about.status}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {about?.status || "Open to Work"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Direct Actions */}
          <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-navy-800">
            {about?.email && (
              <a
                href={`mailto:${about.email}`}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 hover:border-orange-500/50 bg-slate-50 dark:bg-navy-950 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-500" />
                  {about.email}
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {about?.whatsapp && (
              <a
                href={`https://wa.me/${about.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 hover:border-orange-500/50 bg-slate-50 dark:bg-navy-950 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  {about.whatsapp}
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Bio Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-6">
            <h3 className="heading-title text-xl sm:text-2xl text-slate-900 dark:text-white">
              {t.about.professionalProfile}
            </h3>
            <div className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              {bio && <p>{bio}</p>}
              {bioSecondary && <p>{bioSecondary}</p>}
            </div>

            {/* Navigation CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 dark:border-navy-800/80">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors"
              >
                <span>{t.about.viewProjects}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/certificates"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
              >
                <span>{t.about.viewCertificates}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
