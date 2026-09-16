"use client";

import * as React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function HomeCta() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-14 rounded-3xl bg-navy-900 dark:bg-navy-900 border border-slate-700/80 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-slate-700 text-xs text-orange-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
            <span>{t.cta.badge}</span>
          </div>
          <h2 className="heading-display text-3xl sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="text-body text-slate-300 text-xs sm:text-sm">
            {t.cta.desc}
          </p>
        </div>

        <div className="relative pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm shadow-md transition-colors"
          >
            <span>{t.cta.button}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
