import { prisma } from "@/lib/db/prisma";
import { unstable_cache } from "next/cache";
import {
  AboutData,
  CertificateItem,
  HeroData,
  ProjectItem,
  SkillItem,
  SocialLinkItem,
  FooterData,
} from "@/types/content";

/**
 * Internal raw data-fetching functions.
 */
async function fetchHeroRaw(): Promise<HeroData | null> {
  try {
    const hero = await prisma.hero.findFirst();
    if (!hero) return null;

    let specializationId = (hero as any).specializationId;
    let specializationEn = (hero as any).specializationEn;

    // Fallback query in case Prisma client query engine dll was cached in-memory
    if (specializationId === undefined || specializationEn === undefined) {
      try {
        const rawRows: any =
          await prisma.$queryRaw`SELECT "specializationId", "specializationEn" FROM "Hero" WHERE id = ${hero.id} LIMIT 1`;
        if (rawRows && rawRows[0]) {
          specializationId = rawRows[0].specializationId;
          specializationEn = rawRows[0].specializationEn;
        }
      } catch {
        // ignore
      }
    }

    return {
      id: hero.id,
      profileImage: hero.profileImage,
      name: hero.name,
      role: { id: hero.roleId, en: hero.roleEn },
      specialization: {
        id: specializationId || "Next.js & React",
        en: specializationEn || specializationId || "Next.js & React",
      },
      headline: { id: hero.headlineId, en: hero.headlineEn },
      description: { id: hero.descriptionId, en: hero.descriptionEn },
      primaryCtaText: { id: hero.primaryCtaTextId, en: hero.primaryCtaTextEn },
      primaryCtaUrl: hero.primaryCtaUrl,
      secondaryCtaText: {
        id: hero.secondaryCtaTextId,
        en: hero.secondaryCtaTextEn,
      },
      secondaryCtaUrl: hero.secondaryCtaUrl,
    };
  } catch (error) {
    console.error("[publicService.getHero] Error:", error);
    return null;
  }
}

async function fetchAboutRaw(): Promise<AboutData | null> {
  try {
    const about = await prisma.about.findFirst();
    if (!about) return null;

    return {
      id: about.id,
      name: about.name,
      profileImage: about.profileImage,
      bio: { id: about.bioId, en: about.bioEn },
      bioSecondary: (about as any).bioSecondaryId
        ? {
            id: (about as any).bioSecondaryId,
            en: (about as any).bioSecondaryEn || (about as any).bioSecondaryId,
          }
        : null,
      location: about.location,
      currentEducation: about.currentEducation,
      status: about.status,
      email: about.email,
      whatsapp: about.whatsapp,
    };
  } catch (error) {
    console.error("[publicService.getAbout] Error:", error);
    return null;
  }
}

async function fetchSkillsRaw(): Promise<SkillItem[]> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return skills.map((s) => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      category: s.category,
      level: s.level,
      displayOrder: s.displayOrder,
    }));
  } catch (error) {
    console.error("[publicService.getSkills] Error:", error);
    return [];
  }
}

async function fetchProjectsRaw(featuredOnly = false): Promise<ProjectItem[]> {
  try {
    const projects = await prisma.project.findMany({
      where: featuredOnly ? { isFeatured: true } : undefined,
      orderBy: { displayOrder: "asc" },
    });

    return projects.map((p) => ({
      id: p.id,
      title: { id: p.titleId, en: p.titleEn },
      description: { id: p.descriptionId, en: p.descriptionEn },
      image: p.image,
      category: (p as any).category || "Web Development",
      techStack: p.techStack,
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      status: p.status,
      isFeatured: p.isFeatured,
      displayOrder: p.displayOrder,
    }));
  } catch (error) {
    console.error("[publicService.getProjects] Error:", error);
    return [];
  }
}

async function fetchCertificatesRaw(featuredOnly = false): Promise<CertificateItem[]> {
  try {
    const certs = await prisma.certificate.findMany({
      where: featuredOnly ? { isFeatured: true } : undefined,
      orderBy: { displayOrder: "asc" },
    });

    return certs.map((c) => ({
      id: c.id,
      title: { id: c.titleId, en: c.titleEn },
      organization: c.organization,
      image: c.image,
      description: c.descriptionId
        ? { id: c.descriptionId, en: c.descriptionEn || "" }
        : null,
      dateObtained: c.dateObtained,
      certificateUrl: c.certificateUrl,
      isFeatured: c.isFeatured,
      displayOrder: c.displayOrder,
    }));
  } catch (error) {
    console.error("[publicService.getCertificates] Error:", error);
    return [];
  }
}

async function fetchSocialLinksRaw(): Promise<SocialLinkItem[]> {
  try {
    const links = await prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return links.map((l) => ({
      id: l.id,
      platform: l.platform,
      icon: l.icon,
      url: l.url,
      displayOrder: l.displayOrder,
      isActive: l.isActive,
    }));
  } catch (error) {
    console.error("[publicService.getSocialLinks] Error:", error);
    return [];
  }
}

async function fetchFooterRaw(): Promise<FooterData | null> {
  try {
    const footer = await prisma.footer.findFirst();
    if (!footer) {
      return {
        id: "default",
        tagline: {
          id: "Membangun solusi digital modern, responsif, dan terukur dengan dedikasi dan presisi.",
          en: "Crafting modern, responsive digital solutions with passion and precision.",
        },
        copyrightName: "Muhammad Najwa Syarif",
      };
    }

    return {
      id: footer.id,
      tagline: { id: footer.taglineId, en: footer.taglineEn },
      copyrightName: footer.copyrightName || "Muhammad Najwa Syarif",
    };
  } catch (error) {
    console.error("[publicService.getFooter] Error:", error);
    return {
      id: "default",
      tagline: {
        id: "Membangun solusi digital modern, responsif, dan terukur dengan dedikasi dan presisi.",
        en: "Crafting modern, responsive digital solutions with passion and precision.",
      },
      copyrightName: "Muhammad Najwa Syarif",
    };
  }
}

/**
 * Service to retrieve content for public pages, cached via unstable_cache.
 */
export const publicService = {
  getHero: unstable_cache(
    fetchHeroRaw,
    ["public-hero"],
    { tags: ["hero", "public-content"], revalidate: 3600 }
  ),

  getAbout: unstable_cache(
    fetchAboutRaw,
    ["public-about"],
    { tags: ["about", "public-content"], revalidate: 3600 }
  ),

  getSkills: unstable_cache(
    fetchSkillsRaw,
    ["public-skills"],
    { tags: ["skills", "public-content"], revalidate: 3600 }
  ),

  getProjects(featuredOnly = false): Promise<ProjectItem[]> {
    return unstable_cache(
      () => fetchProjectsRaw(featuredOnly),
      [`public-projects-${featuredOnly}`],
      { tags: ["projects", "public-content"], revalidate: 3600 }
    )();
  },

  getCertificates(featuredOnly = false): Promise<CertificateItem[]> {
    return unstable_cache(
      () => fetchCertificatesRaw(featuredOnly),
      [`public-certificates-${featuredOnly}`],
      { tags: ["certificates", "public-content"], revalidate: 3600 }
    )();
  },

  getSocialLinks: unstable_cache(
    fetchSocialLinksRaw,
    ["public-social-links"],
    { tags: ["social-links", "public-content"], revalidate: 3600 }
  ),

  getFooter: unstable_cache(
    fetchFooterRaw,
    ["public-footer"],
    { tags: ["footer", "public-content"], revalidate: 3600 }
  ),
};
