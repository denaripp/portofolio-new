export interface TechItem {
  id: string;
  name: string;
  logo: string;
  category: "Frontend" | "Backend" | "Database & Cloud" | "Testing & Tools";
}

export interface ProjectItem {
  slug: string;
  title: string;
  year: string;
  category: "Landing Page" | "Multi Page" | "Full Stack" | "Marketplace" | "UI/UX" | string;
  categories?: string[];
  featured: boolean;
  summary: string;
  description: string;
  role: string;
  duration: string;
  clientOrContext: string;
  coverImage?: string;
  coverVariant?: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  challengeTitle?: string;
  challenge: string;
  solutionTitle?: string;
  solution: string;
  keyFeatures: string[];
  architectureHighlights: string[];
  metrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  employmentType: string;
  period: string;
  location?: string;
  logoVariant?: "baznas" | "lumi" | "nbs" | string;
  logoImage?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const TECH_LOGO_MAP: Record<string, string> = {
  laravel: "/assets/tech/laravel.svg",
  playwright: "/assets/tech/playwright.svg",
  "node.js": "/assets/tech/nodejs.svg",
  nodejs: "/assets/tech/nodejs.svg",
  typescript: "/assets/tech/typescript.svg",
  "type script": "/assets/tech/typescript.svg",
  "next.js": "/assets/tech/nextjs.svg",
  nextjs: "/assets/tech/nextjs.svg",
  react: "/assets/tech/react.svg",
  vite: "/assets/tech/vite.svg",
  kotlin: "/assets/tech/kotlin.svg",
  nestjs: "/assets/tech/nestjs.svg",
  postgresql: "/assets/tech/postgresql.svg",
  prisma: "/assets/tech/prisma.svg",
  supabase: "/assets/tech/supabase.svg",
  "tailwind css": "/assets/tech/tailwindcss.svg",
  tailwindcss: "/assets/tech/tailwindcss.svg",
  figma: "/assets/tech/figma.svg",
  zustand: "/assets/tech/zustand.svg",
  docker: "/assets/tech/docker.svg",
  git: "/assets/tech/git.svg",
  github: "/assets/tech/github.svg",
  postman: "/assets/tech/postman.svg",
  "ci/cd": "/assets/tech/cicd.svg",
  "agile qa": "/assets/tech/playwright.svg",
  html: "/assets/tech/html.svg",
  javascript: "/assets/tech/javascript.svg",
  "java script": "/assets/tech/javascript.svg",
  js: "/assets/tech/javascript.svg",
  vercel: "/assets/tech/vercel.svg",
  python: "/assets/tech/python.svg",
  wordpress: "/assets/tech/wordpress.svg",
};

export function getTechLogo(techNameOrId: string): string {
  const key = techNameOrId.trim().toLowerCase();
  return TECH_LOGO_MAP[key] || "/assets/tech/nextjs.svg";
}

export const portfolioData = {
  profile: {
    firstName: "Arif",
    fullName: "Muhammad Najwa Syarif",
    monogram: "A",
    logo: "/assets/logo.svg",
    role: "Vibe Coder Fullstack",
    secondaryRole: "Full Stack Developer & System Architect",
    heroHeadlinePrefix: "Hi, I'm",
    heroHighlightName: "Arip",
    heroTitle: "Vibe Coder Fullstack",
    heroSubheadline:
      "I help teams ship high-velocity products with confidence through AI-augmented fullstack engineering, clean system architecture, and automated testing.",
    shortBio:
      "Building reliable fullstack systems, high-converting interfaces, and useful digital products at lightspeed.",
    location: "Indonesia",
    email: "muhammadnajwasyarif@gmail.com",
    whatsappNumber: "6283150684755",
    whatsappMessage:
      "Halo! Saya melihat website portofolio Anda dan tertarik untuk berdiskusi mengenai project / kolaborasi.",
    socials: {
      github: "https://github.com/denaripp",
      linkedin: "https://www.linkedin.com/in/muhammad-najwa-syarif-895aa1359/",
    },
    avatar: "/assets/profile.png",
    aboutAvatar: "/assets/about-profile.webp",
    statusText: "Available for new projects",
    experienceYears: "2+ Years",
    resumeUpdated: "November 2026",
  },

  techStack: [
    {
      id: "playwright",
      name: "Playwright",
      logo: "/assets/tech/playwright.svg",
      category: "Testing & Tools",
    },
    {
      id: "nodejs",
      name: "Node.js",
      logo: "/assets/tech/nodejs.svg",
      category: "Backend",
    },
    {
      id: "typescript",
      name: "TypeScript",
      logo: "/assets/tech/typescript.svg",
      category: "Frontend",
    },
    {
      id: "nextjs",
      name: "Next.js",
      logo: "/assets/tech/nextjs.svg",
      category: "Frontend",
    },
    {
      id: "react",
      name: "React",
      logo: "/assets/tech/react.svg",
      category: "Frontend",
    },
    {
      id: "vite",
      name: "Vite",
      logo: "/assets/tech/vite.svg",
      category: "Frontend",
    },
    {
      id: "laravel",
      name: "Laravel",
      logo: "/assets/tech/laravel.svg",
      category: "Backend",
    },
    {
      id: "kotlin",
      name: "Kotlin",
      logo: "/assets/tech/kotlin.svg",
      category: "Backend",
    },
    {
      id: "nestjs",
      name: "NestJS",
      logo: "/assets/tech/nestjs.svg",
      category: "Backend",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      logo: "/assets/tech/postgresql.svg",
      category: "Database & Cloud",
    },
    {
      id: "prisma",
      name: "Prisma",
      logo: "/assets/tech/prisma.svg",
      category: "Database & Cloud",
    },
    {
      id: "supabase",
      name: "Supabase",
      logo: "/assets/tech/supabase.svg",
      category: "Database & Cloud",
    },
    {
      id: "tailwindcss",
      name: "Tailwind CSS",
      logo: "/assets/tech/tailwindcss.svg",
      category: "Frontend",
    },
    {
      id: "figma",
      name: "Figma",
      logo: "/assets/tech/figma.svg",
      category: "Testing & Tools",
    },
    {
      id: "zustand",
      name: "Zustand",
      logo: "/assets/tech/zustand.svg",
      category: "Frontend",
    },
    {
      id: "docker",
      name: "Docker",
      logo: "/assets/tech/docker.svg",
      category: "Database & Cloud",
    },
    {
      id: "postman",
      name: "Postman",
      logo: "/assets/tech/postman.svg",
      category: "Testing & Tools",
    },
    {
      id: "git",
      name: "Git",
      logo: "/assets/tech/git.svg",
      category: "Testing & Tools",
    },
  ] as TechItem[],

  // =========================================================================
  // PROJECTS LIST
  // Untuk menambah proyek baru, cukup copy-paste satu blok objek di bawah ini.
  // Gambar bisa ditaruh di folder public/assets/projects/{slug}.png
  // atau tentukan path kustom di coverImage: "/assets/projects/nama-file.png"
  // =========================================================================
  projects: [
    {
      slug: "nusastay",
      title: "NusaStay — Website Penginapan Boutique",
      year: "2026",
      category: "Multi Page",
      categories: ["Multi Page"],
      featured: true,
      summary:
        "NusaStay adalah website penginapan boutique di Klaten, Jawa Tengah dengan alur reservasi cepat via WhatsApp.",
      description:
        "NusaStay adalah website penginapan boutique di Klaten, Jawa Tengah. Website ini membantu calon tamu melihat pilihan kamar, fasilitas, galeri, dan lokasi, lalu mengajukan reservasi dengan cepat melalui integrasi alur WhatsApp.",
      role: "Fullstack Developer & AI-Augmented Builder",
      duration: "2026",
      clientOrContext: "NusaStay Boutique Lodging",
      coverImage: "/assets/projects/nusastay.webp",
      techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "GitHub",
        "Vercel",
      ],
      liveUrl: "https://nusastay.vercel.app/",
      repoUrl: "https://github.com/denaripp/nusastay---dummy-project",
      challengeTitle: "Reservasi Cepat & Ramah Tamu",
      challenge:
        "Penginapan boutique membutuhkan media presentasi visual yang menarik untuk kamar dan fasilitasnya, sekaligus cara termudah bagi calon tamu untuk melakukan konfirmasi ketersediaan kamar tanpa friksi pembayaran di muka yang rumit.",
      solutionTitle: "Alur Terintegrasi WhatsApp",
      solution:
        "Membangun website modern dengan Next.js yang memuat galeri kamar secara interaktif dan menyediakan form pemesanan langsung yang memformat pesan otomatis ke nomor WhatsApp pengelola.",
      keyFeatures: [
        "Showcase Kamar & Fasilitas Interaktif",
        "Direct WhatsApp Reservation Flow",
        "Peta Lokasi & Informasi Akomodasi Lengkap",
        "Desain Mobile-First & Responsif Cepat",
      ],
      architectureHighlights: [
        "Next.js App Router dengan performa rendering optimal",
        "Tailwind CSS dengan palet desain hospitality yang hangat",
        "Deep link generator ke WhatsApp API tanpa perantara pihak ketiga",
      ],
      metrics: [
        { label: "Platform", value: "Next.js" },
        { label: "Status", value: "Completed" },
        { label: "Deployment", value: "Vercel" },
      ],
    },
    {
      slug: "corelabb",
      title: "Corelabb - Landing Page IT SERCVICE",
      year: "2025",
      category: "Landing Page",
      categories: ["Landing Page"],
      featured: true,
      summary:
        "Website company profile untuk Corelab, penyedia layanan IT seperti software development, konsultasi teknologi, dan solusi digital.",
      description:
        "Website company profile untuk Corelab, penyedia layanan IT seperti pengembangan software, konsultasi teknologi, dan solusi digital untuk bisnis dengan tampilan modern dan profesional.",
      role: "Frontend Developer",
      duration: "2025",
      clientOrContext: "Corelabb IT Services",
      coverImage: "/assets/projects/corelabb.webp",
      techStack: [
        "Tailwind CSS",
        "JavaScript",
        "HTML",
        "GitHub",
      ],
      liveUrl: "https://corelab2.netlify.app/",
      repoUrl: "https://github.com/denaripp/corelabb",
      challengeTitle: "Kredibilitas Layanan Digital",
      challenge:
        "Agensi penyedia solusi IT membutuhkan etalase digital yang menonjolkan profesionalitas, portofolio teknologi, dan cakupan layanan pengembangan software secara ringkas dan meyakinkan.",
      solutionTitle: "Landing Page Modern & Interaktif",
      solution:
        "Mengembangkan landing page company profile berkecepatan tinggi dengan Tailwind CSS yang menyajikan daftar layanan IT, keunggulan teknologi, dan tombol konsultasi langsung.",
      keyFeatures: [
        "Daftar Layanan Solusi Digital & Software",
        "Tampilan Kredibel dengan Tema IT Modern",
        "Direct Consultation Call to Action",
        "Akses Cepat & Ringan di Semua Perangkat",
      ],
      architectureHighlights: [
        "Struktur HTML5 semantik dan performa loading instan",
        "Tailwind CSS utility-first styling yang rapi",
        "Continuous deployment otomatis via Netlify",
      ],
      metrics: [
        { label: "Stack", value: "Tailwind CSS" },
        { label: "Status", value: "Completed" },
        { label: "Hosting", value: "Netlify" },
      ],
    },
    {
      slug: "bounie-bread",
      title: "Bouniebread - Website Catering Kue",
      year: "2025",
      category: "Multi Page",
      categories: ["Multi Page", "Marketplace"],
      featured: true,
      summary:
        "Website company profile untuk Bounie Bread, bisnis catering & bakery yang menampilkan menu, paket catering, dan pemesanan online.",
      description:
        "Website company profile untuk Bounie Bread, bisnis catering & bakery yang menampilkan menu, paket catering, dan sistem pemesanan online dengan navigasi yang responsif.",
      role: "Frontend Developer",
      duration: "2025",
      clientOrContext: "Bounie Bread Bakery & Catering",
      coverImage: "/assets/projects/bouniebread.webp",
      techStack: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "GitHub",
        "Vercel",
      ],
      liveUrl: "https://bounie-bread.vercel.app/",
      repoUrl: "https://github.com/denaripp/bounie-bread",
      challengeTitle: "Digitalisasi Katalog Bakery",
      challenge:
        "Bisnis bakery & catering rumahan memerlukan media digital untuk memajang varian roti dan paket pesanan partai besar tanpa harus mengirim foto katalog manual berulang kali.",
      solutionTitle: "Katalog Digital Terstruktur",
      solution:
        "Membangun website katalog online yang menampilkan ragam pilihan roti, daftar harga paket catering, serta akses langsung bagi pelanggan untuk memesan secara daring.",
      keyFeatures: [
        "Katalog Menu Bakery & Varian Kue",
        "Paket Catering untuk Berbagai Acara",
        "Tombol Pemesanan Online Cepat",
        "Desain Bersih & Navigasi Mudah",
      ],
      architectureHighlights: [
        "Lightweight static web architecture tanpa dependensi berat",
        "Optimasi aset gambar kue dalam format modern",
        "Hosting gratis berkecepatan tinggi di Vercel",
      ],
      metrics: [
        { label: "Kategori", value: "F&B Catering" },
        { label: "Status", value: "Completed" },
        { label: "Deployment", value: "Vercel" },
      ],
    },
  ] as ProjectItem[],

  experiences: [
    {
      id: "cert-1",
      role: "User Interface Design",
      organization: "Special Skill Indonesia",
      employmentType: "Sertifikasi Resmi",
      period: "2025",
      location: "Indonesia",
      logoImage: "/assets/certificates/cert-1-user-interface-design.webp",
      summary:
        "Memahami dasar User Interface (UI) Design: prinsip desain visual, tipografi, color theory, layout & grid, serta prototyping. Dilengkapi praktik merancang antarmuka aplikasi & website menggunakan tools desain modern.",
      highlights: [
        "Prinsip desain visual, typography, color theory, layout & grid hierarchy.",
        "Prototyping & wireframing antarmuka web dan aplikasi mobile.",
        "Perancangan UI kit & desain komponen antarmuka yang terstruktur.",
      ],
      technologies: ["Figma"],
    },
    {
      id: "cert-2",
      role: "HCIA-AI V4.0 Course",
      organization: "Huawei ICT Academy",
      employmentType: "Sertifikasi Resmi",
      period: "2025",
      location: "Huawei ICT Academy",
      logoImage: "/assets/certificates/cert-2-hcia-ai-v4-0-course.webp",
      summary:
        "Sertifikasi resmi Huawei ICT tingkat associate untuk Artificial Intelligence. Mencakup: konsep dasar AI & machine learning, neural network & deep learning, TensorFlow & MindSpore, computer vision, natural language processing (NLP), serta pengenalan large language model (LLM) & generative AI. Dilengkapi praktik menggunakan platform Huawei ModelArts.",
      highlights: [
        "Konsep fundamental AI, machine learning, deep learning, dan neural networks.",
        "Eksplorasi computer vision, NLP, large language models (LLM) & generative AI.",
        "Praktik hands-on implementasi model pada platform Huawei ModelArts.",
      ],
      technologies: ["Python"],
    },
    {
      id: "cert-3",
      role: "AI Foundation Associate",
      organization: "Oracle Corporation",
      employmentType: "Sertifikasi Resmi",
      period: "2025",
      location: "Oracle University",
      logoImage: "/assets/certificates/cert-3-ai-foundation-associate.webp",
      summary:
        "Memahami konsep dasar Artificial Intelligence (AI): sejarah & evolusi AI, machine learning, deep learning, neural network, natural language processing (NLP), computer vision, serta etika & dampak sosial AI. Dilengkapi studi kasus dan praktik penggunaan tools AI untuk pemecahan masalah.",
      highlights: [
        "Prinsip dasar machine learning, deep learning architectures, dan computer vision.",
        "Etika AI, tata kelola data, dan dampak sosial implementasi AI dalam industri.",
        "Studi kasus terapan dan praktik pemecahan masalah berbasis AI tools.",
      ],
      technologies: ["Python"],
    },
    {
      id: "cert-4",
      role: "Website Development with WordPress",
      organization: "Myskill.id",
      employmentType: "Sertifikasi Resmi",
      period: "2026",
      location: "Myskill.id",
      logoImage: "/assets/certificates/cert-4-website-development-with-wordpress.webp",
      summary:
        "Memahami pengembangan website menggunakan WordPress: instalasi & konfigurasi, manajemen konten, kustomisasi theme, plugin, serta optimasi dasar performa & SEO. Dilengkapi praktik membangun website fungsional dari nol.",
      highlights: [
        "Instalasi & konfigurasi environment WordPress dan arsitektur CMS.",
        "Kustomisasi theme responsif, manajemen plugin, serta optimasi performa web.",
        "Penerapan dasar-dasar SEO dan peluncuran website fungsional dari nol.",
      ],
      technologies: ["WordPress", "HTML", "JavaScript"],
    },
    {
      id: "cert-5",
      role: "MTCNA",
      organization: "Mikrotik",
      employmentType: "Sertifikasi Resmi",
      period: "2025",
      location: "MikroTik Official",
      logoImage: "/assets/certificates/cert-5-mtcna.webp",
      summary:
        "Sertifikasi resmi MikroTik tingkat associate. Mencakup konfigurasi dasar RouterOS: IP addressing, routing statis & dinamis (OSPF), firewall & NAT, DHCP, DNS, wireless, hotspot, serta queue & bandwidth management. Dilengkapi praktik langsung menggunakan perangkat MikroTik dan RouterOS.",
      highlights: [
        "Konfigurasi RouterOS: IP addressing, DHCP server/client, dan DNS cache.",
        "Implementasi routing statis & dinamis (OSPF), firewall filter, dan NAT masquerading.",
        "Manajemen bandwidth via Simple Queue, hotspot gateway, dan manajemen jaringan wireless.",
      ],
      technologies: [],
    },
    {
      id: "cert-6",
      role: "CCNA: Introduction to Networks",
      organization: "Cisco Networking Academy",
      employmentType: "Sertifikasi Resmi",
      period: "2026",
      location: "Cisco Networking Academy",
      logoImage: "/assets/certificates/cert-6-ccna-introduction-to-networks.webp",
      summary:
        "Memahami dasar jaringan komputer: model OSI & TCP/IP, pengalamatan IPv4 & IPv6, subnetting, serta konfigurasi dasar perangkat Cisco (router & switch). Dilengkapi latihan praktik dengan Cisco Packet Tracer dan assessment untuk menguji pemahaman konsep.",
      highlights: [
        "Arsitektur fundamental model jaringan OSI 7-layer dan suite TCP/IP.",
        "Perhitungan pengalamatan IPv4, subnetting VLSM, dan IPv6 addressing.",
        "Konfigurasi dasar perangkat router dan switch Cisco melalui Cisco Packet Tracer.",
      ],
      technologies: [],
    },
    {
      id: "cert-7",
      role: "Python Essentials 2",
      organization: "Cisco Networking Academy",
      employmentType: "Sertifikasi Resmi",
      period: "2026",
      location: "Cisco Networking Academy",
      logoImage: "/assets/certificates/cert-7-python-essentials-2.webp",
      summary:
        "Memahami konsep lanjutan Python: pemrograman berorientasi objek (OOP), class & object, inheritance, exception handling, modul & package, serta operasi file. Dilengkapi latihan praktik dan assessment untuk menguji pemahaman konsep lanjutan.",
      highlights: [
        "Object-Oriented Programming (OOP): class, inheritance, polymorphism, encapsulation.",
        "Mekanisme exception handling lanjutan, modularitas via packages & modules.",
        "Operasi file I/O streams, generator, list comprehension, dan lambda functions.",
      ],
      technologies: ["Python"],
    },
    {
      id: "cert-8",
      role: "Python Essentials 1",
      organization: "Cisco Networking Academy",
      employmentType: "Sertifikasi Resmi",
      period: "2026",
      location: "Cisco Networking Academy",
      logoImage: "/assets/certificates/cert-8-python-essentials-1.webp",
      summary:
        "Memahami dasar pemrograman Python: tipe data, variabel, operator, kontrol alur (if/else, loop), fungsi, dan struktur data (list, tuple, dictionary). Dilengkapi latihan praktik dan kuis untuk menguji pemahaman konsep.",
      highlights: [
        "Fondasi sintaks Python: tipe data primitif, operator aritmatika, dan evaluasi logika.",
        "Kontrol alur program: conditional branching dan looping iteration (for / while).",
        "Pengembangan modular dengan fungsi, parameter scoping, dan koleksi data kompleks.",
      ],
      technologies: ["Python"],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "STMIK IKMI CIREBON",
      institution: "",
      period: "2025 - Sekarang",
      description: "",
    },
    {
      degree: "SMK Bina Warga Lemahabang",
      institution: "",
      period: "2022 - 2025",
      description: "",
    },
  ] as EducationItem[],

  philosophy: [
    {
      title: "Speed Meets System Discipline",
      description:
        "As a Vibe Coder Fullstack, I leverage modern AI workflows to eliminate boilerplate instantly—investing saved hours into rock-solid architecture, edge-case handling, and automated testing.",
    },
    {
      title: "Design-First Engineering",
      description:
        "Great software feels effortless. I translate Figma specs into pixel-accurate, responsive interfaces with crisp typography, zero layout shift, and tactile micro-interactions.",
    },
    {
      title: "Ship With Confidence",
      description:
        "Every feature is backed by type-safe contracts (TypeScript + Prisma) and automated Playwright E2E checks so deployments happen without Friday-afternoon anxiety.",
    },
  ],
};

export function getWhatsAppUrl(customMessage?: string) {
  const text = encodeURIComponent(
    customMessage || portfolioData.profile.whatsappMessage
  );
  return `https://wa.me/${portfolioData.profile.whatsappNumber}?text=${text}`;
}
