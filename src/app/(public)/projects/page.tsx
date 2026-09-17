import type { Metadata } from "next";
import { publicService } from "@/services/public.service";
import { ProjectsFilter } from "@/components/public/projects-filter";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/server";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/public/scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return constructPageMetadata("projects", { locale, path: "/projects" });
}

export default async function ProjectsPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);
  const projects = await publicService.getProjects(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <ScrollReveal className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          <Sparkles className="w-4 h-4" />
          <span>{t.projects.badge}</span>
        </div>
        <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          {t.projects.title}
        </h1>
        <p className="text-body text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {t.projects.subtitle}
        </p>
      </ScrollReveal>

      {/* Projects Filter & Grid */}
      <ProjectsFilter projects={projects} />
    </div>
  );
}
