import type { Metadata } from "next";
import { publicService } from "@/services/public.service";
import { getCurrentLocale } from "@/lib/i18n/server";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { HeroSection } from "@/components/public/hero-section";
import { AboutPreview } from "@/components/public/about-preview";
import { HomeSkillsPreview } from "@/components/public/home-skills-preview";
import { HomeFeaturedProjects } from "@/components/public/home-featured-projects";
import { HomeFeaturedCertificates } from "@/components/public/home-featured-certificates";
import { HomeCta } from "@/components/public/home-cta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return constructPageMetadata("home", { locale, path: "" });
}

export default async function HomePage() {
  const [hero, about, skills, featuredProjects, featuredCertificates] =
    await Promise.all([
      publicService.getHero(),
      publicService.getAbout(),
      publicService.getSkills(),
      publicService.getProjects(true),
      publicService.getCertificates(true),
    ]);

  return (
    <div className="space-y-24 sm:space-y-32 py-8 sm:py-12">
      {/* 1. HERO SECTION */}
      <HeroSection hero={hero} about={about} />

      {/* 2. ABOUT PREVIEW SECTION */}
      <AboutPreview about={about} />

      {/* 3. SKILLS PREVIEW SECTION */}
      <HomeSkillsPreview skills={skills} />

      {/* 4. FEATURED PROJECTS SECTION */}
      <HomeFeaturedProjects projects={featuredProjects} />

      {/* 5. CERTIFICATES PREVIEW SECTION */}
      <HomeFeaturedCertificates certificates={featuredCertificates} />

      {/* 6. CONTACT CTA SECTION */}
      <HomeCta />
    </div>
  );
}
