"use client";

import * as React from "react";
import { useActionState } from "react";
import { updateAboutAction, ActionResult } from "@/actions/cms.actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { AboutData } from "@/types/content";
import { Save, AlertCircle, CheckCircle2, Languages, Sparkles } from "lucide-react";

interface AboutFormProps {
  about: AboutData | null;
}

export function AboutForm({ about }: AboutFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (prev: ActionResult | null, formData: FormData) => {
      return updateAboutAction(formData);
    },
    null
  );

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      {/* Alert Banner */}
      {state?.error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state?.success && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Perubahan konten About berhasil disimpan &amp; diterjemahkan otomatis!</span>
        </div>
      )}

      {/* Auto-Translate AI Notification Pill */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/60 text-xs text-orange-800 dark:text-orange-300">
        <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
          <Languages className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold flex items-center gap-1.5">
            <span>Fitur Auto-Translate Aktif</span>
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          </p>
          <p className="text-[11px] text-orange-700/80 dark:text-orange-400 mt-0.5">
            Cukup tulis biografi dalam <strong>Bahasa Indonesia</strong>. Sistem akan otomatis menerjemahkannya ke Bahasa Inggris saat disimpan.
          </p>
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-navy-800">
          Informasi Personal
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Lengkap
            </label>
            <input
              name="name"
              type="text"
              required
              defaultValue={about?.name || "Muhammad Najwa Syarif"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <ImageUpload
              name="profileImage"
              label="Foto Profil About"
              defaultValue={about?.profileImage || "/images/profile.png"}
              folder="profiles"
              aspectRatio="square"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Lokasi Domisili
            </label>
            <input
              name="location"
              type="text"
              defaultValue={about?.location || "Indonesia"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Pendidikan Saat Ini
            </label>
            <input
              name="currentEducation"
              type="text"
              defaultValue={about?.currentEducation || "Informatika / Computer Science"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Status Ketersediaan
            </label>
            <input
              name="status"
              type="text"
              defaultValue={about?.status || "Open to Work / Available for Hire"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Alamat Email Kontak
            </label>
            <input
              name="email"
              type="email"
              defaultValue={about?.email || "najwasyarif@example.com"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nomor WhatsApp (misal: +6281234567890)
            </label>
            <input
              name="whatsapp"
              type="text"
              defaultValue={about?.whatsapp || "+6281234567890"}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Main Indonesian Bio Editor */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-6">
        <div className="pb-2 border-b border-slate-100 dark:border-navy-800">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
            Biografi &amp; Profil Profesional (Bahasa Indonesia)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kedua paragraf akan otomatis diterjemahkan ke Bahasa Inggris melalui sistem Auto-Translate saat disimpan.
          </p>
        </div>

        {/* Paragraph 1 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Paragraf 1 (Pengenalan Profil Utama) *
          </label>
          <textarea
            name="bioId"
            rows={5}
            required
            defaultValue={
              about?.bio?.id ||
              "Saya adalah seorang profesional yang berfokus pada pembuatan solusi digital modern, clean, dan mudah digunakan. Terbiasa membangun antarmuka web yang responsif, performa tinggi, dan terintegrasi dengan database."
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Paragraf 2 (Pendekatan Kerja &amp; Spesialisasi Teknis)
          </label>
          <textarea
            name="bioSecondaryId"
            rows={5}
            defaultValue={
              about?.bioSecondary?.id ||
              "Dalam setiap project, saya memprioritaskan arsitektur kode yang rapi, kemudahan pemeliharaan, serta performa rendering yang optimal di sisi client maupun server. Saya terbiasa menggunakan ekosistem tools modern, alur kerja kreatif, dan arsitektur database."
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-60 text-white font-semibold text-xs shadow-md transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? "Menerjemahkan & Menyimpan..." : "Simpan Konten About"}</span>
        </button>
      </div>
    </form>
  );
}
