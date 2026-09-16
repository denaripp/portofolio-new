"use client";

import * as React from "react";
import { retranslateAllAction } from "@/actions/cms.actions";
import { Languages, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export function RetranslateButton() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{ success: boolean; message: string } | null>(null);

  const handleRetranslate = async () => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menerjemahkan ulang semua konten (Hero, About, Project, Sertifikat) ke Bahasa Inggris via LibreTranslate?"
      )
    ) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await retranslateAllAction();
      if (res.success) {
        setResult({
          success: true,
          message: `Berhasil menerjemahkan ulang ${res.count || 0} entitas konten ke Bahasa Inggris!`,
        });
      } else {
        setResult({
          success: false,
          message: res.error || "Gagal melakukan auto-translate.",
        });
      }
    } catch (err: any) {
      setResult({
        success: false,
        message: err.message || "Terjadi kesalahan jaringan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleRetranslate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:border-orange-400 dark:hover:border-orange-500 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-50 transition-all shadow-2xs"
          title="Sinkronisasi & Terjemahkan Ulang Seluruh Konten ID ke EN"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
          ) : (
            <Languages className="w-4 h-4 text-orange-500" />
          )}
          <span>{loading ? "Sedang Menerjemahkan..." : "Re-Translate Semua Konten (ID → EN)"}</span>
        </button>
      </div>

      {result && (
        <div
          className={`flex items-center gap-2 p-2.5 rounded-xl text-xs ${
            result.success
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
}
