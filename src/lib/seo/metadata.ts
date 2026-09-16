import { Metadata } from "next";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/server";

interface SeoOptions {
  locale: Locale;
  path?: string;
  image?: string;
}

export async function constructPageMetadata(
  pageKey: "home" | "about" | "skills" | "projects" | "certificates" | "contact",
  options: SeoOptions
): Promise<Metadata> {
  const { locale, path = "", image = "/og-image.png" } = options;
  const t = await getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://najwasyarif.dev";
  const canonicalUrl = `${baseUrl}${path}`;

  const titleKey = `${pageKey}Title` as keyof typeof t.meta;
  const descKey = `${pageKey}Desc` as keyof typeof t.meta;

  const title = t.meta[titleKey] || "Modern Professional Portfolio";
  const description = t.meta[descKey] || "Modern Professional Portfolio";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "id-ID": `${baseUrl}${path}`,
        "en-US": `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Muhammad Najwa Syarif Portfolio",
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
      creator: "@najwasyarif",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
