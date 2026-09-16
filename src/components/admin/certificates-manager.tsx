"use client";

import * as React from "react";
import { CertificateItem } from "@/types/content";
import { createCertificateAction, updateCertificateAction, deleteCertificateAction } from "@/actions/cms.actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { Plus, Trash2, Edit2, X, Check, AlertCircle, ExternalLink, Sparkles } from "lucide-react";

interface CertificatesManagerProps {
  certificates: CertificateItem[];
}

export function CertificatesManager({ certificates }: CertificatesManagerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingCert, setEditingCert] = React.useState<CertificateItem | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let res;

    if (editingCert) {
      res = await updateCertificateAction(editingCert.id, formData);
    } else {
      res = await createCertificateAction(formData);
    }

    setLoading(false);

    if (!res.success) {
      setError(res.error || "Gagal memproses sertifikat.");
    } else {
      setModalOpen(false);
      setEditingCert(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus sertifikat "${title}"?`)) return;
    const res = await deleteCertificateAction(id);
    if (!res.success) {
      alert(res.error || "Gagal menghapus sertifikat.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total {certificates.length} sertifikat terdaftar
        </p>
        <button
          type="button"
          onClick={() => {
            setEditingCert(null);
            setError(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Sertifikat Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-navy-950/60 border-b border-slate-200 dark:border-navy-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Judul Sertifikat</th>
                <th className="px-6 py-3.5">Lembaga / Organisasi</th>
                <th className="px-6 py-3.5">Tahun</th>
                <th className="px-6 py-3.5">Link Verifikasi</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800 text-slate-700 dark:text-slate-300">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-900/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-orange-600 dark:text-orange-400">
                    #{cert.displayOrder}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {cert.title.id}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      {cert.title.en}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {cert.organization}
                  </td>
                  <td className="px-6 py-4 font-mono">
                    {cert.dateObtained}
                  </td>
                  <td className="px-6 py-4">
                    {cert.certificateUrl ? (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Lihat Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCert(cert);
                          setError(null);
                          setModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:text-orange-600 hover:border-orange-300 transition-colors"
                        title="Edit Sertifikat"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cert.id, cert.title.id)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Hapus Sertifikat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl shadow-2xl p-6 space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingCert ? "Edit Sertifikat" : "Tambah Sertifikat Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Auto-Translate Notification */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/60 text-xs text-orange-800 dark:text-orange-300">
                <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-[11px]">
                  Isi judul dan deskripsi sertifikat dalam <strong>Bahasa Indonesia</strong>. Versi Bahasa Inggris akan diterjemahkan otomatis saat disimpan.
                </span>
              </div>

              {/* Indonesian Inputs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Judul Sertifikat
                  </label>
                  <input
                    name="titleId"
                    type="text"
                    required
                    defaultValue={editingCert?.title.id || ""}
                    placeholder="e.g. Full Stack Web Development, Google Data Analytics"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Deskripsi Singkat / Catatan (Opsional)
                  </label>
                  <textarea
                    name="descriptionId"
                    rows={3}
                    defaultValue={editingCert?.description?.id || ""}
                    placeholder="Deskripsi singkat kompetensi atau materi yang dipelajari..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-navy-800">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Lembaga Penyelenggara
                  </label>
                  <input
                    name="organization"
                    type="text"
                    required
                    defaultValue={editingCert?.organization || ""}
                    placeholder="e.g. Dicoding Academy, Google"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tahun / Tanggal Diperoleh
                  </label>
                  <input
                    name="dateObtained"
                    type="text"
                    defaultValue={editingCert?.dateObtained || "2025"}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUpload
                    name="image"
                    label="Gambar Sertifikat"
                    defaultValue={editingCert?.image || "/images/certificates/cert1.png"}
                    folder="certificates"
                    aspectRatio="auto"
                    description="Format JPEG, PNG, WebP (Maks. 5MB). Otomatis di-resize & WebP-compressed."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Link Verifikasi Online (Opsional)
                  </label>
                  <input
                    name="certificateUrl"
                    type="url"
                    defaultValue={editingCert?.certificateUrl || ""}
                    placeholder="https://credential.net/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Urutan Tampil
                  </label>
                  <input
                    name="displayOrder"
                    type="number"
                    defaultValue={editingCert?.displayOrder ?? 0}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  id="isFeaturedCert"
                  name="isFeatured"
                  type="checkbox"
                  defaultChecked={editingCert?.isFeatured ?? true}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="isFeaturedCert" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Tampilkan di Preview Certificates (Home Page)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-navy-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold disabled:opacity-60 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>{loading ? "Menyimpan..." : "Simpan Sertifikat"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
