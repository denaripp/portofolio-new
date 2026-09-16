import { getCurrentAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { SocialLinksManager } from "@/components/admin/social-links-manager";

export default async function AdminSocialLinksPage() {
  const [session, socialLinks] = await Promise.all([
    getCurrentAdmin(),
    prisma.socialLink.findMany({ orderBy: { displayOrder: "asc" } }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Social Links Management"
        subtitle="Kelola platform sosial & profesional eksternal yang ditampilkan pada Contact dan Footer"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <SocialLinksManager socialLinks={socialLinks} />
      </div>
    </div>
  );
}
