import {
  AboutData,
  CertificateItem,
  HeroData,
  ProjectItem,
  SkillItem,
  SocialLinkItem,
} from "@/types/content";

export const initialHeroData: HeroData = {
  id: "hero-1",
  profileImage: "/images/profile.png",
  name: "Muhammad Najwa Syarif",
  role: {
    id: "Web Developer",
    en: "Web Developer",
  },
  specialization: {
    id: "Next.js & React",
    en: "Next.js & React",
  },
  headline: {
    id: "Membangun website modern, cepat, dan terukur dengan pengalaman pengguna optimal.",
    en: "Building modern, fast, and scalable web experiences with precision.",
  },
  description: {
    id: "Spesialis dalam pengembangan frontend & full-stack web application menggunakan Next.js, React, TypeScript, dan arsitektur database modern.",
    en: "Specializing in modern frontend & full-stack development using Next.js, React, TypeScript, and clean database architectures.",
  },
  primaryCtaText: {
    id: "Lihat Project",
    en: "View Projects",
  },
  primaryCtaUrl: "/projects",
  secondaryCtaText: {
    id: "Hubungi Saya",
    en: "Contact Me",
  },
  secondaryCtaUrl: "/contact",
};

export const initialAboutData: AboutData = {
  id: "about-1",
  name: "Muhammad Najwa Syarif",
  profileImage: "/images/profile.png",
  bio: {
    id: "Saya adalah seorang web developer yang berfokus pada pembuatan website modern, clean, dan mudah digunakan. Terbiasa membangun antarmuka web yang responsif, performa tinggi, dan terintegrasi dengan database.",
    en: "I am a web developer focused on building modern, clean, and intuitive web solutions. Experienced in developing responsive, high-performance interfaces integrated with modern databases.",
  },
  location: "Indonesia",
  currentEducation: "Informatika / Computer Science",
  status: "Open to Work / Available for Hire",
  email: "najwasyarif@example.com",
  whatsapp: "+6281234567890",
};

export const initialSkills: SkillItem[] = [
  {
    id: "skill-1",
    name: "React.js & Next.js",
    icon: "react",
    category: "Development",
    level: "ADVANCED",
    displayOrder: 1,
  },
  {
    id: "skill-2",
    name: "TypeScript",
    icon: "typescript",
    category: "Development",
    level: "INTERMEDIATE",
    displayOrder: 2,
  },
  {
    id: "skill-3",
    name: "PostgreSQL & Prisma",
    icon: "postgresql",
    category: "Development",
    level: "INTERMEDIATE",
    displayOrder: 3,
  },
  {
    id: "skill-4",
    name: "UI/UX & Wireframing (Figma)",
    icon: "figma",
    category: "Design",
    level: "ADVANCED",
    displayOrder: 4,
  },
  {
    id: "skill-5",
    name: "Adobe Photoshop & Illustrator",
    icon: "photoshop",
    category: "Design",
    level: "INTERMEDIATE",
    displayOrder: 5,
  },
  {
    id: "skill-6",
    name: "Digital Marketing & SEO",
    icon: "marketing",
    category: "Marketing",
    level: "INTERMEDIATE",
    displayOrder: 6,
  },
  {
    id: "skill-7",
    name: "Git & Project Management",
    icon: "git",
    category: "Tools & Management",
    level: "ADVANCED",
    displayOrder: 7,
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: {
      id: "E-Commerce Management System",
      en: "E-Commerce Management System",
    },
    category: "Web Development",
    description: {
      id: "Aplikasi e-commerce modern dengan dashboard admin, manajemen katalog produk, dan pelacakan transaksi.",
      en: "Modern e-commerce platform featuring an intuitive admin dashboard, product catalog management, and transaction tracking.",
    },
    image: "/images/projects/project1.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    demoUrl: "https://demo-ecommerce.example.com",
    githubUrl: "https://github.com/example/ecommerce",
    status: "COMPLETED",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: "proj-2",
    title: {
      id: "Brand Identity & Design System",
      en: "Brand Identity & Design System",
    },
    category: "UI/UX & Design",
    description: {
      id: "Perancangan identitas visual brand komprehensif, desain sistem komponen UI, dan panduan gaya visual produk digital.",
      en: "Comprehensive brand visual identity design, UI component design system, and digital product style guide.",
    },
    image: "/images/projects/project2.png",
    techStack: ["Figma", "Adobe Illustrator", "Photoshop"],
    demoUrl: "https://figma.com",
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: true,
    displayOrder: 2,
  },
];

export const initialCertificates: CertificateItem[] = [
  {
    id: "cert-1",
    title: {
      id: "Full Stack Web Development Bootcamp",
      en: "Full Stack Web Development Bootcamp",
    },
    organization: "Codepolitan / Dicoding Academy",
    image: "/images/certificates/cert1.png",
    description: {
      id: "Program intensif pengembangan web modern dari frontend, RESTful API, hingga deployment.",
      en: "Intensive modern web development program covering frontend, RESTful APIs, and cloud deployment.",
    },
    dateObtained: "2025",
    certificateUrl: "https://example.com/certificate/cert-1",
    isFeatured: true,
    displayOrder: 1,
  },
];

export const initialSocialLinks: SocialLinkItem[] = [
  {
    id: "soc-1",
    platform: "GitHub",
    icon: "github",
    url: "https://github.com",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "soc-2",
    platform: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "soc-3",
    platform: "WhatsApp",
    icon: "whatsapp",
    url: "https://wa.me/6281234567890",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "soc-4",
    platform: "Email",
    icon: "mail",
    url: "mailto:najwasyarif@example.com",
    displayOrder: 4,
    isActive: true,
  },
];
