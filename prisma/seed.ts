import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin (only if no admin exists)
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const adminPassword = await bcrypt.hash("AdminPassword123!", 12);
    const admin = await prisma.admin.create({
      data: {
        username: "admin",
        email: "admin@portfolio.local",
        passwordHash: adminPassword,
        name: "Muhammad Najwa Syarif",
      },
    });
    console.log("Admin seeded:", admin.username);
  } else {
    console.log("Admin already exists. Skipping admin seed to preserve custom password.");
  }

  // 2. Seed Hero
  const heroCount = await prisma.hero.count();
  if (heroCount === 0) {
    await prisma.hero.create({
      data: {
        name: "Muhammad Najwa Syarif",
        profileImage: "/images/profile.png",
        roleId: "Web Developer",
        roleEn: "Web Developer",
        headlineId:
          "Membangun website modern, cepat, dan terukur dengan pengalaman pengguna optimal.",
        headlineEn:
          "Building modern, fast, and scalable web experiences with precision.",
        descriptionId:
          "Spesialis dalam pengembangan frontend & full-stack web application menggunakan Next.js, React, TypeScript, dan arsitektur database modern.",
        descriptionEn:
          "Specializing in modern frontend & full-stack development using Next.js, React, TypeScript, and clean database architectures.",
        primaryCtaTextId: "Lihat Project",
        primaryCtaTextEn: "View Projects",
        primaryCtaUrl: "/projects",
        secondaryCtaTextId: "Hubungi Saya",
        secondaryCtaTextEn: "Contact Me",
        secondaryCtaUrl: "/contact",
      },
    });
    console.log("Hero section seeded.");
  }

  // 3. Seed About
  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        name: "Muhammad Najwa Syarif",
        profileImage: "/images/profile.png",
        bioId:
          "Saya adalah seorang web developer yang berfokus pada pembuatan website modern, clean, dan mudah digunakan. Terbiasa membangun antarmuka web yang responsif, performa tinggi, dan terintegrasi dengan database.",
        bioEn:
          "I am a web developer focused on building modern, clean, and intuitive web solutions. Experienced in developing responsive, high-performance interfaces integrated with modern databases.",
        bioSecondaryId:
          "Dalam setiap project, saya memprioritaskan arsitektur kode yang rapi, kemudahan pemeliharaan, serta performa rendering yang optimal di sisi client maupun server. Saya terbiasa menggunakan ekosistem tools modern, alur kerja kreatif, dan arsitektur database.",
        bioSecondaryEn:
          "In every project, I prioritize clean architectural patterns, maintainability, and optimal rendering performance across both client and server boundaries. I am adept with modern toolings, creative workflows, and database architectures.",
        location: "Indonesia",
        currentEducation: "Informatika / Computer Science",
        status: "Open to Work / Available for Hire",
        email: "najwasyarif@example.com",
        whatsapp: "+6281234567890",
      },
    });
    console.log("About section seeded.");
  }

  // 4. Seed Skills
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: [
        {
          name: "React.js & Next.js",
          icon: "react",
          category: "Development",
          level: "ADVANCED",
          displayOrder: 1,
        },
        {
          name: "TypeScript",
          icon: "typescript",
          category: "Development",
          level: "INTERMEDIATE",
          displayOrder: 2,
        },
        {
          name: "PostgreSQL & Prisma",
          icon: "postgresql",
          category: "Development",
          level: "INTERMEDIATE",
          displayOrder: 3,
        },
        {
          name: "UI/UX & Wireframing (Figma)",
          icon: "figma",
          category: "Design",
          level: "ADVANCED",
          displayOrder: 4,
        },
        {
          name: "Adobe Photoshop & Illustrator",
          icon: "photoshop",
          category: "Design",
          level: "INTERMEDIATE",
          displayOrder: 5,
        },
        {
          name: "Digital Marketing & SEO",
          icon: "marketing",
          category: "Marketing",
          level: "INTERMEDIATE",
          displayOrder: 6,
        },
        {
          name: "Git & Project Management",
          icon: "git",
          category: "Tools & Management",
          level: "ADVANCED",
          displayOrder: 7,
        },
      ],
    });
    console.log("Skills seeded.");
  }

  // 5. Seed Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          titleId: "E-Commerce Management System",
          titleEn: "E-Commerce Management System",
          category: "Web Development",
          descriptionId:
            "Aplikasi e-commerce modern dengan dashboard admin, manajemen katalog produk, dan pelacakan transaksi.",
          descriptionEn:
            "Modern e-commerce platform featuring an intuitive admin dashboard, product catalog management, and transaction tracking.",
          image: "/images/projects/project1.png",
          techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
          demoUrl: "https://demo-ecommerce.example.com",
          githubUrl: "https://github.com/example/ecommerce",
          status: "COMPLETED",
          isFeatured: true,
          displayOrder: 1,
        },
        {
          titleId: "Brand Identity & Design System",
          titleEn: "Brand Identity & Design System",
          category: "UI/UX & Design",
          descriptionId:
            "Perancangan identitas visual brand komprehensif, desain sistem komponen UI, dan panduan gaya visual produk digital.",
          descriptionEn:
            "Comprehensive brand visual identity design, UI component design system, and digital product style guide.",
          image: "/images/projects/project2.png",
          techStack: ["Figma", "Adobe Illustrator", "Photoshop"],
          demoUrl: "https://figma.com",
          githubUrl: null,
          status: "COMPLETED",
          isFeatured: true,
          displayOrder: 2,
        },
      ],
    });
    console.log("Projects seeded.");
  }

  // 6. Seed Certificates
  const certCount = await prisma.certificate.count();
  if (certCount === 0) {
    await prisma.certificate.createMany({
      data: [
        {
          titleId: "Full Stack Web Development Professional",
          titleEn: "Full Stack Web Development Professional",
          organization: "Dicoding Academy & Google Developers",
          image: "/images/certificates/cert1.png",
          descriptionId:
            "Program komprehensif pengembangan web modern mencakup arsitektur frontend, REST API, microservices, dan deployment cloud.",
          descriptionEn:
            "Comprehensive modern web development program covering frontend architecture, REST APIs, and cloud deployment.",
          dateObtained: "2025",
          certificateUrl: "https://example.com/certificate/fullstack-2025",
          isFeatured: true,
          displayOrder: 1,
        },
        {
          titleId: "Advanced React & Next.js Architecture",
          titleEn: "Advanced React & Next.js Architecture",
          organization: "Codepolitan Institute",
          image: "/images/certificates/cert2.png",
          descriptionId:
            "Spesialisasi arsitektur frontend tingkat lanjut, optimasi performa web, server components, dan state management terstruktur.",
          descriptionEn:
            "Specialization in advanced frontend architecture, web performance optimization, and server components.",
          dateObtained: "2024",
          certificateUrl: "https://example.com/certificate/nextjs-arch",
          isFeatured: true,
          displayOrder: 2,
        },
      ],
    });
    console.log("Certificates seeded.");
  }

  // 7. Seed Social Links
  const socialCount = await prisma.socialLink.count();
  if (socialCount === 0) {
    await prisma.socialLink.createMany({
      data: [
        {
          platform: "GitHub",
          icon: "github",
          url: "https://github.com",
          displayOrder: 1,
          isActive: true,
        },
        {
          platform: "LinkedIn",
          icon: "linkedin",
          url: "https://linkedin.com",
          displayOrder: 2,
          isActive: true,
        },
        {
          platform: "WhatsApp",
          icon: "whatsapp",
          url: "https://wa.me/6281234567890",
          displayOrder: 3,
          isActive: true,
        },
        {
          platform: "Email",
          icon: "mail",
          url: "mailto:najwasyarif@example.com",
          displayOrder: 4,
          isActive: true,
        },
      ],
    });
    console.log("Social links seeded.");
  }

  // 8. Seed Footer
  const footerCount = await prisma.footer.count();
  if (footerCount === 0) {
    await prisma.footer.create({
      data: {
        taglineId:
          "Membangun solusi digital modern, responsif, dan terukur dengan dedikasi dan presisi.",
        taglineEn:
          "Crafting modern, responsive digital solutions with passion and precision.",
        copyrightName: "Muhammad Najwa Syarif",
      },
    });
    console.log("Footer section seeded.");
  }

  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
