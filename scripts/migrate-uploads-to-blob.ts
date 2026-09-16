import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import * as fs from "fs/promises";
import * as path from "path";

const prisma = new PrismaClient();

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function uploadLocalFileToBlob(localRelativePath: string): Promise<string | null> {
  // Normalize path
  const cleanPath = localRelativePath.startsWith("/")
    ? localRelativePath.slice(1)
    : localRelativePath;

  // Path inside public/
  const fullPath = path.join(process.cwd(), "public", cleanPath);

  if (!(await fileExists(fullPath))) {
    console.warn(`  ⚠️ File tidak ditemukan di disk lokal: ${fullPath}`);
    return null;
  }

  const fileBuffer = await fs.readFile(fullPath);
  
  // Extract clean blob pathname: e.g. "uploads/skills/xxx.webp" -> "skills/xxx.webp"
  const blobPathname = cleanPath.startsWith("uploads/")
    ? cleanPath.replace(/^uploads\//, "")
    : cleanPath;

  const blob = await put(blobPathname, fileBuffer, {
    access: "public",
    contentType: "image/webp",
  });

  return blob.url;
}

async function main() {
  console.log("=======================================================");
  console.log("🚀 MEMULAI MIGRASI GAMBAR DARI LOKAL KE VERCEL BLOB");
  console.log("=======================================================\n");

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("❌ ERROR: Environment variable BLOB_READ_WRITE_TOKEN tidak ditemukan!");
    console.error("👉 Silakan set BLOB_READ_WRITE_TOKEN di file .env sebelum menjalankan migrasi.");
    console.error("   Contoh: BLOB_READ_WRITE_TOKEN=\"vercel_blob_rw_...\"\n");
    process.exit(1);
  }

  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  // 1. Migrate Hero profile image
  console.log("1️⃣ Memeriksa tabel Hero...");
  const heroes = await prisma.hero.findMany();
  for (const hero of heroes) {
    if (hero.profileImage && hero.profileImage.startsWith("/uploads/")) {
      console.log(`   Mengunggah gambar Hero (${hero.name}): ${hero.profileImage}`);
      const blobUrl = await uploadLocalFileToBlob(hero.profileImage);
      if (blobUrl) {
        await prisma.hero.update({
          where: { id: hero.id },
          data: { profileImage: blobUrl },
        });
        console.log(`   ✅ Berhasil -> ${blobUrl}`);
        totalMigrated++;
      } else {
        totalFailed++;
      }
    } else {
      totalSkipped++;
    }
  }

  // 2. Migrate About profile image
  console.log("\n2️⃣ Memeriksa tabel About...");
  const abouts = await prisma.about.findMany();
  for (const about of abouts) {
    if (about.profileImage && about.profileImage.startsWith("/uploads/")) {
      console.log(`   Mengunggah gambar About (${about.name}): ${about.profileImage}`);
      const blobUrl = await uploadLocalFileToBlob(about.profileImage);
      if (blobUrl) {
        await prisma.about.update({
          where: { id: about.id },
          data: { profileImage: blobUrl },
        });
        console.log(`   ✅ Berhasil -> ${blobUrl}`);
        totalMigrated++;
      } else {
        totalFailed++;
      }
    } else {
      totalSkipped++;
    }
  }

  // 3. Migrate Skills icons
  console.log("\n3️⃣ Memeriksa tabel Skill...");
  const skills = await prisma.skill.findMany();
  for (const skill of skills) {
    if (skill.icon && skill.icon.startsWith("/uploads/")) {
      console.log(`   Mengunggah icon Skill (${skill.name}): ${skill.icon}`);
      const blobUrl = await uploadLocalFileToBlob(skill.icon);
      if (blobUrl) {
        await prisma.skill.update({
          where: { id: skill.id },
          data: { icon: blobUrl },
        });
        console.log(`   ✅ Berhasil -> ${blobUrl}`);
        totalMigrated++;
      } else {
        totalFailed++;
      }
    } else {
      totalSkipped++;
    }
  }

  // 4. Migrate Projects images
  console.log("\n4️⃣ Memeriksa tabel Project...");
  const projects = await prisma.project.findMany();
  for (const project of projects) {
    if (project.image && project.image.startsWith("/uploads/")) {
      console.log(`   Mengunggah gambar Project (${project.titleEn || project.titleId}): ${project.image}`);
      const blobUrl = await uploadLocalFileToBlob(project.image);
      if (blobUrl) {
        await prisma.project.update({
          where: { id: project.id },
          data: { image: blobUrl },
        });
        console.log(`   ✅ Berhasil -> ${blobUrl}`);
        totalMigrated++;
      } else {
        totalFailed++;
      }
    } else {
      totalSkipped++;
    }
  }

  // 5. Migrate Certificates images
  console.log("\n5️⃣ Memeriksa tabel Certificate...");
  const certificates = await prisma.certificate.findMany();
  for (const cert of certificates) {
    if (cert.image && cert.image.startsWith("/uploads/")) {
      console.log(`   Mengunggah gambar Certificate (${cert.titleEn || cert.titleId}): ${cert.image}`);
      const blobUrl = await uploadLocalFileToBlob(cert.image);
      if (blobUrl) {
        await prisma.certificate.update({
          where: { id: cert.id },
          data: { image: blobUrl },
        });
        console.log(`   ✅ Berhasil -> ${blobUrl}`);
        totalMigrated++;
      } else {
        totalFailed++;
      }
    } else {
      totalSkipped++;
    }
  }

  console.log("\n=======================================================");
  console.log("🎉 REKAPITULASI MIGRASI VERCEL BLOB");
  console.log("=======================================================");
  console.log(`✅ Gambar berhasil dimigrasi & diupdate ke DB : ${totalMigrated}`);
  console.log(`⏩ Gambar dilewati (sudah cloud URL / kosong)  : ${totalSkipped}`);
  console.log(`❌ Gambar gagal dimigrasi (file missing)       : ${totalFailed}`);
  console.log("=======================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Kesalahan fatal saat proses migrasi:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
