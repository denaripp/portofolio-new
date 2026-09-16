import { ProjectStatus, SkillLevel } from "@prisma/client";

export type { ProjectStatus, SkillLevel };

export interface BilingualField {
  id: string;
  en: string;
}

export interface HeroData {
  id: string;
  profileImage: string;
  name: string;
  role: BilingualField;
  specialization: BilingualField;
  headline: BilingualField;
  description: BilingualField;
  primaryCtaText: BilingualField;
  primaryCtaUrl: string;
  secondaryCtaText: BilingualField;
  secondaryCtaUrl: string;
}

export interface AboutData {
  id: string;
  name: string;
  profileImage: string;
  bio: BilingualField;
  bioSecondary?: BilingualField | null;
  location: string;
  currentEducation: string;
  status: string;
  email: string;
  whatsapp: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: SkillLevel;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: BilingualField;
  description: BilingualField;
  image: string;
  category: string;
  techStack: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  status: ProjectStatus;
  isFeatured: boolean;
  displayOrder: number;
}

export interface CertificateItem {
  id: string;
  title: BilingualField;
  organization: string;
  image: string;
  description?: BilingualField | null;
  dateObtained: string;
  certificateUrl?: string | null;
  isFeatured: boolean;
  displayOrder: number;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  icon: string;
  url: string;
  displayOrder: number;
  isActive: boolean;
}

export interface FooterData {
  id: string;
  tagline: BilingualField;
  copyrightName?: string | null;
}
