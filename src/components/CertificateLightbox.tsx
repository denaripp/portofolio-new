"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ExternalLink, Award } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export interface CertificateModalData {
  id?: string;
  role: string;
  organization: string;
  employmentType?: string;
  period?: string;
  logoImage?: string;
  summary?: string;
  highlights?: string[];
  technologies?: string[];
}

interface CertificateLightboxProps {
  certificate: CertificateModalData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateLightbox({
  certificate,
  isOpen,
  onClose,
}: CertificateLightboxProps) {
  const { isBlack } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom whenever a new certificate is opened
  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
    }
  }, [isOpen, certificate]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!mounted || !certificate) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={`relative flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-[16px] border shadow-2xl transition-colors ${
              isBlack
                ? "border-[#262626] bg-[#0c0c0c] text-white"
                : "border-[#e5e5e5] bg-white text-[#171918]"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4 ${
                isBlack ? "border-[#1e1e1e]" : "border-[#e5e5e5]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#39a875]/15 text-[#39a875]">
                  <Award className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-[15px] font-semibold sm:text-[16px] truncate">
                      {certificate.role}
                    </span>
                    {certificate.period && (
                      <span className="rounded border border-[#39a875]/30 bg-[#39a875]/10 px-2 py-0.5 font-mono text-[11px] font-medium text-[#39a875]">
                        {certificate.period}
                      </span>
                    )}
                  </div>
                  <p className="font-mono-ui text-[12px] text-[#858786] truncate">
                    {certificate.organization}
                    {certificate.employmentType ? ` · ${certificate.employmentType}` : ""}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {certificate.logoImage && (
                  <a
                    href={certificate.logoImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka gambar di tab baru"
                    className={`flex size-8 items-center justify-center rounded-lg border transition-colors ${
                      isBlack
                        ? "border-[#262626] bg-[#141414] text-[#858786] hover:border-[#39a875] hover:text-white"
                        : "border-[#e0e0e0] bg-[#f7f7f7] text-[#777a78] hover:border-[#39a875] hover:text-black"
                    }`}
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup preview"
                  className={`flex size-8 items-center justify-center rounded-lg border transition-all hover:scale-105 active:scale-95 ${
                    isBlack
                      ? "border-[#262626] bg-[#141414] text-[#858786] hover:border-[#39a875] hover:text-white"
                      : "border-[#e0e0e0] bg-[#f7f7f7] text-[#777a78] hover:border-[#39a875] hover:text-black"
                  }`}
                >
                  <X className="size-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Modal Image Viewer with Zoom Capability */}
            <div className="relative flex min-h-[260px] max-h-[58vh] w-full items-center justify-center overflow-auto bg-black/40 p-3 sm:p-6 select-none">
              {certificate.logoImage ? (
                <div
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="group relative flex max-h-full items-center justify-center"
                >
                  <img
                    src={certificate.logoImage}
                    alt={certificate.role}
                    className={`max-h-[52vh] w-auto max-w-full rounded-md object-contain shadow-lg transition-transform duration-300 ${
                      isZoomed
                        ? "scale-125 sm:scale-150 cursor-zoom-out"
                        : "cursor-zoom-in group-hover:brightness-105"
                    }`}
                  />
                  {/* Floating Zoom Hint Pill */}
                  <div className="pointer-events-none absolute bottom-2 right-2 rounded-full border border-white/10 bg-black/75 px-2.5 py-1 text-[11px] font-mono text-white/90 backdrop-blur-md flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {isZoomed ? (
                      <>
                        <ZoomOut className="size-3 text-[#39a875]" />
                        <span>Zoom Out</span>
                      </>
                    ) : (
                      <>
                        <ZoomIn className="size-3 text-[#39a875]" />
                        <span>Klik untuk Zoom</span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-[#858786]">
                  <Award className="size-12 text-[#39a875]" />
                  <span className="text-[13px]">Gambar sertifikat tidak tersedia</span>
                </div>
              )}
            </div>

            {/* Modal Footer Details */}
            {certificate.summary && (
              <div
                className={`border-t px-4 py-3 sm:px-6 sm:py-4 ${
                  isBlack ? "border-[#1e1e1e] bg-[#0f0f0f]" : "border-[#e5e5e5] bg-[#fafafa]"
                }`}
              >
                <p className="font-sans-body text-[13px] leading-[20px] text-[#858786]">
                  {certificate.summary}
                </p>
                {certificate.technologies && certificate.technologies.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {certificate.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded border px-2 py-0.5 font-mono text-[11px] ${
                          isBlack
                            ? "border-[#262626] bg-black text-[#a1a1aa]"
                            : "border-[#e0e0e0] bg-white text-[#52525b]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
