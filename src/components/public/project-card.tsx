"use client";

import * as React from "react";
import { ProjectItem } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import { ExternalLink, Layers, Sparkles, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale, t } = useLanguage();
  const isCompleted = project.status === "COMPLETED";

  const title = project.title[locale] || project.title.id;
  const description = project.description[locale] || project.description.id;
  const category = project.category || "Project";

  return (
    <div className="hover-lift-card group relative rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 p-5 shadow-xs hover:border-orange-500/50 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Project Visual / Thumbnail Container */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 flex flex-col items-center justify-center p-4 group-hover:scale-[1.01] transition-transform duration-300">
          {/* Category Tag (Top Left) */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-navy-900/80 backdrop-blur-xs text-white border border-slate-700/60 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-orange-400" />
              <span>{category}</span>
            </span>
          </div>

          {/* Status Badge (Top Right) */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-xs ${
                isCompleted
                  ? "bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
                  : "bg-amber-50/90 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                }`}
              />
              {isCompleted
                ? t.projects.statusCompleted
                : t.projects.statusInProgress}
            </span>
          </div>

          {project.image && !project.image.includes("/images/projects/project1.png") ? (
            <img
              src={project.image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-navy-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-700 flex items-center justify-center text-navy-800 dark:text-orange-400">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="space-y-2">
          <h3 className="heading-title text-lg text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <p className="text-body text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tools / Tech Stack Chips */}
        {project.techStack.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-navy-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between gap-2.5">
        {/* Card Main Action: Live Demo / Preview */}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interactive flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-semibold shadow-xs"
          >
            <span>{t.projects.liveDemo}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500 italic">
            {t.projects.demoUnavailable}
          </span>
        )}

        {/* Source / Secondary Action Button (if exists) */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interactive inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 text-xs font-medium"
            title="Open project link / repository"
          >
            {project.githubUrl.includes("github.com") ? (
              <GithubIcon className="w-3.5 h-3.5" />
            ) : (
              <FolderGit2 className="w-3.5 h-3.5 text-orange-500" />
            )}
            <span className="hidden sm:inline">{t.projects.sourceCode}</span>
          </a>
        )}
      </div>
    </div>
  );
}
