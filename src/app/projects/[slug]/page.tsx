import React from "react";
import { notFound } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { ProjectDetailView } from "@/components/ProjectDetailView";

export function generateStaticParams() {
  return portfolioData.projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = portfolioData.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = portfolioData.projects[projectIndex];
  const nextProject =
    portfolioData.projects[(projectIndex + 1) % portfolioData.projects.length];

  return <ProjectDetailView project={project} nextProject={nextProject} />;
}
