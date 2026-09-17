"use client";

import * as React from "react";
import { SkillItem } from "@/types/content";
import { createSkillAction, updateSkillAction, deleteSkillAction } from "@/actions/cms.actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { SkillIcon } from "@/components/ui/skill-icon";
import { Plus, Trash2, Edit2, X, Check, AlertCircle, Sparkles } from "lucide-react";

interface SkillsManagerProps {
  skills: SkillItem[];
}

const PRESET_CATEGORIES = [
  "Development",
  "Design",
  "Marketing",
  "Photography",
  "Video & Motion",
  "Writing & Content",
  "Tools & Software",
  "Other",
];

export function SkillsManager({ skills }: SkillsManagerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingSkill, setEditingSkill] = React.useState<SkillItem | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Development");
  const [customCategory, setCustomCategory] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Derive unique categories from existing skills + presets
  const existingCategories = Array.from(
    new Set([...PRESET_CATEGORIES, ...skills.map((s) => s.category).filter(Boolean)])
  );

  const openAddModal = () => {
    setEditingSkill(null);
    setSelectedCategory("Development");
    setCustomCategory("");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    if (existingCategories.includes(skill.category)) {
      setSelectedCategory(skill.category);
      setCustomCategory("");
    } else {
      setSelectedCategory("custom");
      setCustomCategory(skill.category);
    }
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const finalCategory =
      selectedCategory === "custom"
        ? customCategory.trim() || "General"
        : selectedCategory;
    formData.set("category", finalCategory);

    let res;
    if (editingSkill) {
      res = await updateSkillAction(editingSkill.id, formData);
    } else {
      res = await createSkillAction(formData);
    }

    setLoading(false);

    if (!res.success) {
      setError(res.error || "Gagal memproses data.");
    } else {
      setModalOpen(false);
      setEditingSkill(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus skill "${name}"?`)) return;
    const res = await deleteSkillAction(id);
    if (!res.success) {
      alert(res.error || "Gagal menghapus skill.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total {skills.length} skill terdaftar di berbagai kategori
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Skill Baru</span>
        </button>
      </div>

      {/* Skills Table / List */}
      <div className="rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-navy-950/60 border-b border-slate-200 dark:border-navy-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Nama Skill</th>
                <th className="px-6 py-3.5">Kategori Bidang</th>
                <th className="px-6 py-3.5">Tingkat Kemahiran</th>
                <th className="px-6 py-3.5">Icon / Logo</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800 text-slate-700 dark:text-slate-300">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-900/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-navy-800 flex items-center justify-center p-1 border border-slate-200/80 dark:border-navy-700 shrink-0">
                        <SkillIcon icon={skill.icon} name={skill.name} className="w-full h-full object-contain" fallbackClassName="w-3.5 h-3.5 text-orange-500" />
                      </div>
                      <span>{skill.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-[11px] font-medium border border-orange-200 dark:border-orange-800/60">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs capitalize font-medium">
                      {skill.level.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400 truncate max-w-[200px]" title={skill.icon}>
                    {skill.icon}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(skill)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:text-orange-600 hover:border-orange-300 transition-colors"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(skill.id, skill.name)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Hapus Skill"
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
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>{editingSkill ? "Edit Skill" : "Tambah Skill Baru"}</span>
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
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Skill / Kemampuan
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingSkill?.name || ""}
                  placeholder="e.g. Next.js, Figma, Adobe Lightroom, SEO Marketing"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kategori Bidang
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {existingCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="custom">+ Tulis Kategori Kustom...</option>
                  </select>

                  {selectedCategory === "custom" && (
                    <input
                      type="text"
                      placeholder="Nama kategori kustom..."
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-orange-300 dark:border-orange-600 bg-orange-50/50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tingkat Kemahiran
                </label>
                <select
                  name="level"
                  defaultValue={editingSkill?.level || "INTERMEDIATE"}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="BEGINNER">Beginner (Dasar)</option>
                  <option value="INTERMEDIATE">Intermediate (Menengah)</option>
                  <option value="ADVANCED">Advanced (Mahir)</option>
                </select>
              </div>

              <div>
                <ImageUpload
                  name="icon"
                  label="Icon / Logo Skill"
                  defaultValue={editingSkill?.icon || ""}
                  folder="skills"
                  aspectRatio="square"
                  description="Upload gambar icon (PNG/SVG/WebP), atau ketik nama icon dalam bahasa Inggris/slug (misal: react, figma, microsoftexcel) untuk mengambil otomatis dari Simple Icons."
                />
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
                  <span>{loading ? "Menyimpan..." : "Simpan Skill"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
