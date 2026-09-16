"use client";

import * as React from "react";
import {
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Crop,
} from "lucide-react";
import { ImageCropperModal } from "./image-cropper-modal";

interface ImageUploadProps {
  name: string;
  label: string;
  defaultValue?: string;
  folder?: "profiles" | "projects" | "certificates" | "skills" | "general";
  description?: string;
  /**
   * `"auto"` keeps the image's natural ratio (no forced pre-crop). Use
   * `"square"` / `"landscape"` only when the destination layout enforces it.
   */
  aspectRatio?: "square" | "landscape" | "auto";
  enableCropping?: boolean;
}

export function ImageUpload({
  name,
  label,
  defaultValue = "",
  folder = "general",
  description = "Format JPEG, PNG, atau WebP (Maks. 5MB)",
  aspectRatio = "auto",
  enableCropping = true,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = React.useState(defaultValue);
  const [previewUrl, setPreviewUrl] = React.useState(defaultValue);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = React.useState(false);
  const [rawImageForCrop, setRawImageForCrop] = React.useState<string>("");

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const numericAspectRatio: number | "auto" =
    aspectRatio === "square" ? 1 : aspectRatio === "landscape" ? 16 / 9 : "auto";

  const uploadBlob = async (blob: Blob | File) => {
    setIsUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", blob, "image.webp");
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah file.");
      }

      setImageUrl(data.url);
      setPreviewUrl(data.url);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Gagal mengunggah gambar."
      );
      setPreviewUrl(imageUrl); // revert
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Client-side quick size validation
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Ukuran file melebihi 10MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    if (enableCropping) {
      // Open cropper so user can adjust and crop position immediately
      setRawImageForCrop(objectUrl);
      setIsCropperOpen(true);
    } else {
      setPreviewUrl(objectUrl);
      await uploadBlob(file);
    }
  };

  const handleCropComplete = async (croppedBlob: Blob, croppedPreview: string) => {
    setPreviewUrl(croppedPreview);
    await uploadBlob(croppedBlob);
  };

  const handleOpenCropperForExisting = () => {
    if (previewUrl || imageUrl) {
      setRawImageForCrop(previewUrl || imageUrl);
      setIsCropperOpen(true);
    }
  };

  const handleClear = () => {
    setImageUrl("");
    setPreviewUrl("");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square max-w-[160px]"
      : aspectRatio === "landscape"
      ? "aspect-video max-w-[280px]"
      : "h-48 max-w-[320px]";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {imageUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-rose-500 hover:underline inline-flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Hapus Gambar</span>
          </button>
        )}
      </div>

      {/* Hidden input to pass the final URL in form submission */}
      <input type="hidden" name={name} value={imageUrl} />

      {/* File input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Box / Preview */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {previewUrl ? (
          <div
            className={`relative rounded-xl overflow-hidden border border-slate-200 dark:border-navy-700 bg-slate-100 dark:bg-navy-950 w-full ${aspectClass} flex items-center justify-center group shrink-0`}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-navy-950/70 flex items-center justify-center text-white text-xs gap-2 backdrop-blur-xs">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                <span>Menyimpan & Mengompres...</span>
              </div>
            )}
            {!isUploading && (
              <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                {enableCropping && (
                  <button
                    type="button"
                    onClick={handleOpenCropperForExisting}
                    className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-medium flex items-center gap-1 shadow-sm transition-colors"
                  >
                    <Crop className="w-3 h-3" />
                    <span>Atur Posisi / Crop</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-medium transition-colors"
                >
                  Ganti File
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed border-slate-200 dark:border-navy-700 hover:border-orange-500 rounded-2xl bg-slate-50 dark:bg-navy-950/60 p-5 w-full ${aspectClass} flex flex-col items-center justify-center text-center space-y-2 transition-colors shrink-0`}
          >
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                Pilih file
              </span>{" "}
              untuk upload
            </div>
          </div>
        )}

        {/* Info & URL Input fallback & Crop Trigger */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500" />
                  <span>Mengompresi ke WebP...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Foto Baru</span>
                </>
              )}
            </button>

            {enableCropping && (previewUrl || imageUrl) && !isUploading && (
              <button
                type="button"
                onClick={handleOpenCropperForExisting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 hover:bg-orange-100 dark:hover:bg-orange-900/60 text-xs font-medium text-orange-700 dark:text-orange-300 transition-colors"
              >
                <Crop className="w-3.5 h-3.5 text-orange-500" />
                <span>Crop &amp; Atur Posisi Foto</span>
              </button>
            )}

            {imageUrl && !isUploading && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Siap disimpan
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {description}
          </p>

          {/* Manual URL Input Option */}
          <div className="pt-1">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setPreviewUrl(e.target.value);
              }}
              placeholder="atau masukkan URL gambar (e.g. /images/...)"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-[11px] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono"
            />
          </div>

          {uploadError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal Cropper */}
      {isCropperOpen && rawImageForCrop && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          onClose={() => {
            setIsCropperOpen(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          imageSrc={rawImageForCrop}
          aspectRatio={numericAspectRatio}
          title={`Crop & Atur Posisi ${label}`}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
