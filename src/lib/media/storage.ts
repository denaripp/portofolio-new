import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { put } from "@vercel/blob";

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

/**
 * Validates real magic bytes (buffer header) to prevent disguised malicious files.
 */
export function validateImageMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return true;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return true;
  }

  // WebP: RIFF ... WEBP (bytes 0-3: 52 49 46 46, bytes 8-11: 57 45 42 50)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return true;
  }

  return false;
}

export interface UploadOptions {
  maxWidth?: number;
  quality?: number;
  subfolder?: string;
}

/**
 * Optimizes an uploaded image buffer and saves it to storage.
 * - When BLOB_READ_WRITE_TOKEN is configured: uploads to Vercel Blob Storage and returns public CDN URL.
 * - When BLOB_READ_WRITE_TOKEN is not set (offline development): falls back to local public/uploads/
 */
export async function processAndSaveImage(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<string> {
  const { maxWidth = 1600, quality = 82, subfolder = "general" } = options;

  // 1. Validate magic bytes
  if (!validateImageMagicBytes(buffer)) {
    throw new Error("Tipe file tidak valid. Hanya file JPEG, PNG, dan WebP asli yang diizinkan.");
  }

  // 2. Validate max size
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new Error("Ukuran file melebihi batas maksimum 5MB.");
  }

  // 3. Compress & convert to optimized WebP using Sharp
  const processedBuffer = await sharp(buffer)
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality, effort: 4 })
    .toBuffer();

  // 4. Generate unique, non-colliding filename
  const uniqueId = crypto.randomBytes(8).toString("hex");
  const timestamp = Date.now();
  const filename = `${timestamp}-${uniqueId}.webp`;

  // 5. Check if Vercel Blob token is configured
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken || process.env.VERCEL) {
    // Upload to Vercel Blob Storage
    const blobPath = `${subfolder}/${filename}`;
    const blob = await put(blobPath, processedBuffer, {
      access: "public",
      contentType: "image/webp",
      ...(blobToken ? { token: blobToken } : {}),
    });

    return blob.url;
  }

  // Fallback to local disk storage for offline development
  const uploadsBaseDir = path.join(process.cwd(), "public", "uploads", subfolder);
  await fs.mkdir(uploadsBaseDir, { recursive: true });

  const filePath = path.join(uploadsBaseDir, filename);
  await fs.writeFile(filePath, processedBuffer);

  return `/uploads/${subfolder}/${filename}`;
}
