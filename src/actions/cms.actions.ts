"use server";

import { prisma } from "@/lib/db/prisma";
import { getCurrentAdmin } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { SkillLevel, ProjectStatus } from "@prisma/client";
import { translateText } from "@/lib/translate";

export interface ActionResult {
  success: boolean;
  error?: string;
  count?: number;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// HERO ACTION (Auto-translated to EN)
// -------------------------------------------------------------
export async function updateHeroAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const name = formData.get("name")?.toString().trim();
  const profileImage = formData.get("profileImage")?.toString().trim() || "/images/profile.png";
  const roleId = formData.get("roleId")?.toString().trim();
  const specializationId = formData.get("specializationId")?.toString().trim() || "Next.js & React";
  const headlineId = formData.get("headlineId")?.toString().trim();
  const descriptionId = formData.get("descriptionId")?.toString().trim();
  const primaryCtaTextId = formData.get("primaryCtaTextId")?.toString().trim() || "Lihat Project";
  const primaryCtaUrl = formData.get("primaryCtaUrl")?.toString().trim() || "/projects";
  const secondaryCtaTextId = formData.get("secondaryCtaTextId")?.toString().trim() || "Hubungi Saya";
  const secondaryCtaUrl = formData.get("secondaryCtaUrl")?.toString().trim() || "/contact";

  if (!name || !roleId || !headlineId || !descriptionId) {
    return { success: false, error: "Field utama nama, role, headline, dan deskripsi wajib diisi." };
  }

  try {
    // Auto-translate Indonesian fields to English in parallel
    const [
      roleEn,
      specializationEn,
      headlineEn,
      descriptionEn,
      primaryCtaTextEn,
      secondaryCtaTextEn,
    ] = await Promise.all([
      translateText(roleId),
      translateText(specializationId),
      translateText(headlineId),
      translateText(descriptionId),
      translateText(primaryCtaTextId),
      translateText(secondaryCtaTextId),
    ]);

    const existing = await prisma.hero.findFirst();
    const data = {
      name,
      profileImage,
      roleId,
      roleEn: roleEn || roleId,
      specializationId,
      specializationEn: specializationEn || specializationId,
      headlineId,
      headlineEn: headlineEn || headlineId,
      descriptionId,
      descriptionEn: descriptionEn || descriptionId,
      primaryCtaTextId,
      primaryCtaTextEn: primaryCtaTextEn || "View Projects",
      primaryCtaUrl,
      secondaryCtaTextId,
      secondaryCtaTextEn: secondaryCtaTextEn || "Contact Me",
      secondaryCtaUrl,
    };

    if (existing) {
      await prisma.hero.update({ where: { id: existing.id }, data });
    } else {
      await prisma.hero.create({ data });
    }

    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/about");
    revalidatePath("/admin/dashboard/hero");
    return { success: true };
  } catch (error) {
    console.error("[updateHeroAction] Error:", error);
    return { success: false, error: "Gagal menyimpan konten Hero." };
  }
}

// -------------------------------------------------------------
// ABOUT ACTION (Auto-translated to EN)
// -------------------------------------------------------------
export async function updateAboutAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const name = formData.get("name")?.toString().trim();
  const profileImage = formData.get("profileImage")?.toString().trim() || "/images/profile.png";
  const bioId = formData.get("bioId")?.toString().trim();
  const bioSecondaryId = formData.get("bioSecondaryId")?.toString().trim() || null;
  const location = formData.get("location")?.toString().trim() || "Indonesia";
  const currentEducation = formData.get("currentEducation")?.toString().trim() || "Computer Science";
  const status = formData.get("status")?.toString().trim() || "Open to Work";
  const email = formData.get("email")?.toString().trim() || "";
  const whatsapp = formData.get("whatsapp")?.toString().trim() || "";

  if (!name || !bioId) {
    return { success: false, error: "Nama dan Biografi wajib diisi." };
  }

  try {
    const [bioEn, bioSecondaryEn] = await Promise.all([
      translateText(bioId),
      bioSecondaryId ? translateText(bioSecondaryId) : Promise.resolve(null),
    ]);

    const existing = await prisma.about.findFirst();
    const data = {
      name,
      profileImage,
      bioId,
      bioEn: bioEn || bioId,
      bioSecondaryId,
      bioSecondaryEn: bioSecondaryEn || bioSecondaryId,
      location,
      currentEducation,
      status,
      email,
      whatsapp,
    };

    if (existing) {
      await prisma.about.update({ where: { id: existing.id }, data });
    } else {
      await prisma.about.create({ data });
    }

    revalidatePath("/about");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/about");
    return { success: true };
  } catch (error) {
    console.error("[updateAboutAction] Error:", error);
    return { success: false, error: "Gagal menyimpan konten About." };
  }
}

