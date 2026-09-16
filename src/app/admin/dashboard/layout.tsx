import { getCurrentAdmin } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdmin();
  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
