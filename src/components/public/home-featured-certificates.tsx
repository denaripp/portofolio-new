"use client";

import * as React from "react";
import Link from "next/link";
import { CertificateItem } from "@/types/content";
import { CertificateLightbox } from "@/components/public/certificate-lightbox";
import { useLanguage } from "@/components/providers/language-provider";
import { Award, ArrowRight } from "lucide-react";

interface HomeFeaturedCertificatesProps {
  certificates: CertificateItem[];
}

export function HomeFeaturedCertificates({
  certificates,
}: HomeFeaturedCertificatesProps) {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <Award className="w-4 h-4" />
            <span>{t.certificates.badge}</span>
          </div>
          <h2 className="heading-title text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {t.certificates.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.certificates.subtitle}
          </p>
        </div>

        <Link
          href="/certificates"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 transition-colors"
        >
          <span>{t.certificates.viewAll}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {certificates.length > 0 ? (
        <CertificateLightbox certificates={certificates} />
      ) : (
        <p className="text-xs text-slate-500 italic">
          {t.certificates.empty}
        </p>
      )}
    </section>
  );
}
