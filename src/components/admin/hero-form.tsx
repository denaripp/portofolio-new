"use client";

import * as React from "react";
import { useActionState } from "react";
import { updateHeroAction, ActionResult } from "@/actions/cms.actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { HeroData } from "@/types/content";
import { Save, AlertCircle, CheckCircle2, Sparkles, Languages } from "lucide-react";

interface HeroFormProps {
  hero: HeroData | null;
}

export function HeroForm({ hero }: HeroFormProps) {
  const [formData, setFormData] = React.useState({
    name: hero?.name || "Muhammad Najwa Syarif",
    profileImage: hero?.profileImage || "/images/profile.png",
    roleId: hero?.role?.id || "Web Developer",
    specializationId: hero?.specialization?.id || "Next.js & React",
    headlineId:
      hero?.headline?.id ||
      "Membangun website modern, cepat, dan terukur dengan pengalaman pengguna optimal.",
    descriptionId:
      hero?.description?.id ||
      "Spesialis dalam pengembangan frontend & full-stack web application menggunakan Next.js, React, TypeScript, dan arsitektur database modern.",
    primaryCtaTextId: hero?.primaryCtaText?.id || "Lihat Project",
    secondaryCtaTextId: hero?.secondaryCtaText?.id || "Hubungi Saya",
    primaryCtaUrl: hero?.primaryCtaUrl || "/projects",
    secondaryCtaUrl: hero?.secondaryCtaUrl || "/contact",
  });

  // Sync state if initial prop changes after server action revalidation
  React.useEffect(() => {
    if (hero) {
      setFormData({
        name: hero.name,
        profileImage: hero.profileImage,
        roleId: hero.role.id,
        specializationId: hero.specialization?.id || "Next.js & React",
        headlineId: hero.headline.id,
        descriptionId: hero.description.id,
        primaryCtaTextId: hero.primaryCtaText.id,
        secondaryCtaTextId: hero.secondaryCtaText.id,
        primaryCtaUrl: hero.primaryCtaUrl,
        secondaryCtaUrl: hero.secondaryCtaUrl,
      });
    }
  }, [hero]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, formAction, isPending] = useActionState(
    async (prev: ActionResult | null, submittedData: FormData) => {
      return updateHeroAction(submittedData);
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
          <span>Perubahan konten Hero berhasil disimpan &amp; diterjemahkan otomatis ke Bahasa Inggris!</span>
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
            Cukup isi konten dalam <strong>Bahasa Indonesia</strong>. Sistem akan otomatis menerjemahkannya ke Bahasa Inggris saat disimpan.
          </p>
        </div>
      </div>

      {/* General Settings */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-navy-800">
          Informasi Utama
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Lengkap
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <ImageUpload
            name="profileImage"
            label="Foto Profil Hero"
            defaultValue={formData.profileImage}
            folder="profiles"
            aspectRatio="square"
            description="Format JPEG, PNG, atau WebP. Otomatis dikompres & dioptimasi ke WebP."
          />
        </div>
      </div>

      {/* Main Indonesian Content Editor */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs space-y-5">
        <div className="pb-2 border-b border-slate-100 dark:border-navy-800">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
            Teks Hero &amp; Deskripsi (Bahasa Indonesia)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Versi Bahasa Inggris akan dihasilkan otomatis melalui LibreTranslate
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Role / Jabatan
            </label>
            <input
              name="roleId"
              type="text"
              required
              value={formData.roleId}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer, Desainer Grafis"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Spesialisasi (Di Bawah Foto)
            </label>
            <input
              name="specializationId"
              type="text"
              required
              value={formData.specializationId}
              onChange={handleChange}
              placeholder="e.g. Next.js & React, Brand Identity"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Headline / Tagline Utama
          </label>
          <input
            name="headlineId"
            type="text"
            required
            value={formData.headlineId}
            onChange={handleChange}
            placeholder="e.g. Membangun website modern dan terukur dengan performa tinggi."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Deskripsi Singkat Profil
          </label>
          <textarea
            name="descriptionId"
            rows={4}
            required
            value={formData.descriptionId}
            onChange={handleChange}
            placeholder="Jelaskan fokus keahlian, pengalaman, dan nilai yang Anda tawarkan..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* CTA Buttons & URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-navy-800">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Teks Tombol Utama
            </label>
            <input
              name="primaryCtaTextId"
              type="text"
              value={formData.primaryCtaTextId}
              onChange={handleChange}
              placeholder="e.g. Lihat Project"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              URL Tombol Utama
            </label>
            <input
              name="primaryCtaUrl"
              type="text"
              value={formData.primaryCtaUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Teks Tombol Sekunder
            </label>
            <input
              name="secondaryCtaTextId"
              type="text"
              value={formData.secondaryCtaTextId}
              onChange={handleChange}
              placeholder="e.g. Hubungi Saya"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              URL Tombol Sekunder
            </label>
            <input
              name="secondaryCtaUrl"
              type="text"
              value={formData.secondaryCtaUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
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
          <span>{isPending ? "Menerjemahkan & Menyimpan..." : "Simpan Konten Hero"}</span>
        </button>
      </div>
    </form>
  );
}
