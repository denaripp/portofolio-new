import { PrismaClient } from "@prisma/client";
import * as fs from "fs/promises";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Memulai backup data database...");

  try {
    const backupData = {
      timestamp: new Date().toISOString(),
      models: {
        admin: await prisma.admin.findMany(),
        hero: await prisma.hero.findMany(),
        about: await prisma.about.findMany(),
        skill: await prisma.skill.findMany({ orderBy: { displayOrder: "asc" } }),
        project: await prisma.project.findMany({ orderBy: { displayOrder: "asc" } }),
        certificate: await prisma.certificate.findMany({ orderBy: { displayOrder: "asc" } }),
        socialLink: await prisma.socialLink.findMany({ orderBy: { displayOrder: "asc" } }),
        footer: await prisma.footer.findMany(),
      },
    };

    const targetFile = path.join(process.cwd(), "backup-sebelum-cloud-storage.dump");
    const jsonContent = JSON.stringify(backupData, null, 2);

    await fs.writeFile(targetFile, jsonContent, "utf-8");

    console.log(`✅ Backup database berhasil disimpan di: ${targetFile}`);
    console.log(`📊 Statistik data yang dibackup:`);
    console.log(`   - Admin: ${backupData.models.admin.length}`);
    console.log(`   - Hero: ${backupData.models.hero.length}`);
    console.log(`   - About: ${backupData.models.about.length}`);
    console.log(`   - Skills: ${backupData.models.skill.length}`);
    console.log(`   - Projects: ${backupData.models.project.length}`);
    console.log(`   - Certificates: ${backupData.models.certificate.length}`);
    console.log(`   - Social Links: ${backupData.models.socialLink.length}`);
    console.log(`   - Footer: ${backupData.models.footer.length}`);
  } catch (error) {
    console.error("❌ Gagal membuat backup database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
