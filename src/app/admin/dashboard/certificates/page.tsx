import { getCurrentAdmin } from "@/lib/auth/session";
import { publicService } from "@/services/public.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { CertificatesManager } from "@/components/admin/certificates-manager";

export default async function AdminCertificatesPage() {
  const [session, certificates] = await Promise.all([
    getCurrentAdmin(),
    publicService.getCertificates(false),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        session={session}
        title="Certificates Management"
        subtitle="Kelola sertifikat kursus, bootcamp, dan tautan verifikasi online"
      />

      <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full">
        <CertificatesManager certificates={certificates} />
      </div>
    </div>
  );
}