// -------------------------------------------------------------
// SKILLS ACTIONS
// -------------------------------------------------------------
export async function createSkillAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const name = formData.get("name")?.toString().trim();
  const icon = formData.get("icon")?.toString().trim() || "code";
  const category = formData.get("category")?.toString().trim() || "Development";
  const level = (formData.get("level")?.toString() || "INTERMEDIATE") as SkillLevel;
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);

  if (!name) return { success: false, error: "Nama skill wajib diisi." };

  try {
    await prisma.skill.create({
      data: { name, icon, category, level, displayOrder },
    });

    revalidatePath("/skills");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/skills");
    return { success: true };
  } catch (error) {
    console.error("[createSkillAction] Error:", error);
    return { success: false, error: "Gagal membuat skill." };
  }
}

export async function updateSkillAction(id: string, formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const name = formData.get("name")?.toString().trim();
  const icon = formData.get("icon")?.toString().trim() || "code";
  const category = formData.get("category")?.toString().trim() || "Development";
  const level = (formData.get("level")?.toString() || "INTERMEDIATE") as SkillLevel;
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);

  if (!name) return { success: false, error: "Nama skill wajib diisi." };

  try {
    await prisma.skill.update({
      where: { id },
      data: { name, icon, category, level, displayOrder },
    });

    revalidatePath("/skills");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/skills");
    return { success: true };
  } catch (error) {
    console.error("[updateSkillAction] Error:", error);
    return { success: false, error: "Gagal memperbarui skill." };
  }
}

export async function deleteSkillAction(id: string): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/skills");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/skills");
    return { success: true };
  } catch (error) {
    console.error("[deleteSkillAction] Error:", error);
    return { success: false, error: "Gagal menghapus skill." };
  }
}

