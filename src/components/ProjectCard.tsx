"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ProjectItem } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { TechLogoBadge } from "@/components/TechLogo";
import { useTheme } from "@/context/ThemeContext";

interface ProjectCardProps {
  project: ProjectItem;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { isBlack } = useTheme();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full sm:w-[488px]"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group relative flex min-h-[434px] w-full flex-col items-start overflow-hidden rounded-[8px] border transition-all duration-300 ${
          isBlack
            ? "border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#39a875]/70 hover:shadow-[0_16px_40px_rgba(57,168,117,0.14)]"
            : "border-[#e5e5e5] bg-[#f7f7f7] hover:border-[#39a875] hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Project Cover with Zoom Effect */}
        <div
          className={`relative h-[274px] w-full shrink-0 overflow-hidden rounded-t-[8px] ${
            isBlack ? "bg-[#111111]" : "bg-[#ebebeb]"
          }`}
          style={{ height: 274, maxHeight: 274 }}
        >
          <Image
            src={project.coverImage || `/assets/projects/${project.slug}.png`}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 488px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
          />
        </div>

        {/* Project Details */}
        <div className="flex w-full flex-1 flex-col items-start justify-between gap-[12px] p-[18px]">
          <div className="w-full space-y-[10px]">
            <div className="flex w-full items-center justify-between">
              <h3
                className={`font-display flex items-center gap-1.5 text-[20px] tracking-[-0.7px] transition-colors group-hover:text-[#39a875] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {project.title}
                <ArrowUpRight className="size-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 text-[#39a875]" />
              </h3>
              <span className="font-mono-ui text-[12px] font-normal text-[#858786]">
                {project.year}
              </span>
            </div>

            <p className="font-sans-body text-[15px] leading-[23px] font-normal text-[#858786]">
              {project.summary}
            </p>
          </div>

          {/* Project Technology SVG Logos */}
          <div className="flex flex-wrap items-center gap-[6px] pt-1">
            {project.techStack.map((tech) => (
              <TechLogoBadge
                key={tech}
                name={tech}
                size="sm"
                showLabel={tech.toLowerCase() === "zustand"}
                className={isBlack ? "bg-black" : "bg-white"}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
