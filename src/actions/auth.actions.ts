"use server";

import { prisma } from "@/lib/db/prisma";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie, getCurrentAdmin } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to log in admin.
 */
export async function loginAdminAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const usernameOrEmail = formData.get("usernameOrEmail")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!usernameOrEmail || !password) {
    return { success: false, error: "Username/Email dan password wajib diisi." };
  }

  try {
    let admin = await prisma.admin.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    // Auto-bootstrap initial admin if database has 0 admin accounts (first-time fresh setup)
    if (!admin) {
      const totalAdmins = await prisma.admin.count();
      if (totalAdmins === 0 && (usernameOrEmail === "admin" || usernameOrEmail === "admin@portfolio.local")) {
        const defaultHash = await hashPassword("AdminPassword123!");
        admin = await prisma.admin.create({
          data: {
            username: "admin",
            email: "admin@portfolio.local",
            passwordHash: defaultHash,
            name: "Muhammad Najwa Syarif",
          },
        });
      }
    }

    if (!admin) {
      return { success: false, error: "Kredensial tidak valid." };
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Kredensial tidak valid." };
    }

    // Set secure HTTP-only cookie
    await setSessionCookie({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
    });
  } catch (error) {
    console.error("[loginAdminAction] Error:", error);
    return { success: false, error: "Terjadi kesalahan server internal." };
  }

  redirect("/admin/dashboard");
}

/**
 * Server action to log out admin.
 */
export async function logoutAdminAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin");
}

/**
 * Server action to update admin profile and password.
 */
export async function updateAdminProfileAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const session = await getCurrentAdmin();
  if (!session) {
    return { success: false, error: "Sesi tidak sah atau telah berakhir." };
  }

  const name = formData.get("name")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const currentPassword = formData.get("currentPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();

  if (!username || !email) {
    return { success: false, error: "Username dan email tidak boleh kosong." };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
    });

    if (!admin) {
      return { success: false, error: "Admin tidak ditemukan." };
    }

    // Check if username/email already taken by someone else
    const existing = await prisma.admin.findFirst({
      where: {
        AND: [
          { id: { not: admin.id } },
          { OR: [{ username }, { email }] },
        ],
      },
    });

    if (existing) {
      return { success: false, error: "Username atau email sudah digunakan akun lain." };
    }

    let updatedPasswordHash = admin.passwordHash;

    // If changing password, verify current password first
    if (newPassword && newPassword.trim().length > 0) {
      if (!currentPassword) {
        return { success: false, error: "Password saat ini diperlukan untuk mengubah password." };
      }

      const isCurrentMatch = await verifyPassword(currentPassword, admin.passwordHash);
      if (!isCurrentMatch) {
        return { success: false, error: "Password saat ini salah." };
      }

      if (newPassword.length < 8) {
        return { success: false, error: "Password baru minimal 8 karakter." };
      }

      updatedPasswordHash = await hashPassword(newPassword);
    }

    const updated = await prisma.admin.update({
      where: { id: admin.id },
      data: {
        name: name || admin.name,
        username,
        email,
        passwordHash: updatedPasswordHash,
      },
    });

    // Refresh session cookie with new info
    await setSessionCookie({
      id: updated.id,
      username: updated.username,
      email: updated.email,
      name: updated.name,
    });

    return { success: true };
  } catch (error) {
    console.error("[updateAdminProfileAction] Error:", error);
    return { success: false, error: "Gagal memperbarui profil." };
  }
}
