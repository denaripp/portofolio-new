import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CommandPaletteProvider } from "@/components/CommandPalette";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { portfolioData } from "@/data/portfolio";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolioData.profile.firstName} — ${portfolioData.profile.role}`,
  description: portfolioData.profile.heroSubheadline,
  icons: {
    icon: "/assets/logo.svg",
    shortcut: "/assets/logo.svg",
    apple: "/assets/brand/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen selection:bg-[#39a875] selection:text-black">
        <ThemeProvider>
          <LanguageProvider>
            <CommandPaletteProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </CommandPaletteProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
