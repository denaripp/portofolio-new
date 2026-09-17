"use client";

import * as React from "react";
import Link from "next/link";
import { ProjectItem } from "@/types/content";
import { ProjectCard } from "@/components/public/project-card";
import { useLanguage } from "@/components/providers/language-provider";
import { Briefcase, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/public/scroll-reveal";

interface HomeFeaturedProjectsProps {
  projects: ProjectItem[];
}

export function HomeFeaturedProjects({ projects }: HomeFeaturedProjectsProps) {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <Briefcase className="w-4 h-4" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="heading-title text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {t.projects.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.projects.subtitle}
          </p>
        </div>

        <Link
          href="/projects"
          className="btn-interactive inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 transition-colors"
        >
          <span>{t.projects.viewAll}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </ScrollReveal>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100} duration={500}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">{t.projects.empty}</p>
      )}
    </section>
  );
}
