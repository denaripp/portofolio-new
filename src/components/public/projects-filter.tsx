"use client";

import * as React from "react";
import { ProjectItem } from "@/types/content";
import { ProjectCard } from "@/components/public/project-card";
import { useLanguage } from "@/components/providers/language-provider";
import { Briefcase } from "lucide-react";

interface ProjectsFilterProps {
  projects: ProjectItem[];
}

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = React.useState<string>("ALL");

  // Extract all unique categories
  const categories = React.useMemo(() => {
    const list = Array.from(
      new Set(projects.map((p) => p.category || "Project").filter(Boolean))
    );
    return list;
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "ALL") return projects;
    return projects.filter((p) => (p.category || "Project") === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills (if multiple categories exist) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <button
            type="button"
            onClick={() => setActiveCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              activeCategory === "ALL"
                ? "bg-orange-600 text-white shadow-xs"
                : "bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-300 hover:border-orange-400 dark:hover:border-orange-500"
            }`}
          >
            {t.projects.categoryAll} ({projects.length})
          </button>

          {categories.map((cat) => {
            const count = projects.filter((p) => (p.category || "Project") === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-300 hover:border-orange-400 dark:hover:border-orange-500"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/40 text-slate-500">
          <Briefcase className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <p className="font-semibold text-sm">{t.projects.empty}</p>
          <p className="text-xs mt-1">{t.projects.emptySub}</p>
        </div>
      )}
    </div>
  );
}
