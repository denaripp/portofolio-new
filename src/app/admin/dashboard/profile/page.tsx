import { getCurrentAdmin } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const session = await getCurrentAdmin();
  if (!session) redirect("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Admin Profile &amp; Security"
        subtitle="Kelola username, email, dan ubah kata sandi admin"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <ProfileForm session={session} />
      </div>
    </div>
  );
}
