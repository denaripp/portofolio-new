import { PrismaClient } from "@prisma/client";
import * as fs from "fs/promises";
import * as path from "path";

const prodUrl =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_PRODUCTION ||
  "postgres://b799131a7334bd0c73a1440444675dd68ce9504713049545ad4aba1d722c4f85:sk_G1ZefOVIXYZ3KPeV_GIi1@db.prisma.io:5432/postgres?sslmode=require";

let prisma = new PrismaClient();

async function getWorkingPrisma(): Promise<PrismaClient> {
  try {
    await prisma.$connect();
    await prisma.admin.count();
    return prisma;
  } catch {
    console.log("⚠️ Database lokal tidak terjangkau. Mencoba menghubungkan ke production database...");
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: prodUrl,
        },
      },
    });
    await prisma.$connect();
    return prisma;
  }
}

async function main() {
  console.log("🔄 Memulai backup data database...");

  try {
    const client = await getWorkingPrisma();

    const backupData = {
      timestamp: new Date().toISOString(),
      models: {
        admin: await client.admin.findMany(),
        hero: await client.hero.findMany(),
        about: await client.about.findMany(),
        skill: await client.skill.findMany({ orderBy: { displayOrder: "asc" } }),
        project: await client.project.findMany({ orderBy: { displayOrder: "asc" } }),
        certificate: await client.certificate.findMany({ orderBy: { displayOrder: "asc" } }),
        socialLink: await client.socialLink.findMany({ orderBy: { displayOrder: "asc" } }),
        footer: await client.footer.findMany(),
      },
    };

    const targetFile = path.join(process.cwd(), "backup-sebelum-icon-resolver.dump");
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
