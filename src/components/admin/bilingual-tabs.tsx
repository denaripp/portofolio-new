"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BilingualTabsProps {
  activeTab: "id" | "en";
  onChange: (tab: "id" | "en") => void;
}

export function BilingualTabs({ activeTab, onChange }: BilingualTabsProps) {
  return (
    <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 w-fit">
      <button
        type="button"
        onClick={() => onChange("id")}
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
          activeTab === "id"
            ? "bg-white dark:bg-navy-800 text-orange-600 dark:text-orange-400 shadow-xs"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
      >
        <span>🇮🇩</span>
        <span>Indonesia</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("en")}
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
          activeTab === "en"
            ? "bg-white dark:bg-navy-800 text-orange-600 dark:text-orange-400 shadow-xs"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
      >
        <span>🇬🇧</span>
        <span>English</span>
      </button>
    </div>
  );
}
