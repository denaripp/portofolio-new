import { getCurrentAdmin } from "@/lib/auth/session";
import { publicService } from "@/services/public.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { AboutForm } from "@/components/admin/about-form";

export default async function AdminAboutPage() {
  const [session, about] = await Promise.all([
    getCurrentAdmin(),
    publicService.getAbout(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="About Section CMS"
        subtitle="Edit biografi, latar belakang pendidikan, lokasi, dan kontak langsung"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <AboutForm about={about} />
      </div>
    </div>
  );
}
