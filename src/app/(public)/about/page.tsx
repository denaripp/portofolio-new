import type { Metadata } from "next";
import { publicService } from "@/services/public.service";
import { getCurrentLocale } from "@/lib/i18n/server";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { AboutContent } from "@/components/public/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  return constructPageMetadata("about", { locale, path: "/about" });
}

export default async function AboutPage() {
  const about = await publicService.getAbout();

  return <AboutContent about={about} />;
}
