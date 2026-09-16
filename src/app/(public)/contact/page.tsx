import type { Metadata } from "next";
import { publicService } from "@/services/public.service";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/server";
import { constructPageMetadata } from "@/lib/seo/metadata";
import {
  Mail,
  MessageSquare,
  Globe,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { getPlatformIcon } from "@/components/ui/icons";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return constructPageMetadata("contact", { locale, path: "/contact" });
}

export default async function ContactPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  const [socialLinks, about] = await Promise.all([
    publicService.getSocialLinks(),
    publicService.getAbout(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          <Sparkles className="w-4 h-4" />
          <span>{t.contact.badge}</span>
        </div>
        <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          {t.contact.title}
        </h1>
        <p className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Direct Fast Channels */}
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="heading-title text-base text-slate-900 dark:text-white">
                {t.contact.fastResponseTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.contact.fastResponseSubtitle}
              </p>
            </div>
          </div>

          <p className="text-body text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {t.contact.fastResponseDesc}
          </p>

          <div className="space-y-3 pt-2">
            {about?.whatsapp && (
              <a
                href={`https://wa.me/${about.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 block">
                      {t.contact.whatsappMessenger}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {about.whatsapp}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {about?.email && (
              <a
                href={`mailto:${about.email}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 hover:border-orange-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {t.contact.directEmail}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {about.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Social Links from Database */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-6">
            <div>
              <h2 className="heading-title text-xl text-slate-900 dark:text-white">
                {t.contact.socialPlatformsTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.contact.socialPlatformsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/60 hover:bg-white dark:hover:bg-navy-900 hover:border-orange-500/50 hover:shadow-xs transition-all duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 group-hover:bg-orange-50 dark:group-hover:bg-orange-950/40 border border-slate-200 dark:border-navy-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {getPlatformIcon(link.icon)}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {link.platform}
                      </span>
                      <span className="block text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
                        {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-navy-800 text-xs text-slate-500 dark:text-slate-400">
              <p>{t.contact.managedNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
