import { prisma } from "@/lib/db/prisma";
import { AdminStats } from "@/types/admin";

/**
 * Service for CMS and Admin Dashboard operations.
 */
export const adminService = {
  async getStats(): Promise<AdminStats> {
    try {
      const [projectsCount, skillsCount, certificatesCount, socialLinksCount] =
        await Promise.all([
          prisma.project.count(),
          prisma.skill.count(),
          prisma.certificate.count(),
          prisma.socialLink.count(),
        ]);

      return {
        projectsCount,
        skillsCount,
        certificatesCount,
        socialLinksCount,
      };
    } catch (error) {
      console.error("[adminService.getStats] Error:", error);
      return {
        projectsCount: 0,
        skillsCount: 0,
        certificatesCount: 0,
        socialLinksCount: 0,
      };
    }
  },

  async getAdminByUsername(usernameOrEmail: string) {
    return prisma.admin.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
  },

  async updatePassword(adminId: string, passwordHash: string) {
    return prisma.admin.update({
      where: { id: adminId },
      data: { passwordHash },
    });
  },
};
