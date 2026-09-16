"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AdminSession } from "@/types/admin";
import { Shield, Menu, X, LayoutDashboard, Sparkles, User, Code2, Briefcase, Award, Share2, ShieldAlert, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/actions/auth.actions";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  session: AdminSession | null;
  title: string;
  subtitle?: string;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/dashboard/hero", icon: Sparkles },
  { label: "About", href: "/admin/dashboard/about", icon: User },
  { label: "Skills", href: "/admin/dashboard/skills", icon: Code2 },
  { label: "Projects", href: "/admin/dashboard/projects", icon: Briefcase },
  { label: "Certificates", href: "/admin/dashboard/certificates", icon: Award },
  { label: "Social Links", href: "/admin/dashboard/social-links", icon: Share2 },
  { label: "Profile", href: "/admin/dashboard/profile", icon: ShieldAlert },
];

export function AdminHeader({ session, title, subtitle }: AdminHeaderProps) {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <header className="border-b border-slate-200 dark:border-navy-800 bg-white/85 dark:bg-navy-950/85 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-300"
            aria-label="Toggle mobile CMS menu"
          >
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="heading-title text-lg sm:text-xl text-slate-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {session && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs">
              <Shield className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-semibold text-slate-900 dark:text-white">
                {session.name}
              </span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden pt-4 mt-4 border-t border-slate-100 dark:border-navy-800 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium",
                  isActive
                    ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <form action={logoutAdminAction} className="pt-2 border-t border-slate-100 dark:border-navy-800">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 text-xs font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
