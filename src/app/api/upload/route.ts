import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { processAndSaveImage, ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/media/storage";

export async function POST(request: NextRequest) {
  // 1. Verify authentication
  const session = await getCurrentAdmin();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Silakan login sebagai admin." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder")?.toString() || "general").toLowerCase();

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File gambar tidak ditemukan dalam request." },
        { status: 400 }
      );
    }

    // Check MIME type declaration
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Format file tidak didukung. Hanya JPEG, PNG, dan WebP yang diizinkan.",
        },
        { status: 400 }
      );
    }

    // Check declared size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: "Ukuran file terlalu besar (Maksimal 5MB).",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamic max width based on purpose
    let maxWidth = 1600;
    if (folder === "profiles") maxWidth = 800;
    if (folder === "skills") maxWidth = 400;

    const url = await processAndSaveImage(buffer, {
      subfolder: folder,
      maxWidth,
      quality: 84,
    });

    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error("[POST /api/upload] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Terjadi kesalahan saat memproses gambar.",
      },
      { status: 500 }
    );
  }
}
