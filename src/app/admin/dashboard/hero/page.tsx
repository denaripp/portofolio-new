import { getCurrentAdmin } from "@/lib/auth/session";
import { publicService } from "@/services/public.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { HeroForm } from "@/components/admin/hero-form";

export default async function AdminHeroPage() {
  const [session, hero] = await Promise.all([
    getCurrentAdmin(),
    publicService.getHero(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Hero Section CMS"
        subtitle="Edit teks utama, tagline, deskripsi, dan tombol CTA"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <HeroForm hero={hero} />
      </div>
    </div>
  );
}
