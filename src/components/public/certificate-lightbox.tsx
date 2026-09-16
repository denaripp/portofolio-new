"use client";

import * as React from "react";
import { CertificateItem } from "@/types/content";
import { useLanguage } from "@/components/providers/language-provider";
import { X, ZoomIn, ZoomOut, ExternalLink, Award, Calendar } from "lucide-react";
import { ImagePreview } from "@/components/ui/image-preview";
import { cn } from "@/lib/utils";

interface CertificateLightboxProps {
  certificates: CertificateItem[];
}

export function CertificateLightbox({ certificates }: CertificateLightboxProps) {
  const { locale, t } = useLanguage();
  const [selectedCert, setSelectedCert] = React.useState<CertificateItem | null>(
    null
  );
  const [isZoomed, setIsZoomed] = React.useState(false);

  // Close on ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
        setIsZoomed(false);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  return (
    <>
      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          const certTitle = cert.title[locale] || cert.title.id;
          const certDesc = cert.description
            ? cert.description[locale] || cert.description.id
            : null;

          return (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/60 p-5 shadow-xs hover:shadow-md hover:border-orange-500/50 transition-all duration-200 flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedCert(cert);
                }
              }}
            >
              <div className="space-y-4">
                {/* Image Preview Box */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors duration-200 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      <ZoomIn className="w-4 h-4" />
                      {t.certificates.viewCertificate}
                    </span>
                  </div>
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={certTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                      <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-2">
                        <Award className="w-12 h-12 text-orange-500/60" />
                        <span className="text-xs font-mono">
                          {cert.organization}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      {cert.organization}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.dateObtained}
                    </span>
                  </div>
                  <h3 className="heading-title text-base text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {certTitle}
                  </h3>
                  {certDesc && (
                    <p className="text-body text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {certDesc}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="group-hover:text-orange-500 transition-colors">
                  {t.certificates.clickToEnlarge}
                </span>
                <ZoomIn className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Lightbox */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setSelectedCert(null);
            setIsZoomed(false);
          }}
          className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/50">
              <div>
                <h4 className="heading-title text-base sm:text-lg text-slate-900 dark:text-white">
                  {selectedCert.title[locale] || selectedCert.title.id}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedCert.organization} • {selectedCert.dateObtained}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-navy-800 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors"
                  title={isZoomed ? t.certificates.zoomOut : t.certificates.zoomIn}
                >
                  {isZoomed ? (
                    <ZoomOut className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ZoomIn className="w-4 h-4" />
                  )}
                </button>

                {selectedCert.certificateUrl && (
                  <a
                    href={selectedCert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-slate-200 dark:border-navy-800 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 transition-colors"
                    title={t.certificates.verifyLink}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCert(null);
                    setIsZoomed(false);
                  }}
                  className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-colors"
                  title={`${t.common.close} (Esc)`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Image Viewer */}
            <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-100/60 dark:bg-navy-950/60 min-h-[360px]">
              <div
                className={cn(
                  "transition-all duration-200 rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 flex flex-col items-center justify-center text-center shadow-lg",
                  isZoomed ? "w-[140%] max-w-none" : "w-full max-w-3xl"
                )}
              >
                {selectedCert.image ? (
                  <div className="w-full flex flex-col">
                    <div className="w-full bg-slate-950/50 p-2 sm:p-4 flex items-center justify-center min-h-[260px]">
                      <ImagePreview
                        src={selectedCert.image}
                        alt={selectedCert.title[locale] || selectedCert.title.id}
                        maxHeightClassName={isZoomed ? "max-h-none" : "max-h-[65vh]"}
                      />
                    </div>
                    <div className="p-5 sm:p-6 text-left border-t border-slate-100 dark:border-navy-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                          {selectedCert.organization}
                        </span>
                        <span className="text-slate-500 font-mono">
                          {selectedCert.dateObtained}
                        </span>
                      </div>
                      {selectedCert.description && (
                        <p className="text-body text-xs text-slate-600 dark:text-slate-300">
                          {selectedCert.description[locale] || selectedCert.description.id}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center">
                    <Award className="w-20 h-20 text-orange-500 mb-4" />
                    <h5 className="heading-title text-xl text-slate-900 dark:text-white mb-1">
                      {selectedCert.title[locale] || selectedCert.title.id}
                    </h5>
                    <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-3">
                      {t.certificates.organizer}: {selectedCert.organization}
                    </p>
                    {selectedCert.description && (
                      <p className="text-body text-xs text-slate-600 dark:text-slate-300 max-w-lg mb-4">
                        {selectedCert.description[locale] || selectedCert.description.id}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {t.certificates.dateObtained}: {selectedCert.dateObtained}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{t.certificates.modalHint}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCert(null);
                  setIsZoomed(false);
                }}
                className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
              >
                {t.certificates.closeLightbox}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
