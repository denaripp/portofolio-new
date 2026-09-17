import type { Metadata } from "next";
import { publicService } from "@/services/public.service";
import { CertificateLightbox } from "@/components/public/certificate-lightbox";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/server";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { Award, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/public/scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return constructPageMetadata("certificates", { locale, path: "/certificates" });
}

export default async function CertificatesPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);
  const certificates = await publicService.getCertificates(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <ScrollReveal className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          <Sparkles className="w-4 h-4" />
          <span>{t.certificates.badge}</span>
        </div>
        <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          {t.certificates.title}
        </h1>
        <p className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {t.certificates.subtitle}
        </p>
      </ScrollReveal>

      {/* Certificates Lightbox Grid */}
      {certificates.length > 0 ? (
        <ScrollReveal delay={100} duration={500}>
          <CertificateLightbox certificates={certificates} />
        </ScrollReveal>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/40 text-slate-500">
          <Award className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <p className="font-semibold text-sm">{t.certificates.empty}</p>
          <p className="text-xs mt-1">{t.certificates.emptySub}</p>
        </div>
      )}
    </div>
  );
}
