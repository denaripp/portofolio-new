import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { LanguageProvider } from "@/components/providers/language-provider";
import { getCurrentLocale } from "@/lib/i18n/server";
import { publicService } from "@/services/public.service";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, socialLinks, hero, footer] = await Promise.all([
    getCurrentLocale(),
    publicService.getSocialLinks(),
    publicService.getHero(),
    publicService.getFooter(),
  ]);

  return (
    <LanguageProvider initialLocale={locale}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 selection:bg-orange-500 selection:text-white">
        {/* Global Public Navbar */}
        <Navbar />

        {/* Main Page Area */}
        <main className="flex-1 w-full">{children}</main>

        {/* Global Public Footer */}
        <Footer
          socialLinks={socialLinks}
          footer={footer}
          name={hero?.name || "Muhammad Najwa Syarif"}
        />
      </div>
    </LanguageProvider>
  );
}
