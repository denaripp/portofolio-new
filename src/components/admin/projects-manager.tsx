"use client";

import * as React from "react";
import { ProjectItem } from "@/types/content";
import { createProjectAction, updateProjectAction, deleteProjectAction } from "@/actions/cms.actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { Plus, Trash2, Edit2, X, Check, AlertCircle, ExternalLink, Sparkles } from "lucide-react";

interface ProjectsManagerProps {
  projects: ProjectItem[];
}

const PRESET_PROJECT_CATEGORIES = [
  "Web Development",
  "UI/UX & Design",
  "Brand Identity",
  "Digital Marketing",
  "Photography Series",
  "Video Production",
  "Content & Writing",
  "Mobile App",
  "Other",
];

export function ProjectsManager({ projects }: ProjectsManagerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<ProjectItem | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Web Development");
  const [customCategory, setCustomCategory] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const existingCategories = Array.from(
    new Set([...PRESET_PROJECT_CATEGORIES, ...projects.map((p) => p.category).filter(Boolean)])
  );

  const openAddModal = () => {
    setEditingProject(null);
    setSelectedCategory("Web Development");
    setCustomCategory("");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    const cat = project.category || "Web Development";
    if (existingCategories.includes(cat)) {
      setSelectedCategory(cat);
      setCustomCategory("");
    } else {
      setSelectedCategory("custom");
      setCustomCategory(cat);
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
        ? customCategory.trim() || "General Project"
        : selectedCategory;
    formData.set("category", finalCategory);

    let res;
    if (editingProject) {
      res = await updateProjectAction(editingProject.id, formData);
    } else {
      res = await createProjectAction(formData);
    }

    setLoading(false);

    if (!res.success) {
      setError(res.error || "Gagal memproses project.");
    } else {
      setModalOpen(false);
      setEditingProject(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus project "${title}"?`)) return;
    const res = await deleteProjectAction(id);
    if (!res.success) {
      alert(res.error || "Gagal menghapus project.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total {projects.length} project terdaftar di berbagai kategori
        </p>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Project Baru</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-navy-950/60 border-b border-slate-200 dark:border-navy-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Judul (ID / EN)</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Tools &amp; Stack</th>
                <th className="px-6 py-3.5">Links</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800 text-slate-700 dark:text-slate-300">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-900/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-orange-600 dark:text-orange-400">
                    #{project.displayOrder}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {project.title.id}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      {project.title.en}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-[11px] font-medium border border-orange-200 dark:border-orange-800/60">
                      {project.category || "Web Development"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        project.status === "COMPLETED"
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.techStack.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-[10px] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>Preview</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 dark:text-slate-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {!project.demoUrl && !project.githubUrl && (
                        <span className="text-[11px] text-slate-400 italic">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(project)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:text-orange-600 hover:border-orange-300 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id, project.title.id)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-700 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Hapus Project"
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
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>{editingProject ? "Edit Project" : "Tambah Project Baru"}</span>
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
                  Isi judul dan deskripsi dalam <strong>Bahasa Indonesia</strong>. Versi Bahasa Inggris akan diterjemahkan otomatis saat disimpan.
                </span>
              </div>

              {/* Indonesian Inputs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Judul Project
                  </label>
                  <input
                    name="titleId"
                    type="text"
                    required
                    defaultValue={editingProject?.title.id || ""}
                    placeholder="e.g. Brand Identity Redesign, E-Commerce Platform"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Deskripsi Project
                  </label>
                  <textarea
                    name="descriptionId"
                    rows={3}
                    required
                    defaultValue={editingProject?.description.id || ""}
                    placeholder="Jelaskan tujuan, proses kreatif/teknis, dan hasil dari project ini..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Category & Tools Configuration */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-navy-800">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kategori / Tipe Project
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
                    Tools / Software / Teknologi yang Digunakan (Pisahkan dengan koma)
                  </label>
                  <input
                    name="techStack"
                    type="text"
                    defaultValue={editingProject?.techStack.join(", ") || ""}
                    placeholder="e.g. Figma, Adobe Photoshop, Next.js, Lightroom, Premiere Pro"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* URLs & Media */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-navy-800">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Live Demo / Preview / Portofolio URL <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    name="demoUrl"
                    type="url"
                    defaultValue={editingProject?.demoUrl || ""}
                    placeholder="https://demo.example.com atau https://behance.net/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Link Source / GitHub / Behance / Drive <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    name="githubUrl"
                    type="url"
                    defaultValue={editingProject?.githubUrl || ""}
                    placeholder="https://github.com/... atau https://drive.google.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUpload
                    name="image"
                    label="Gambar Cover / Banner Project"
                    defaultValue={editingProject?.image || "/images/projects/project1.png"}
                    folder="projects"
                    aspectRatio="landscape"
                    description="Upload gambar cover representatif karya Anda (JPEG, PNG, WebP Maks. 5MB)."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Status Pengerjaan
                  </label>
                  <select
                    name="status"
                    defaultValue={editingProject?.status || "COMPLETED"}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="COMPLETED">Completed (Selesai)</option>
                    <option value="IN_PROGRESS">In Progress (Sedang Berjalan)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Urutan Tampil
                  </label>
                  <input
                    name="displayOrder"
                    type="number"
                    defaultValue={editingProject?.displayOrder ?? 0}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  defaultChecked={editingProject?.isFeatured ?? true}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="isFeatured" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Tampilkan sebagai Karya Utama / Unggulan (Featured) di Home Page
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
                  <span>{loading ? "Menyimpan..." : "Simpan Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
