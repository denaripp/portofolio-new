import { getCurrentAdmin } from "@/lib/auth/session";
import { publicService } from "@/services/public.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProjectsManager } from "@/components/admin/projects-manager";

export default async function AdminProjectsPage() {
  const [session, projects] = await Promise.all([
    getCurrentAdmin(),
    publicService.getProjects(false),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Projects Management"
        subtitle="Kelola karya portofolio, live demo URL, tech stack, dan status project"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <ProjectsManager projects={projects} />
      </div>
    </div>
  );
}
