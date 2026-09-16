import { getCurrentAdmin } from "@/lib/auth/session";
import { publicService } from "@/services/public.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { FooterForm } from "@/components/admin/footer-form";

export default async function AdminFooterPage() {
  const [session, footer, hero] = await Promise.all([
    getCurrentAdmin(),
    publicService.getFooter(),
    publicService.getHero(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Footer Section CMS"
        subtitle="Kelola tagline dan teks hak cipta pada bagian footer website"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <FooterForm footer={footer} defaultName={hero?.name || "Muhammad Najwa Syarif"} />
      </div>
    </div>
  );
}
