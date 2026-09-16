"use client";

import * as React from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Check,
  X,
  Sparkles,
  RefreshCw,
  Loader2,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import { getCroppedImg, getImageAspectRatio } from "@/lib/media/crop-utils";

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  /**
   * Target crop frame ratio (width / height). Use `"auto"` to match the
   * image's natural ratio so the full photo is shown without pre-cropping.
   */
  aspectRatio?: number | "auto";
  title?: string;
  onCropComplete: (croppedBlob: Blob, previewUrl: string) => void | Promise<void>;
}

export function ImageCropperModal({
  isOpen,
  onClose,
  imageSrc,
  aspectRatio = 1,
  title = "Crop & Atur Posisi Foto",
  onCropComplete,
}: ImageCropperModalProps) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [resolvedAspect, setResolvedAspect] = React.useState<number>(
    typeof aspectRatio === "number" ? aspectRatio : 1
  );

  const isAutoAspect = aspectRatio === "auto";

  // Reset interaction state whenever a new image/editor session starts.
  const sessionKey = `${isOpen ? "open" : "closed"}:${imageSrc}:${String(aspectRatio)}`;
  const [activeSession, setActiveSession] = React.useState(sessionKey);
  if (activeSession !== sessionKey) {
    setActiveSession(sessionKey);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setErrorMessage(null);
    setResolvedAspect(typeof aspectRatio === "number" ? aspectRatio : 1);
  }

  // When auto aspect ratio is requested, match natural image ratio
  React.useEffect(() => {
    if (!isOpen || !isAutoAspect || !imageSrc) return;
    let cancelled = false;
    getImageAspectRatio(imageSrc)
      .then((ratio) => {
        if (!cancelled && Number.isFinite(ratio) && ratio > 0) {
          setResolvedAspect(ratio);
        }
      })
      .catch(() => {
        if (!cancelled) setResolvedAspect(1);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, isAutoAspect, imageSrc]);

  if (!isOpen) return null;

  const handleCropChange = (location: { x: number; y: number }) => {
    setCrop(location);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropCompleteHandler = (
    _croppedArea: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Presets
  const handlePresetFocusTop = () => {
    setZoom(1.2);
    setCrop({ x: 0, y: 40 });
  };

  const handlePresetCenter = () => {
    setCrop({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { blob, url } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      await onCropComplete(blob, url);
      setIsProcessing(false);
      onClose();
    } catch (err) {
      console.error("[ImageCropperModal] Error cropping image:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal memproses crop gambar."
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-700/70 bg-navy-900 text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-navy-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {title}
              </h3>
              <p className="text-[11px] text-slate-400">
                Geser (drag) dan atur zoom untuk menentukan area crop yang diinginkan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Cropper Area */}
        <div className="relative w-full h-80 sm:h-96 bg-slate-950 select-none overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={resolvedAspect}
            minZoom={0.2}
            maxZoom={4}
            restrictPosition={false}
            objectFit="contain"
            zoomWithScroll={true}
            showGrid={true}
            onCropChange={handleCropChange}
            onZoomChange={handleZoomChange}
            onCropComplete={onCropCompleteHandler}
            classes={{
              containerClassName: "relative w-full h-full",
              cropAreaClassName:
                "border-2 border-orange-500 shadow-[0_0_0_9999px_rgba(15,23,42,0.72)] rounded-2xl",
            }}
          />

          {/* Floating full-image indicator */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-navy-950/80 border border-slate-700/80 text-[10px] text-slate-300 font-medium pointer-events-none flex items-center gap-1.5 backdrop-blur-xs shadow-md">
            <ImageIcon className="w-3 h-3 text-orange-400" />
            <span>WYSIWYG Preview</span>
          </div>

          {/* Floating drag guide */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-navy-950/80 border border-slate-700/80 text-[11px] text-slate-300 font-medium pointer-events-none flex items-center gap-1.5 backdrop-blur-xs shadow-md">
            <Move className="w-3.5 h-3.5 text-orange-400" />
            <span>Geser / scroll untuk mengatur framing</span>
          </div>
        </div>

        {/* Toolbar & Controls */}
        <div className="p-5 border-t border-slate-800 bg-navy-900/95 space-y-4">
          {/* Zoom Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <ZoomIn className="w-3.5 h-3.5 text-orange-400" />
                Zoom / Skala
              </span>
              <span className="font-mono font-semibold text-orange-400">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.2, +(z - 0.1).toFixed(2)))}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min={0.2}
                max={4}
                step={0.02}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(4, +(z + 0.1).toFixed(2)))}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Presets & Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePresetFocusTop}
                className="px-2.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                title="Posisikan fokus ke bagian atas/wajah"
              >
                <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Fokus Wajah / Atas</span>
              </button>
              <button
                type="button"
                onClick={handlePresetCenter}
                className="px-2.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
              >
                Tengah
              </button>
              <button
                type="button"
                onClick={handleRotate}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Putar 90 Derajat"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Reset Posisi & Zoom"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveCrop}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-60 text-xs font-semibold text-white shadow-md transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Memproses Crop...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Terapkan Crop</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-400 pt-1">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
