"use client";

import * as React from "react";
import { useActionState } from "react";
import { updateAdminProfileAction, AuthActionResult } from "@/actions/auth.actions";
import { AdminSession } from "@/types/admin";
import { Save, AlertCircle, CheckCircle2, Lock, User, Mail } from "lucide-react";

interface ProfileFormProps {
  session: AdminSession;
}

export function ProfileForm({ session }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (prev: AuthActionResult | null, formData: FormData) => {
      return updateAdminProfileAction(prev, formData);
    },
    null
  );

  return (
    <form action={formAction} className="space-y-8 max-w-2xl">
      {state?.error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state?.success && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Profil admin dan kredensial berhasil diperbarui!</span>
        </div>
      )}

      {/* Account Info */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-navy-800">
          Informasi Akun Admin
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                name="name"
                type="text"
                required
                defaultValue={session.name}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                name="username"
                type="text"
                required
                defaultValue={session.username}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                name="email"
                type="email"
                required
                defaultValue={session.email}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-navy-800">
          Ubah Password (Opsional)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kosongkan jika tidak ingin mengubah password saat ini.
        </p>

        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password Saat Ini
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                name="currentPassword"
                type="password"
                placeholder="Masukkan password lama untuk konfirmasi"
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password Baru (Minimal 8 karakter)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                name="newPassword"
                type="password"
                placeholder="Masukkan password baru"
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-60 text-white font-semibold text-xs shadow-md transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? "Menyimpan..." : "Simpan Perubahan Profil"}</span>
        </button>
      </div>
    </form>
  );
}
