"use client";

import * as React from "react";
import Link from "next/link";
import { SocialLinkItem, FooterData } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import { Mail, MessageSquare, Globe, ArrowUpRight } from "lucide-react";
import { getPlatformIcon } from "@/components/ui/icons";

interface FooterProps {
  socialLinks?: SocialLinkItem[];
  footer?: FooterData | null;
  name?: string;
}

export function Footer({
  socialLinks = [],
  footer,
  name = "Muhammad Najwa Syarif",
}: FooterProps) {
  const { locale, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const tagline =
    footer?.tagline ? (footer.tagline[locale] || footer.tagline.id) : t.footer.tagline;

  const copyrightName = footer?.copyrightName || name || "Muhammad Najwa Syarif";

  return (
    <footer className="border-t border-slate-200 dark:border-navy-800/80 bg-white dark:bg-navy-950 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-navy-800/60">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <Link href="/" className="flex items-center group">
              <span className="font-extrabold text-base tracking-wider uppercase text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                {name}
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {tagline}
            </p>
          </div>

          {/* Social Links from DB */}
          {socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-900/60 text-slate-700 dark:text-slate-300 text-xs font-medium hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-800/60 transition-colors"
                  title={link.platform}
                >
                  {getPlatformIcon(link.icon)}
                  <span>{link.platform}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Bar: Copyright & Navigation Shortcuts */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} {copyrightName}. {t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-orange-500 transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/skills" className="hover:text-orange-500 transition-colors">
              {t.nav.skills}
            </Link>
            <Link href="/projects" className="hover:text-orange-500 transition-colors">
              {t.nav.projects}
            </Link>
            <Link href="/certificates" className="hover:text-orange-500 transition-colors">
              {t.nav.certificates}
            </Link>
            <Link href="/contact" className="hover:text-orange-500 transition-colors">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
