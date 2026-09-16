import { getCurrentAdmin } from "@/lib/auth/session";
import { publicService } from "@/services/public.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { SkillsManager } from "@/components/admin/skills-manager";

export default async function AdminSkillsPage() {
  const [session, skills] = await Promise.all([
    getCurrentAdmin(),
    publicService.getSkills(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Skills Management"
        subtitle="Tambah, perbarui, dan kelola kemampuan teknis"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <SkillsManager skills={skills} />
      </div>
    </div>
  );
}