// -------------------------------------------------------------
// PROJECTS ACTIONS (Auto-translated to EN)
// -------------------------------------------------------------
export async function createProjectAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const titleId = formData.get("titleId")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "Web Development";
  const descriptionId = formData.get("descriptionId")?.toString().trim();
  const image = formData.get("image")?.toString().trim() || "/images/projects/project1.png";
  const techStackRaw = formData.get("techStack")?.toString().trim() || "";
  const demoUrl = formData.get("demoUrl")?.toString().trim() || null;
  const githubUrl = formData.get("githubUrl")?.toString().trim() || null;
  const status = (formData.get("status")?.toString() || "COMPLETED") as ProjectStatus;
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);

  if (!titleId || !descriptionId) {
    return { success: false, error: "Judul dan deskripsi project wajib diisi." };
  }

  // URL Validation (only if provided)
  if (demoUrl && !isValidUrl(demoUrl)) {
    return { success: false, error: "Format Demo / Preview URL tidak valid. Pastikan diawali http:// atau https://" };
  }
  if (githubUrl && !isValidUrl(githubUrl)) {
    return { success: false, error: "Format Link Eksternal / Source tidak valid. Pastikan diawali http:// atau https://" };
  }

  const techStack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  try {
    const [titleEn, descriptionEn] = await Promise.all([
      translateText(titleId),
      translateText(descriptionId),
    ]);

    await prisma.project.create({
      data: {
        titleId,
        titleEn: titleEn || titleId,
        category,
        descriptionId,
        descriptionEn: descriptionEn || descriptionId,
        image,
        techStack,
        demoUrl,
        githubUrl,
        status,
        isFeatured,
        displayOrder,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error("[createProjectAction] Error:", error);
    return { success: false, error: "Gagal membuat project." };
  }
}

export async function updateProjectAction(id: string, formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const titleId = formData.get("titleId")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "Web Development";
  const descriptionId = formData.get("descriptionId")?.toString().trim();
  const image = formData.get("image")?.toString().trim() || "/images/projects/project1.png";
  const techStackRaw = formData.get("techStack")?.toString().trim() || "";
  const demoUrl = formData.get("demoUrl")?.toString().trim() || null;
  const githubUrl = formData.get("githubUrl")?.toString().trim() || null;
  const status = (formData.get("status")?.toString() || "COMPLETED") as ProjectStatus;
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);

  if (!titleId || !descriptionId) {
    return { success: false, error: "Judul dan deskripsi project wajib diisi." };
  }

  // URL Validation (only if provided)
  if (demoUrl && !isValidUrl(demoUrl)) {
    return { success: false, error: "Format Demo / Preview URL tidak valid. Pastikan diawali http:// atau https://" };
  }
  if (githubUrl && !isValidUrl(githubUrl)) {
    return { success: false, error: "Format Link Eksternal / Source tidak valid. Pastikan diawali http:// atau https://" };
  }

  const techStack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  try {
    const [titleEn, descriptionEn] = await Promise.all([
      translateText(titleId),
      translateText(descriptionId),
    ]);

    await prisma.project.update({
      where: { id },
      data: {
        titleId,
        titleEn: titleEn || titleId,
        category,
        descriptionId,
        descriptionEn: descriptionEn || descriptionId,
        image,
        techStack,
        demoUrl,
        githubUrl,
        status,
        isFeatured,
        displayOrder,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error("[updateProjectAction] Error:", error);
    return { success: false, error: "Gagal memperbarui project." };
  }
}

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error("[deleteProjectAction] Error:", error);
    return { success: false, error: "Gagal menghapus project." };
  }
}

// -------------------------------------------------------------
// CERTIFICATES ACTIONS (Auto-translated to EN)
// -------------------------------------------------------------
export async function createCertificateAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const titleId = formData.get("titleId")?.toString().trim();
  const organization = formData.get("organization")?.toString().trim();
  const image = formData.get("image")?.toString().trim() || "/images/certificates/cert1.png";
  const descriptionId = formData.get("descriptionId")?.toString().trim() || null;
  const dateObtained = formData.get("dateObtained")?.toString().trim() || new Date().getFullYear().toString();
  const certificateUrl = formData.get("certificateUrl")?.toString().trim() || null;
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);

  if (!titleId || !organization) {
    return { success: false, error: "Judul sertifikat dan nama lembaga penyelenggara wajib diisi." };
  }

  if (certificateUrl && !isValidUrl(certificateUrl)) {
    return { success: false, error: "Format Certificate URL tidak valid." };
  }

  try {
    const [titleEn, descriptionEn] = await Promise.all([
      translateText(titleId),
      descriptionId ? translateText(descriptionId) : Promise.resolve(null),
    ]);

    await prisma.certificate.create({
      data: {
        titleId,
        titleEn: titleEn || titleId,
        organization,
        image,
        descriptionId,
        descriptionEn: descriptionEn || descriptionId,
        dateObtained,
        certificateUrl,
        isFeatured,
        displayOrder,
      },
    });

    revalidatePath("/certificates");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/certificates");
    return { success: true };
  } catch (error) {
    console.error("[createCertificateAction] Error:", error);
    return { success: false, error: "Gagal membuat sertifikat." };
  }
}

