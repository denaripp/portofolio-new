"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "id";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.resume": "Resume",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title": "Vibe Coder Fullstack",
    "hero.subtitle":
      "I help teams ship high-velocity products with confidence through AI-augmented fullstack engineering, clean system architecture, and automated testing.",
    "hero.cta": "Discover more",
    "hero.techstack": "Tech stack",

    // Featured Projects
    "projects.section": "Highlighted projects",
    "projects.headline": "What I've been working on",
    "projects.seeAll": "See all projects",
    "projects.pageTitle": "Selected Works & Case Studies",
    "projects.pageHeading": "Projects built with speed & precision",
    "projects.pageSubtitle":
      "A curated collection of commercial SaaS platforms, QR commerce systems, and automated architectures.",
    "projects.back": "Back to all projects",
    "projects.role": "Role",
    "projects.timeline": "Timeline",
    "projects.year": "Year",
    "projects.livePreview": "Live Preview",
    "projects.sourceCode": "Source Code",
    "projects.challenge": "The Challenge",
    "projects.solution": "How we engineered it",
    "projects.capabilities": "Key Product Capabilities",
    "projects.architecture": "System Architecture & Stack",
    "projects.techUsed": "Technologies Used",
    "projects.next": "Next Case Study",
    "projects.view": "View project",

    // Certificates
    "exp.section": "Certificates",
    "exp.headline": "Certified credentials & licenses",
    "exp.seeFull": "See all certificates & resume",

    // Contact CTA
    "contact.title": "Let's work together",
    "contact.subtitle":
      "Have a product idea or a question about my work? Reach out on WhatsApp and tell me what you have in mind.",
    "contact.cta": "Get in touch",

    // About Page
    "about.title": "About Me",
    "about.heading": "Vibe Coder Fullstack",
    "about.storySection": "Story & Background",
    "about.storyTitle": "Software Engineer & Vibe Coder",
    "about.bioPara1":
      "Hello! I'm Muhammad Najwa Syarif (known as Arif), a Software Engineer and Vibe Coder Fullstack based in Indonesia. I specialize in turning complex product visions and Figma designs into production-ready software with exceptional speed, system architecture, and automated verification.",
    "about.bioPara2":
      "My engineering approach prioritizes clean code and efficiency: combining Next.js, TypeScript, Tailwind CSS, and fluid Framer Motion animations. The result is a web application that is not only visually modern and responsive across all devices, but also lightweight, bloat-free, and easily scalable.",
    "about.bioPara3":
      "As a Vibe Coder, I leverage modern AI-augmented workflows to accelerate the MVP development lifecycle without sacrificing quality: clean system architecture, pixel-perfect 1:1 interfaces, and optimal web performance.",
    "about.location": "Location",
    "about.locationValue": "Indonesia",
    "about.experience": "Experience",
    "about.experienceValue": "2+ Years",
    "about.education": "Education",
    "about.educationValue": "Informatics Engineering",
    "about.status": "Status",
    "about.statusValue": "Available for new projects",
    "about.mindset": "Story & Background",
    "about.mindsetTitle": "Software Engineer & Vibe Coder",
    "about.mindsetPara1":
      "Software development has fundamentally changed. Writing syntax by hand is no longer the bottleneck—system thinking, user empathy, and rigorous verification are.",
    "about.mindsetPara2":
      "As a Vibe Coder Fullstack, I combine AI-augmented engineering workflows with strict fullstack architecture (Next.js, TypeScript, NestJS, PostgreSQL) and automated testing (Playwright). This allows me to turn complex Figma designs and product specs into production-grade software in a fraction of traditional timelines.",
    "about.mindsetPara3":
      "Whether architecting QA automation suites or shipping bespoke commercial products, my focus remains constant: zero bloat, high-contrast clarity, and resilient code that ships on time.",
    "about.toolsHeading": "Tools & Technologies I Ship With",
    "about.drivers": "Core Daily Drivers",

    // Resume Page
    "resume.badge": "Curriculum Vitae",
    "resume.title": "Resume",
    "resume.download": "Download PDF",
    "resume.print": "Print View",
    "resume.workHistory": "Certificates & Licenses",
    "resume.workHeading": "Certified Credentials",
    "resume.selectedOutput": "Selected Engineering Output",
    "resume.featuredSystems": "Featured Production Systems",
    "resume.skills": "Core Competencies",
    "resume.techSkills": "Technical Skills",
    "resume.academic": "Academic Background",
    "resume.education": "Education",

    // Footer
    "footer.explore": "Explore",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",
  },
  id: {
    // Nav
    "nav.home": "Beranda",
    "nav.projects": "Proyek",
    "nav.about": "Tentang",
    "nav.resume": "Resume",

    // Hero
    "hero.greeting": "Halo, saya",
    "hero.title": "Vibe Coder Fullstack",
    "hero.subtitle":
      "Saya membantu tim merilis produk digital berkecepatan tinggi dengan penuh keyakinan melalui rekayasa fullstack bertenaga AI, arsitektur bersih, dan pengujian otomatis.",
    "hero.cta": "Pelajari lebih lanjut",
    "hero.techstack": "Keahlian Teknologi",

    // Featured Projects
    "projects.section": "Proyek Unggulan",
    "projects.headline": "Karya & proyek terbaru saya",
    "projects.seeAll": "Lihat semua proyek",
    "projects.pageTitle": "Koleksi Karya & Studi Kasus",
    "projects.pageHeading": "Proyek yang dibangun dengan cepat & presisi",
    "projects.pageSubtitle":
      "Kumpulan platform SaaS komersial, sistem pemesanan QR mandiri, dan arsitektur pengujian otomatis pilihan.",
    "projects.back": "Kembali ke semua proyek",
    "projects.role": "Peran",
    "projects.timeline": "Durasi",
    "projects.year": "Tahun",
    "projects.livePreview": "Lihat Demo",
    "projects.sourceCode": "Kode Sumber",
    "projects.challenge": "Tantangan Proyek",
    "projects.solution": "Bagaimana Kami Membangunnya",
    "projects.capabilities": "Fitur & Kapabilitas Utama",
    "projects.architecture": "Arsitektur Sistem & Stack",
    "projects.techUsed": "Teknologi yang Digunakan",
    "projects.next": "Studi Kasus Berikutnya",
    "projects.view": "Lihat proyek",

    // Certificates
    "exp.section": "Sertifikat",
    "exp.headline": "Sertifikasi & lisensi resmi",
    "exp.seeFull": "Lihat sertifikat & resume lengkap",

    // Contact CTA
    "contact.title": "Mari berkolaborasi",
    "contact.subtitle":
      "Punya ide produk baru atau pertanyaan tentang karya saya? Hubungi via WhatsApp dan ceritakan rencana Anda.",
    "contact.cta": "Hubungi Saya",

    // About Page
    "about.title": "Tentang Saya",
    "about.heading": "Vibe Coder Fullstack",
    "about.storySection": "Kisah & Latar Belakang",
    "about.storyTitle": "Software Engineer & Vibe Coder",
    "about.bioPara1":
      "Halo! Saya Muhammad Najwa Syarif (akrab disapa Arif), seorang Pengembang Perangkat Lunak & Vibe Coder Fullstack yang berdomisili di Indonesia. Saya berspesialisasi dalam mewujudkan ide produk dan desain Figma menjadi aplikasi web siap produksi dengan kecepatan tinggi, arsitektur sistem yang rapi, dan verifikasi otomatis.",
    "about.bioPara2":
      "Pendekatan rekayasa saya mengutamakan clean code dan efisiensi: mengombinasikan ekosistem Next.js, TypeScript, Tailwind CSS, serta sentuhan animasi Framer Motion yang halus. Hasilnya adalah website yang tidak hanya berpenampilan modern dan responsif di semua perangkat, tetapi juga ringan tanpa bloatware serta mudah dikembangkan ke depan.",
    "about.bioPara3":
      "Sebagai Vibe Coder, saya memanfaatkan alur kerja modern berbasis AI untuk mempercepat siklus pembuatan MVP tanpa mengorbankan kualitas: arsitektur sistem tetap rapi, antarmuka presisi 1:1, dan performa web optimal.",
    "about.location": "Lokasi",
    "about.locationValue": "Indonesia",
    "about.experience": "Pengalaman",
    "about.experienceValue": "2+ Tahun",
    "about.education": "Pendidikan",
    "about.educationValue": "Teknik Informatika",
    "about.status": "Status",
    "about.statusValue": "Terbuka untuk proyek & kolaborasi",
    "about.mindset": "Kisah & Latar Belakang",
    "about.mindsetTitle": "Software Engineer & Vibe Coder",
    "about.mindsetPara1":
      "Pengembangan perangkat lunak telah bertransformasi. Menulis sintaks manual bukan lagi hambatan utama—pemikiran sistemik, empati pengguna, dan verifikasi kualitas yang ketat adalah kuncinya.",
    "about.mindsetPara2":
      "Sebagai Vibe Coder Fullstack, saya memadukan alur kerja bertenaga AI dengan arsitektur fullstack yang kokoh (Next.js, TypeScript, NestJS, PostgreSQL) dan otomatisasi pengujian (Playwright). Ini memungkinkan saya mengubah desain Figma rumit menjadi software produksi dalam hitungan hari.",
    "about.mindsetPara3":
      "Baik membangun rangkaian otomatisasi QA maupun merilis produk komersial mandiri, fokus saya tetap konsisten: zero bloat, kontras visual yang elegan, dan kode andal yang rilis tepat waktu.",
    "about.toolsHeading": "Alat & Teknologi yang Saya Gunakan",
    "about.drivers": "Teknologi Andalan Harian",

    // Resume Page
    "resume.badge": "Curriculum Vitae",
    "resume.title": "Resume",
    "resume.download": "Unduh PDF",
    "resume.print": "Cetak Resume",
    "resume.workHistory": "Sertifikat & Lisensi",
    "resume.workHeading": "Sertifikasi & Lisensi Resmi",
    "resume.selectedOutput": "Hasil Rekayasa Pilihan",
    "resume.featuredSystems": "Sistem Produksi Unggulan",
    "resume.skills": "Kompetensi Inti",
    "resume.techSkills": "Keahlian Teknis",
    "resume.academic": "Latar Belakang Pendidikan",
    "resume.education": "Pendidikan Formal",

    // Footer
    "footer.explore": "Jelajahi",
    "footer.connect": "Terhubung",
    "footer.rights": "Hak cipta dilindungi undang-undang.",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    if (saved === "en" || saved === "id") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => {
      const next: Language = prev === "en" ? "id" : "en";
      localStorage.setItem("portfolio_lang", next);
      return next;
    });
  };

  const t = (key: string): string => {
    const currentLang = mounted ? lang : "en";
    return translations[currentLang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang: mounted ? lang : "en",
        toggleLang,
        setLang,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
