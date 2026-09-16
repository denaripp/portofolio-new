"use client";

import * as React from "react";
import { SocialLinkItem } from "@/types/content";
import {
  createSocialLinkAction,
  updateSocialLinkAction,
  deleteSocialLinkAction,
} from "@/actions/cms.actions";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import {
  getPlatformIcon,
  SUPPORTED_PLATFORM_ICONS,
} from "@/components/ui/icons";

interface SocialLinksManagerProps {
  socialLinks: SocialLinkItem[];
}

export function SocialLinksManager({ socialLinks }: SocialLinksManagerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingLink, setEditingLink] = React.useState<SocialLinkItem | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Selected icon in modal for live preview
  const [selectedIcon, setSelectedIcon] = React.useState<string>("instagram");
  const [platformName, setPlatformName] = React.useState<string>("");

  React.useEffect(() => {
    if (editingLink) {
      setSelectedIcon(editingLink.icon || "globe");
      setPlatformName(editingLink.platform || "");
    } else {
      setSelectedIcon("instagram");
      setPlatformName("");
    }
  }, [editingLink, modalOpen]);

  const handleIconSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedIcon(val);

    // Auto-fill platform name if empty
    const matched = SUPPORTED_PLATFORM_ICONS.find((p) => p.id === val);
    if (matched && (!platformName || platformName.trim() === "")) {
      setPlatformName(matched.label.split(" / ")[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let res;

    if (editingLink) {
      res = await updateSocialLinkAction(editingLink.id, formData);
    } else {
      res = await createSocialLinkAction(formData);
    }

    setLoading(false);

    if (!res.success) {
      setError(res.error || "Gagal memproses data.");
    } else {
      setModalOpen(false);
      setEditingLink(null);
    }
  };

  const handleDelete = async (id: string, platform: string) => {
    if (!confirm(`Hapus platform "${platform}"?`)) return;
    const res = await deleteSocialLinkAction(id);
    if (!res.success) {
      alert(res.error || "Gagal menghapus link.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total {socialLinks.length} platform terdaftar
        </p>
        <button
          type="button"
          onClick={() => {
            setEditingLink(null);
            setError(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Platform Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-navy-950/60 border-b border-slate-200 dark:border-navy-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Platform</th>
                <th className="px-6 py-3.5">Icon ID</th>
                <th className="px-6 py-3.5">Target URL</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800 text-slate-700 dark:text-slate-300">
              {socialLinks.map((link) => (
                <tr
                  key={link.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-navy-900/40 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-bold text-orange-600 dark:text-orange-400">
                    #{link.displayOrder}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                        {getPlatformIcon(link.icon, "w-4 h-4")}
                      </div>
                      <span>{link.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-[11px]">
                      {link.icon}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1 max-w-xs truncate"
                    >
                      <span className="truncate">{link.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        link.isActive
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          : "bg-slate-100 dark:bg-navy-800 text-slate-500 border-slate-200 dark:border-navy-700"
                      }`}
                    >
                      {link.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLink(link);
                          setError(null);
                          setModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:text-orange-600 hover:border-orange-300 transition-colors"
                        title="Edit Platform"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(link.id, link.platform)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Hapus Platform"
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
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingLink ? "Edit Platform" : "Tambah Platform Baru"}
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
              {/* Icon Selector with Visual Preview */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Pilih Icon Platform</span>
                  <span className="text-[11px] font-normal text-slate-400">
                    ID: <code className="font-mono text-orange-500">{selectedIcon}</code>
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0 shadow-xs">
                    {getPlatformIcon(selectedIcon, "w-5 h-5")}
                  </div>

                  <select
                    name="icon"
                    value={selectedIcon}
                    onChange={handleIconSelectChange}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {SUPPORTED_PLATFORM_ICONS.map((platform) => (
                      <option key={platform.id} value={platform.id}>
                        {platform.label} ({platform.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Platform Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Platform
                </label>
                <input
                  name="platform"
                  type="text"
                  required
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  placeholder="e.g. Instagram, GitHub, LinkedIn"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  URL Akun / Tautan
                </label>
                <input
                  name="url"
                  type="text"
                  required
                  defaultValue={editingLink?.url || ""}
                  placeholder="https://instagram.com/username..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Display Order */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Urutan Tampil (Display Order)
                </label>
                <input
                  name="displayOrder"
                  type="number"
                  defaultValue={editingLink?.displayOrder ?? socialLinks.length + 1}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  defaultChecked={editingLink?.isActive ?? true}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor="isActive"
                  className="text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Aktifkan di Website Publik (Contact / Footer)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-navy-800">
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold disabled:opacity-60 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>{loading ? "Menyimpan..." : "Simpan Platform"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