export async function updateCertificateAction(id: string, formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const titleId = formData.get("titleId")?.toString().trim();
  const organization = formData.get("organization")?.toString().trim();
  const image = formData.get("image")?.toString().trim() || "/images/certificates/cert1.png";
  const descriptionId = formData.get("descriptionId")?.toString().trim() || null;
  const dateObtained = formData.get("dateObtained")?.toString().trim() || new Date().getFullYear().toString();
  const certificateUrl = formData.get("certificateUrl")?.toString().trim() || null;
  const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);

  if (!titleId || !organization) {
    return { success: false, error: "Judul sertifikat dan nama lembaga penyelenggara wajib diisi." };
  }

  if (certificateUrl && !isValidUrl(certificateUrl)) {
    return { success: false, error: "Format Certificate URL tidak valid." };
  }

  try {
    const [titleEn, descriptionEn] = await Promise.all([
      translateText(titleId),
      descriptionId ? translateText(descriptionId) : Promise.resolve(null),
    ]);

    await prisma.certificate.update({
      where: { id },
      data: {
        titleId,
        titleEn: titleEn || titleId,
        organization,
        image,
        descriptionId,
        descriptionEn: descriptionEn || descriptionId,
        dateObtained,
        certificateUrl,
        isFeatured,
        displayOrder,
      },
    });

    revalidatePath("/certificates");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/certificates");
    return { success: true };
  } catch (error) {
    console.error("[updateCertificateAction] Error:", error);
    return { success: false, error: "Gagal memperbarui sertifikat." };
  }
}

export async function deleteCertificateAction(id: string): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/certificates");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/certificates");
    return { success: true };
  } catch (error) {
    console.error("[deleteCertificateAction] Error:", error);
    return { success: false, error: "Gagal menghapus sertifikat." };
  }
}

// -------------------------------------------------------------
// SOCIAL LINKS ACTIONS
// -------------------------------------------------------------
export async function createSocialLinkAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const platform = formData.get("platform")?.toString().trim();
  const icon = formData.get("icon")?.toString().trim() || "link";
  const url = formData.get("url")?.toString().trim();
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);
  const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true";

  if (!platform || !url) {
    return { success: false, error: "Nama platform dan URL wajib diisi." };
  }

  try {
    await prisma.socialLink.create({
      data: { platform, icon, url, displayOrder, isActive },
    });

    revalidatePath("/contact");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/social-links");
    return { success: true };
  } catch (error) {
    console.error("[createSocialLinkAction] Error:", error);
    return { success: false, error: "Gagal menambahkan platform sosial." };
  }
}

export async function updateSocialLinkAction(id: string, formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const platform = formData.get("platform")?.toString().trim();
  const icon = formData.get("icon")?.toString().trim() || "link";
  const url = formData.get("url")?.toString().trim();
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10);
  const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true";

  if (!platform || !url) {
    return { success: false, error: "Nama platform dan URL wajib diisi." };
  }

  try {
    await prisma.socialLink.update({
      where: { id },
      data: { platform, icon, url, displayOrder, isActive },
    });

    revalidatePath("/contact");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/social-links");
    return { success: true };
  } catch (error) {
    console.error("[updateSocialLinkAction] Error:", error);
    return { success: false, error: "Gagal memperbarui platform sosial." };
  }
}

export async function deleteSocialLinkAction(id: string): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  try {
    await prisma.socialLink.delete({ where: { id } });
    revalidatePath("/contact");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/social-links");
    return { success: true };
  } catch (error) {
    console.error("[deleteSocialLinkAction] Error:", error);
    return { success: false, error: "Gagal menghapus platform sosial." };
  }
}

