"use client";

import * as React from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-lg border border-slate-200 dark:border-navy-800 p-0.5 bg-slate-100/70 dark:bg-navy-900/60 text-xs font-semibold"
      role="group"
      aria-label="Language Switcher"
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
          locale === "id"
            ? "bg-white dark:bg-navy-800 text-orange-600 dark:text-orange-400 shadow-xs font-bold"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
        aria-pressed={locale === "id"}
      >
        <Globe className="w-3 h-3 text-orange-500" />
        <span>ID</span>
      </button>

      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
          locale === "en"
            ? "bg-white dark:bg-navy-800 text-orange-600 dark:text-orange-400 shadow-xs font-bold"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
        aria-pressed={locale === "en"}
      >
        <span>EN</span>
      </button>
    </div>
  );
}
