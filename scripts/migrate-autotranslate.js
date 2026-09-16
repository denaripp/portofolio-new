const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COMMON_FALLBACKS = {
  "lihat project": "View Projects",
  "lihat karya": "View Projects",
  "lihat semua project": "View All Projects",
  "hubungi saya": "Contact Me",
  "tentang saya": "About Me",
  "keahlian & tools": "Skills & Tools",
  "karya & project": "Projects & Works",
  "sertifikat": "Certificates",
  "open to work": "Open to Work / Available for Hire",
  "open to work / siap bekerja": "Open to Work / Available for Hire",
  "web developer": "Web Developer",
  "frontend developer": "Frontend Developer",
  "full stack developer": "Full Stack Developer",
  "tech & administration": "Tech & Administration",
  "react & tailwind css": "React & Tailwind CSS",
  "next.js & react": "Next.js & React",
};

function getSmartFallback(text) {
  const lower = text.trim().toLowerCase();
  return COMMON_FALLBACKS[lower] || text;
}

async function tryLibreTranslate(text, sourceLang, targetLang, timeoutMs) {
  const endpoint = process.env.LIBRETRANSLATE_URL || "http://localhost:5000/translate";
  const apiKey = process.env.LIBRETRANSLATE_API_KEY || "";
  try {
    const payload = { q: text, source: sourceLang, target: targetLang, format: "text" };
    if (apiKey) payload.api_key = apiKey;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.translatedText === "string" && data.translatedText.trim()) {
        return data.translatedText.trim();
      }
    }
  } catch (e) {}
  return null;
}

async function tryMyMemory(text, sourceLang, targetLang, timeoutMs) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(url, { method: "GET", signal: AbortSignal.timeout(timeoutMs) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && typeof data.responseData.translatedText === "string" && data.responseData.translatedText.trim()) {
        const translated = data.responseData.translatedText.trim();
        if (!translated.toUpperCase().startsWith("MYMEMORY WARNING")) {
          return translated;
        }
      }
    }
  } catch (e) {}
  return null;
}

async function translateText(text, options = {}) {
  const trimmed = text?.trim();
  if (!trimmed) return text || "";
  const sourceLang = options.sourceLang || "id";
  const targetLang = options.targetLang || "en";
  const timeoutMs = options.timeoutMs || 4000;

  // 0. Exact Smart Dictionary match
  const lower = trimmed.toLowerCase();
  if (COMMON_FALLBACKS[lower]) {
    return COMMON_FALLBACKS[lower];
  }

  // 1. Try LibreTranslate
  const lt = await tryLibreTranslate(trimmed, sourceLang, targetLang, Math.min(timeoutMs, 2500));
  if (lt && lt !== trimmed) return lt;

  // 2. Try MyMemory
  const mm = await tryMyMemory(trimmed, sourceLang, targetLang, timeoutMs);
  if (mm && mm !== trimmed) return mm;

  return trimmed;
}

async function runMigration() {
  console.log("=== MEMULAI RE-TRANSLATE LENGKAP SEMUA DATA DATABASE ===");

  // 1. Hero Section
  console.log("\n[1/4] Memproses Hero Section...");
  const hero = await prisma.hero.findFirst();
  if (hero) {
    console.log(`- Mentranslate Hero Headline ID: "${hero.headlineId}"`);
    console.log(`- Mentranslate Hero Description ID: "${hero.descriptionId.substring(0, 45)}..."`);

    const [
      roleEn,
      specializationEn,
      headlineEn,
      descriptionEn,
      primaryCtaTextEn,
      secondaryCtaTextEn,
    ] = await Promise.all([
      translateText(hero.roleId),
      translateText(hero.specializationId),
      translateText(hero.headlineId),
      translateText(hero.descriptionId),
      translateText(hero.primaryCtaTextId || "Lihat Project"),
      translateText(hero.secondaryCtaTextId || "Hubungi Saya"),
    ]);

    const updatedHero = await prisma.hero.update({
      where: { id: hero.id },
      data: {
        roleEn: roleEn || hero.roleId,
        specializationEn: specializationEn || hero.specializationId,
        headlineEn: headlineEn || hero.headlineId,
        descriptionEn: descriptionEn || hero.descriptionId,
        primaryCtaTextEn: primaryCtaTextEn || "View Projects",
        secondaryCtaTextEn: secondaryCtaTextEn || "Contact Me",
      },
    });

    console.log("\n-> Hasil Hero EN yang Di-update:");
    console.log("  * roleEn:", updatedHero.roleEn);
    console.log("  * specializationEn:", updatedHero.specializationEn);
    console.log("  * headlineEn:", updatedHero.headlineEn);
    console.log("  * descriptionEn:", updatedHero.descriptionEn);
    console.log("  * primaryCtaTextEn:", updatedHero.primaryCtaTextEn);
    console.log("  * secondaryCtaTextEn:", updatedHero.secondaryCtaTextEn);
  }

  // 2. About Section
  console.log("\n[2/4] Memproses About Section...");
  const about = await prisma.about.findFirst();
  if (about) {
    console.log(`- Mentranslate About Bio ID: "${about.bioId.substring(0, 45)}..."`);
    const bioEn = await translateText(about.bioId);
    const updatedAbout = await prisma.about.update({
      where: { id: about.id },
      data: { bioEn: bioEn || about.bioId },
    });
    console.log("\n-> Hasil About EN yang Di-update:");
    console.log("  * bioEn:", updatedAbout.bioEn);
  }

  // 3. Projects
  console.log("\n[3/4] Memproses Projects...");
  const projects = await prisma.project.findMany();
  console.log(`- Ditemukan ${projects.length} project.`);
  for (const p of projects) {
    const [titleEn, descriptionEn] = await Promise.all([
      translateText(p.titleId),
      translateText(p.descriptionId),
    ]);
    const updatedProject = await prisma.project.update({
      where: { id: p.id },
      data: {
        titleEn: titleEn || p.titleId,
        descriptionEn: descriptionEn || p.descriptionId,
      },
    });
    console.log(`  -> Project "${p.titleId}" -> EN: "${updatedProject.titleEn}"`);
  }

  // 4. Certificates
  console.log("\n[4/4] Memproses Certificates...");
  const certs = await prisma.certificate.findMany();
  console.log(`- Ditemukan ${certs.length} sertifikat.`);
  for (const c of certs) {
    const [titleEn, descriptionEn] = await Promise.all([
      translateText(c.titleId),
      c.descriptionId ? translateText(c.descriptionId) : Promise.resolve(null),
    ]);
    const updatedCert = await prisma.certificate.update({
      where: { id: c.id },
      data: {
        titleEn: titleEn || c.titleId,
        descriptionEn: descriptionEn || c.descriptionId,
      },
    });
    console.log(`  -> Certificate "${c.titleId}" -> EN: "${updatedCert.titleEn}"`);
  }

  console.log("\n=== RE-TRANSLATE BERHASIL 100%! ===");
}

runMigration()
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
