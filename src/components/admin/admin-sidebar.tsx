"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Code2,
  Briefcase,
  Award,
  Share2,
  PanelBottom,
  ShieldAlert,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logoutAdminAction } from "@/actions/auth.actions";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero Management", href: "/admin/dashboard/hero", icon: Sparkles },
  { label: "About Me", href: "/admin/dashboard/about", icon: User },
  { label: "Skills", href: "/admin/dashboard/skills", icon: Code2 },
  { label: "Projects", href: "/admin/dashboard/projects", icon: Briefcase },
  { label: "Certificates", href: "/admin/dashboard/certificates", icon: Award },
  { label: "Social Links", href: "/admin/dashboard/social-links", icon: Share2 },
  { label: "Footer", href: "/admin/dashboard/footer", icon: PanelBottom },
  { label: "Admin Profile", href: "/admin/dashboard/profile", icon: ShieldAlert },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-950 flex flex-col justify-between h-screen sticky top-0">
      <div className="p-4 space-y-6">
        {/* Brand / Title */}
        <div className="flex items-center gap-3 px-2 py-2 border-b border-slate-100 dark:border-navy-800">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            <span>CMS</span>
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">
              Admin CMS
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">Portfolio Control</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold border border-orange-200/60 dark:border-orange-800/50"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-100 dark:border-navy-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors"
        >
          <span>Preview Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