// -------------------------------------------------------------
// RE-TRANSLATE ALL CONTENT ACTION (Batch Migration / Sync)
// -------------------------------------------------------------
export async function retranslateAllAction(): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  try {
    let count = 0;

    // 1. Hero
    const hero = await prisma.hero.findFirst();
    if (hero) {
      const [
        roleEn,
        specializationEn,
        headlineEn,
        descriptionEn,
        primaryCtaTextEn,
        secondaryCtaTextEn,
      ] = await Promise.all([
        translateText(hero.roleId),
        translateText(hero.specializationId),
        translateText(hero.headlineId),
        translateText(hero.descriptionId),
        translateText(hero.primaryCtaTextId),
        translateText(hero.secondaryCtaTextId),
      ]);

      await prisma.hero.update({
        where: { id: hero.id },
        data: {
          roleEn: roleEn || hero.roleId,
          specializationEn: specializationEn || hero.specializationId,
          headlineEn: headlineEn || hero.headlineId,
          descriptionEn: descriptionEn || hero.descriptionId,
          primaryCtaTextEn: primaryCtaTextEn || "View Projects",
          secondaryCtaTextEn: secondaryCtaTextEn || "Contact Me",
        },
      });
      count += 1;
    }

    // 2. About
    const about = await prisma.about.findFirst();
    if (about) {
      const [bioEn, bioSecondaryEn] = await Promise.all([
        translateText(about.bioId),
        about.bioSecondaryId ? translateText(about.bioSecondaryId) : Promise.resolve(null),
      ]);
      await prisma.about.update({
        where: { id: about.id },
        data: {
          bioEn: bioEn || about.bioId,
          bioSecondaryEn: bioSecondaryEn || about.bioSecondaryId,
        },
      });
      count += 1;
    }

    // 3. Projects
    const projects = await prisma.project.findMany();
    for (const project of projects) {
      const [titleEn, descriptionEn] = await Promise.all([
        translateText(project.titleId),
        translateText(project.descriptionId),
      ]);
      await prisma.project.update({
        where: { id: project.id },
        data: {
          titleEn: titleEn || project.titleId,
          descriptionEn: descriptionEn || project.descriptionId,
        },
      });
      count += 1;
    }

    // 4. Certificates
    const certs = await prisma.certificate.findMany();
    for (const cert of certs) {
      const [titleEn, descriptionEn] = await Promise.all([
        translateText(cert.titleId),
        cert.descriptionId ? translateText(cert.descriptionId) : Promise.resolve(null),
      ]);
      await prisma.certificate.update({
        where: { id: cert.id },
        data: {
          titleEn: titleEn || cert.titleId,
          descriptionEn: descriptionEn || cert.descriptionId,
        },
      });
      count += 1;
    }

    // 5. Footer
    const footer = await prisma.footer.findFirst();
    if (footer) {
      const taglineEn = await translateText(footer.taglineId);
      await prisma.footer.update({
        where: { id: footer.id },
        data: {
          taglineEn: taglineEn || footer.taglineId,
        },
      });
      count += 1;
    }

    // Revalidate all public routes
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/about");
    revalidatePath("/projects");
    revalidatePath("/certificates");
    revalidatePath("/skills");
    revalidatePath("/contact");
    revalidatePath("/admin/dashboard/footer");

    return { success: true, count };
  } catch (error: any) {
    console.error("[retranslateAllAction] Error:", error);
    return {
      success: false,
      error: `Gagal menjalankan re-translate: ${error?.message || "Internal error"}`,
    };
  }
}

// -------------------------------------------------------------
// FOOTER ACTION (Auto-translated to EN)
// -------------------------------------------------------------
export async function updateFooterAction(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentAdmin();
  if (!session) return { success: false, error: "Unauthorized." };

  const taglineId = formData.get("taglineId")?.toString().trim();
  const copyrightName = formData.get("copyrightName")?.toString().trim() || "Muhammad Najwa Syarif";

  if (!taglineId) {
    return { success: false, error: "Tagline footer wajib diisi." };
  }

  try {
    const taglineEn = await translateText(taglineId);

    const existing = await prisma.footer.findFirst();
    const data = {
      taglineId,
      taglineEn: taglineEn || taglineId,
      copyrightName,
    };

    if (existing) {
      await prisma.footer.update({ where: { id: existing.id }, data });
    } else {
      await prisma.footer.create({ data });
    }

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/skills");
    revalidatePath("/projects");
    revalidatePath("/certificates");
    revalidatePath("/contact");
    revalidatePath("/admin/dashboard/footer");
    return { success: true };
  } catch (error) {
    console.error("[updateFooterAction] Error:", error);
    return { success: false, error: "Gagal menyimpan konten footer." };
  }
}
