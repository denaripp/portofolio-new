import { Locale } from "@/types";

export interface Dictionary {
  common: {
    language: string;
    theme: string;
    loading: string;
    close: string;
  };
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    certificates: string;
    contact: string;
    contactMe: string;
    portfolioBadge: string;
  };
  hero: {
    openToWork: string;
    viewProjects: string;
    contactMe: string;
    specializationLabel: string;
    statusLabel: string;
    roleFallback: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    quickMetaTitle: string;
    location: string;
    education: string;
    status: string;
    professionalProfile: string;
    principlesTitle: string;
    principle1Title: string;
    principle1Desc: string;
    principle2Title: string;
    principle2Desc: string;
    viewProjects: string;
    viewCertificates: string;
    viewMore: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    proficiency: string;
    orderPrefix: string;
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    categoryAll: string;
    toolsLabel: string;
    liveDemo: string;
    sourceCode: string;
    demoUnavailable: string;
    statusCompleted: string;
    statusInProgress: string;
    empty: string;
    emptySub: string;
  };
  certificates: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    viewCertificate: string;
    clickToEnlarge: string;
    dateObtained: string;
    zoomIn: string;
    zoomOut: string;
    verifyLink: string;
    closeLightbox: string;
    empty: string;
    emptySub: string;
    modalHint: string;
    organizer: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    fastResponseTitle: string;
    fastResponseSubtitle: string;
    fastResponseDesc: string;
    directEmail: string;
    whatsappMessenger: string;
    socialPlatformsTitle: string;
    socialPlatformsSubtitle: string;
    managedNote: string;
  };
  cta: {
    badge: string;
    title: string;
    desc: string;
    button: string;
  };
  footer: {
    tagline: string;
    allRightsReserved: string;
  };
  meta: {
    homeTitle: string;
    homeDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    skillsTitle: string;
    skillsDesc: string;
    projectsTitle: string;
    projectsDesc: string;
    certificatesTitle: string;
    certificatesDesc: string;
    contactTitle: string;
    contactDesc: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    common: {
      language: "Bahasa",
      theme: "Tema",
      loading: "Memuat...",
      close: "Tutup",
    },
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      certificates: "Certificates",
      contact: "Contact",
      contactMe: "Hubungi Saya",
      portfolioBadge: "Portofolio",
    },
    hero: {
      openToWork: "Open to Work / Siap Bekerja",
      viewProjects: "Lihat Project",
      contactMe: "Hubungi Saya",
      specializationLabel: "Spesialisasi",
      statusLabel: "Status",
      roleFallback: "Web Developer",
    },
    about: {
      badge: "Biografi & Profil",
      title: "Tentang Saya",
      subtitle:
        "Mengenal lebih dekat latar belakang, filosofi kerja, dan keahlian teknis saya.",
      quickMetaTitle: "Informasi Utama",
      location: "Lokasi",
      education: "Pendidikan",
      status: "Status",
      professionalProfile: "Profil Profesional",
      principlesTitle: "Prinsip Kerja & Nilai",
      principle1Title: "Performa Tinggi & SEO",
      principle1Desc:
        "Aplikasi web dimuat cepat, hemat bandwidth, dan mudah terindeks mesin pencari.",
      principle2Title: "Desain Clean & Human-Centric",
      principle2Desc:
        "Tampilan visual profesional dengan hierarki informasi yang memudahkan recruiter.",
      viewProjects: "Lihat Karya & Project",
      viewCertificates: "Lihat Sertifikat",
      viewMore: "Lihat Lebih Banyak",
    },
    skills: {
      badge: "Keahlian & Kemampuan",
      title: "Keahlian & Tools",
      subtitle:
        "Daftar keahlian, perangkat lunak, metodologi kerja, dan tools profesional yang saya kuasai dan gunakan.",
      viewAll: "Lihat Semua Skills",
      proficiency: "Tingkat Kemahiran",
      orderPrefix: "Urutan #",
      levels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
    },
    projects: {
      badge: "Showcase Portofolio",
      title: "Karya & Project",
      subtitle:
        "Kumpulan karya, studi kasus, dan project yang pernah saya bangun. Klik kartu untuk melihat detail atau mengakses preview karya.",
      viewAll: "Lihat Semua Project",
      categoryAll: "Semua Kategori",
      toolsLabel: "Tools & Teknologi",
      liveDemo: "Live Preview / Karya",
      sourceCode: "Link / Source",
      demoUnavailable: "Preview belum tersedia",
      statusCompleted: "Completed",
      statusInProgress: "In Progress",
      empty: "Belum ada project yang terdaftar.",
      emptySub: "Project baru dapat ditambahkan melalui panel CMS.",
    },
    certificates: {
      badge: "Validasi & Pembelajaran",
      title: "Sertifikat",
      subtitle:
        "Dokumen bukti kelulusan pelatihan, bootcamp, dan program pengembangan skill profesional. Klik sertifikat untuk melihat detail dan memperbesar gambar.",
      viewAll: "Lihat Semua Sertifikat",
      viewCertificate: "Lihat Sertifikat",
      clickToEnlarge: "Klik untuk memperbesar gambar",
      dateObtained: "Tahun Perolehan",
      zoomIn: "Perbesar",
      zoomOut: "Perkecil",
      verifyLink: "Buka Link Verifikasi",
      closeLightbox: "Tutup Lightbox",
      empty: "Belum ada sertifikat yang tersimpan.",
      emptySub: "Sertifikat dapat diunggah melalui panel Admin CMS.",
      modalHint: "Klik tombol close atau klik di luar modal untuk menutup",
      organizer: "Penyelenggara",
    },
    contact: {
      badge: "Mari Terhubung",
      title: "Hubungi Saya",
      subtitle:
        "Saya terbuka untuk diskusi mengenai tawaran posisi full-time, kolaborasi project, konsultasi teknis, atau sekadar bertukar wawasan di bidang web development.",
      fastResponseTitle: "Respon Cepat",
      fastResponseSubtitle: "Channel prioritas untuk recruiter",
      fastResponseDesc:
        "Untuk respon paling cepat, Anda dapat mengirimkan pesan langsung via WhatsApp atau Email bisnis berikut:",
      directEmail: "Email Langsung",
      whatsappMessenger: "WhatsApp Messenger",
      socialPlatformsTitle: "Platform Profesional & Sosial",
      socialPlatformsSubtitle:
        "Kunjungi profil dan portofolio saya di platform berikut:",
      managedNote:
        "Platform di atas dikelola langsung melalui database dan dapat diperbarui secara dinamis dari panel admin CMS.",
    },
    cta: {
      badge: "Tertarik Berkolaborasi?",
      title: "Mari Bangun Sesuatu yang Luar Biasa Bersama",
      desc: "Saya siap untuk peluang kerja full-time, kontrak, maupun project freelance. Hubungi saya melalui channel profesional favorit Anda.",
      button: "Hubungi Saya Sekarang",
    },
    footer: {
      tagline:
        "Membangun antarmuka web modern, responsif, dan fungsional dengan Next.js & PostgreSQL.",
      allRightsReserved: "All rights reserved.",
    },
    meta: {
      homeTitle: "Modern Professional Portfolio | M. Najwa Syarif",
      homeDesc:
        "Portofolio profesional Muhammad Najwa Syarif — Web Developer spesialis Next.js, React, TypeScript, dan PostgreSQL.",
      aboutTitle: "About | Modern Professional Portfolio",
      aboutDesc:
        "Profil lengkap, latar belakang, pendidikan, dan kontak Muhammad Najwa Syarif.",
      skillsTitle: "Skills | Modern Professional Portfolio",
      skillsDesc:
        "Daftar kemampuan teknis, framework, bahasa pemrograman, dan tools yang dikuasai.",
      projectsTitle: "Projects | Modern Professional Portfolio",
      projectsDesc:
        "Portofolio karya dan proyek aplikasi web yang telah dibangun dengan live demo.",
      certificatesTitle: "Certificates | Modern Professional Portfolio",
      certificatesDesc:
        "Sertifikat kursus, bootcamp, dan pelatihan teknis yang pernah diperoleh.",
      contactTitle: "Contact | Modern Professional Portfolio",
      contactDesc:
        "Hubungi Muhammad Najwa Syarif melalui WhatsApp, LinkedIn, Email, dan platform profesional lainnya.",
    },
  },
  en: {
    common: {
      language: "Language",
      theme: "Theme",
      loading: "Loading...",
      close: "Close",
    },
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      certificates: "Certificates",
      contact: "Contact",
      contactMe: "Contact Me",
      portfolioBadge: "Portfolio",
    },
    hero: {
      openToWork: "Open to Work / Available for Hire",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      specializationLabel: "Specialization",
      statusLabel: "Status",
      roleFallback: "Web Developer",
    },
    about: {
      badge: "Biography & Profile",
      title: "About Me",
      subtitle:
        "Get to know my professional background, work philosophy, and core technical capabilities.",
      quickMetaTitle: "Key Information",
      location: "Location",
      education: "Education",
      status: "Status",
      professionalProfile: "Professional Profile",
      principlesTitle: "Work Principles & Values",
      principle1Title: "High Performance & SEO",
      principle1Desc:
        "Fast-loading web applications, optimized asset delivery, and superior search visibility.",
      principle2Title: "Clean & Human-Centric Design",
      principle2Desc:
        "Professional aesthetics with deliberate hierarchy designed for effortless recruiter scanning.",
      viewProjects: "View Projects & Work",
      viewCertificates: "View Certificates",
      viewMore: "View More",
    },
    skills: {
      badge: "Competencies & Capabilities",
      title: "Skills & Tools",
      subtitle:
        "Comprehensive inventory of professional competencies, tools, software, and methods.",
      viewAll: "View All Skills",
      proficiency: "Proficiency Level",
      orderPrefix: "Order #",
      levels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
    },
    projects: {
      badge: "Portfolio Showcase",
      title: "Projects & Works",
      subtitle:
        "A curated collection of projects, case studies, and creative works. Click any card to inspect details or launch the live preview.",
      viewAll: "View All Projects",
      categoryAll: "All Categories",
      toolsLabel: "Tools & Technologies",
      liveDemo: "Live Preview",
      sourceCode: "Link / Source",
      demoUnavailable: "Preview not available",
      statusCompleted: "Completed",
      statusInProgress: "In Progress",
      empty: "No projects registered yet.",
      emptySub: "New projects can be added via the CMS admin panel.",
    },
    certificates: {
      badge: "Validation & Continuous Learning",
      title: "Certificates",
      subtitle:
        "Verified credentials from specialized bootcamps, courses, and technical training. Click any certificate to inspect and zoom inside an interactive lightbox.",
      viewAll: "View All Certificates",
      viewCertificate: "Inspect Certificate",
      clickToEnlarge: "Click to inspect certificate",
      dateObtained: "Date Obtained",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      verifyLink: "Open Verification Link",
      closeLightbox: "Close Lightbox",
      empty: "No certificates recorded yet.",
      emptySub: "Certificates can be uploaded from the CMS panel.",
      modalHint: "Click the close button or click outside the modal to dismiss",
      organizer: "Organization",
    },
    contact: {
      badge: "Let's Connect",
      title: "Contact Me",
      subtitle:
        "I am open to full-time engineering roles, contract work, technical advisory, or collaborating on ambitious digital products.",
      fastResponseTitle: "Fast Response",
      fastResponseSubtitle: "Direct recruiter priority channels",
      fastResponseDesc:
        "For immediate inquiries, feel free to reach out via WhatsApp or business email directly:",
      directEmail: "Direct Email",
      whatsappMessenger: "WhatsApp Messenger",
      socialPlatformsTitle: "Professional & Social Channels",
      socialPlatformsSubtitle:
        "Explore my profiles across professional networks and developer communities:",
      managedNote:
        "The platforms above are managed via PostgreSQL and can be updated anytime from the CMS dashboard.",
    },
    cta: {
      badge: "Interested in Collaborating?",
      title: "Let's Build Something Exceptional Together",
      desc: "Available for full-time opportunities, contracts, or freelance client projects. Reach out via your preferred communication platform.",
      button: "Contact Me Today",
    },
    footer: {
      tagline:
        "Crafting modern, responsive, and high-performance web applications with Next.js & PostgreSQL.",
      allRightsReserved: "All rights reserved.",
    },
    meta: {
      homeTitle: "Modern Professional Portfolio | M. Najwa Syarif",
      homeDesc:
        "Professional portfolio of Muhammad Najwa Syarif — Web Developer specializing in Next.js, React, TypeScript, and PostgreSQL.",
      aboutTitle: "About | Modern Professional Portfolio",
      aboutDesc:
        "Full biography, background, education, and direct contact details of Muhammad Najwa Syarif.",
      skillsTitle: "Skills | Modern Professional Portfolio",
      skillsDesc:
        "Full technical stack, languages, frameworks, and developer tools mastered.",
      projectsTitle: "Projects | Modern Professional Portfolio",
      projectsDesc:
        "Showcase of modern web applications with direct live demo links.",
      certificatesTitle: "Certificates | Modern Professional Portfolio",
      certificatesDesc:
        "Credentials, technical training, and bootcamp certificates achieved.",
      contactTitle: "Contact | Modern Professional Portfolio",
      contactDesc:
        "Get in touch with Muhammad Najwa Syarif via WhatsApp, LinkedIn, Email, or GitHub.",
    },
  },
};
