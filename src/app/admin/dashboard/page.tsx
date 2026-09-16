import { getCurrentAdmin } from "@/lib/auth/session";
import { adminService } from "@/services/admin.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { RetranslateButton } from "@/components/admin/retranslate-button";
import Link from "next/link";
import {
  Briefcase,
  Code2,
  Award,
  Share2,
  ArrowRight,
  Sparkles,
  User,
  CheckCircle,
} from "lucide-react";

export default async function AdminDashboardOverviewPage() {
  const session = await getCurrentAdmin();
  const stats = await adminService.getStats();

  const statCards = [
    {
      label: "Total Projects",
      count: stats.projectsCount,
      href: "/admin/dashboard/projects",
      icon: Briefcase,
      color: "text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800",
    },
    {
      label: "Total Skills",
      count: stats.skillsCount,
      href: "/admin/dashboard/skills",
      icon: Code2,
      color: "text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800",
    },
    {
      label: "Total Certificates",
      count: stats.certificatesCount,
      href: "/admin/dashboard/certificates",
      icon: Award,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    },
    {
      label: "Social Links",
      count: stats.socialLinksCount,
      href: "/admin/dashboard/social-links",
      icon: Share2,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Dashboard Overview"
        subtitle="Selamat datang di panel kontrol portofolio personal Anda"
      />

      <div className="p-6 sm:p-10 space-y-10 flex-1 max-w-6xl w-full">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                href={c.href}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs hover:border-orange-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {c.count}
                  </span>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {c.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="space-y-4">
          <h2 className="heading-subtitle text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Quick Actions &amp; Content Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/dashboard/hero"
              className="p-5 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 hover:border-orange-500/50 transition-all space-y-2 group"
            >
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Hero Section</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                Kelola Headline &amp; Tagline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ubah teks headline, deskripsi, CTA button URL &amp; tab bilingual ID/EN.
              </p>
            </Link>

            <Link
              href="/admin/dashboard/about"
              className="p-5 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 hover:border-orange-500/50 transition-all space-y-2 group"
            >
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-semibold">
                <User className="w-4 h-4" />
                <span>About Me</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                Kelola Profil &amp; Bio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ubah biografi bilingual, status ketersediaan kerja, dan kontak direct.
              </p>
            </Link>

            <Link
              href="/admin/dashboard/projects"
              className="p-5 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 hover:border-orange-500/50 transition-all space-y-2 group"
            >
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-semibold">
                <Briefcase className="w-4 h-4" />
                <span>Projects CRUD</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                Tambah &amp; Edit Project
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kelola daftar project, link Live Demo, repository GitHub, dan tech stack.
              </p>
            </Link>
          </div>
        </div>

        {/* Multi-Language & Auto-Translate Sync Section */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-navy-800">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Arsitektur Auto-Translate Multi-Bahasa (LibreTranslate)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Semua form admin cukup diisi dalam Bahasa Indonesia. Sistem otomatis menerjemahkan dan mengisi kolom EN saat disimpan.
              </p>
            </div>
          </div>
          <div>
            <RetranslateButton />
          </div>
        </div>

        {/* System Status Banner */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-start gap-4">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
              Sistem Portofolio Berjalan Normal
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Database PostgreSQL lokal terhubung. Setiap perubahan yang disimpan melalui panel admin ini akan langsung ter-render di website publik tanpa perlu mengubah source code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
