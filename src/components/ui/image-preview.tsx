"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  src: string;
  alt: string;
  /** Classes for the outer centering wrapper. */
  className?: string;
  /** Classes for the <img> element itself. */
  imgClassName?: string;
  /**
   * Max height constraint for the contained image. Defaults to 70vh so the
   * full photo is always visible inside modals/lightboxes without clipping.
   */
  maxHeightClassName?: string;
}

/**
 * Shared image preview used by modals / lightboxes / detail views.
 *
 * The image is rendered with `object-fit: contain` and its natural aspect
 * ratio (`w-auto h-auto`), so it is never force-cropped by a fixed container
 * ratio. Grid/list/card thumbnails should keep using `object-cover` and are
 * intentionally not handled here.
 */
export function ImagePreview({
  src,
  alt,
  className,
  imgClassName,
  maxHeightClassName = "max-h-[70vh]",
}: ImagePreviewProps) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-auto w-auto max-w-full object-contain",
          maxHeightClassName,
          imgClassName
        )}
      />
    </div>
  );
}
