export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Resolves the natural aspect ratio (width / height) of an image so the crop
 * editor can present the full, uncropped photo instead of forcing a fixed frame.
 */
export async function getImageAspectRatio(imageSrc: string): Promise<number> {
  const image = await createImage(imageSrc);
  if (!image.naturalWidth || !image.naturalHeight) return 1;
  return image.naturalWidth / image.naturalHeight;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * Crops and rotates an image from source URL based on exact pixel coordinates
 * and returns a WebP Blob and Object URL.
 *
 * NOTE: Supports negative pixelCrop coordinates (e.g. when zooming out below 1x
 * or letterboxing) with 100% WYSIWYG precision by drawing source canvas at
 * (-pixelCrop.x, -pixelCrop.y) on destination canvas without clipping.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation = 0
): Promise<{ blob: Blob; url: string }> {
  const image = await createImage(imageSrc);
  const rotRad = getRadianAngle(rotation);

  // 1. Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.naturalWidth || image.width,
    image.naturalHeight || image.height,
    rotation
  );

  // 2. Intermediate canvas to apply rotation
  const rotCanvas = document.createElement("canvas");
  rotCanvas.width = Math.max(1, Math.round(bBoxWidth));
  rotCanvas.height = Math.max(1, Math.round(bBoxHeight));
  const rotCtx = rotCanvas.getContext("2d");

  if (!rotCtx) {
    throw new Error("Tidak dapat menginisialisasi canvas rendering context.");
  }

  // Draw rotated image centered in bounding box
  rotCtx.translate(rotCanvas.width / 2, rotCanvas.height / 2);
  rotCtx.rotate(rotRad);
  rotCtx.translate(
    -(image.naturalWidth || image.width) / 2,
    -(image.naturalHeight || image.height) / 2
  );
  rotCtx.drawImage(image, 0, 0);

  // 3. Final cropped output canvas
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Tidak dapat menginisialisasi cropped canvas.");
  }

  const targetWidth = Math.max(1, Math.round(pixelCrop.width));
  const targetHeight = Math.max(1, Math.round(pixelCrop.height));

  croppedCanvas.width = targetWidth;
  croppedCanvas.height = targetHeight;

  // Clear background (preserves PNG/SVG transparency)
  croppedCtx.clearRect(0, 0, targetWidth, targetHeight);
  croppedCtx.imageSmoothingEnabled = true;
  croppedCtx.imageSmoothingQuality = "high";

  // 4. Draw rotated image onto cropped canvas using offset positioning.
  // Drawing at (-pixelCrop.x, -pixelCrop.y) ensures mathematically exact
  // alignment across all zoom levels (including zoom out < 1x).
  croppedCtx.drawImage(
    rotCanvas,
    Math.round(-pixelCrop.x),
    Math.round(-pixelCrop.y)
  );

  // 5. Return as WebP Blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Gagal mengonversi canvas ke Blob."));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      },
      "image/webp",
      0.95
    );
  });
}
