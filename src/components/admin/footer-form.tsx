"use client";

import * as React from "react";
import { useActionState } from "react";
import { updateFooterAction, ActionResult } from "@/actions/cms.actions";
import { FooterData } from "@/types/content";
import {
  Save,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Languages,
  PanelBottom,
  Eye,
} from "lucide-react";

interface FooterFormProps {
  footer: FooterData | null;
  defaultName?: string;
}

export function FooterForm({ footer, defaultName = "Muhammad Najwa Syarif" }: FooterFormProps) {
  const [formData, setFormData] = React.useState({
    taglineId:
      footer?.tagline?.id ||
      "Membangun solusi digital modern, responsif, dan terukur dengan dedikasi dan presisi.",
    copyrightName: footer?.copyrightName || defaultName,
  });

  React.useEffect(() => {
    if (footer) {
      setFormData({
        taglineId: footer.tagline.id,
        copyrightName: footer.copyrightName || defaultName,
      });
    }
  }, [footer, defaultName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, formAction, isPending] = useActionState(
    async (prev: ActionResult | null, submittedData: FormData) => {
      return updateFooterAction(submittedData);
    },
    null
  );

  const currentYear = new Date().getFullYear();

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
          <span>Konten footer berhasil diperbarui dan disinkronkan!</span>
        </div>
      )}

      {/* Auto Translate Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40 text-orange-800 dark:text-orange-200">
        <Sparkles className="w-4 h-4 mt-0.5 text-orange-600 shrink-0" />
        <div className="text-xs space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5" />
            Auto-Translate Otomatis Aktif
          </p>
          <p className="text-orange-700/80 dark:text-orange-300/80 leading-relaxed">
            Cukup isi tagline dalam Bahasa Indonesia. Sistem akan otomatis
            menerjemahkannya ke Bahasa Inggris saat disimpan.
          </p>
        </div>
      </div>

      {/* Form Fields Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/50 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-navy-800">
          <PanelBottom className="w-4 h-4 text-orange-600" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Pengaturan Konten Footer
          </h3>
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <label
            htmlFor="taglineId"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Tagline Footer (Bahasa Indonesia) *
          </label>
          <textarea
            id="taglineId"
            name="taglineId"
            rows={3}
            required
            value={formData.taglineId}
            onChange={handleChange}
            placeholder="Contoh: Membangun solusi digital modern, responsif, dan terukur dengan dedikasi dan presisi."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50/50 dark:bg-navy-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors resize-none"
          />
          {footer?.tagline?.en && (
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                Terjemahan Bahasa Inggris Saat Ini:
              </span>
              <p className="italic">"{footer.tagline.en}"</p>
            </div>
          )}
        </div>

        {/* Copyright Name */}
        <div className="space-y-2">
          <label
            htmlFor="copyrightName"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Nama Pemilik Hak Cipta (Copyright Name)
          </label>
          <input
            type="text"
            id="copyrightName"
            name="copyrightName"
            value={formData.copyrightName}
            onChange={handleChange}
            placeholder="Muhammad Najwa Syarif"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50/50 dark:bg-navy-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
          />
          <p className="text-[11px] text-slate-400">
            Tahun akan otomatis disesuaikan dengan tahun berjalan (© {currentYear}).
          </p>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/40 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <Eye className="w-3.5 h-3.5" />
          <span>Pratinjau Tampilan Footer (Live Preview)</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-950 space-y-4">
          <div className="space-y-1">
            <span className="font-extrabold text-xs tracking-wider uppercase text-slate-900 dark:text-white">
              {formData.copyrightName || defaultName}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {formData.taglineId || "Tagline footer..."}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-navy-800/80 text-[10px] text-slate-400">
            © {currentYear} {formData.copyrightName || defaultName}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm shadow-orange-600/20 transition-all cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isPending ? "Menyimpan & Menerjemahkan..." : "Simpan Perubahan Footer"}</span>
        </button>
      </div>
    </form>
  );
}
