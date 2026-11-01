"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowRight, Globe } from "lucide-react";
import { portfolioData, getWhatsAppUrl } from "@/data/portfolio";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, isBlack } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav.about"), href: "/about", number: "01" },
    { label: t("nav.projects"), href: "/projects", number: "02" },
    { label: t("nav.resume"), href: "/resume", number: "03" },
  ];

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`no-print sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
          isBlack
            ? "border-[#1a1a1a] bg-black/90 backdrop-blur-md"
            : "border-[#eeeeee] bg-white/90 backdrop-blur-md"
        }`}
      >
        <nav
          className="mx-auto flex h-[64px] w-full max-w-[992px] items-center justify-between px-4 sm:px-0"
          aria-label="Main Navigation"
        >
          {/* Left: Brand Monogram + Name */}
          <div className="flex items-center gap-[24px]">
            <Link href="/" className="group flex items-center gap-[8px]">
              <div
                className="relative size-[32px] shrink-0 overflow-hidden rounded-[6px] border border-[#262626] bg-[#0a0a0a] transition-transform duration-200 group-hover:scale-105 flex items-center justify-center p-1"
                style={{ width: 32, height: 32, minWidth: 32 }}
              >
                <img
                  alt="Arif Monogram"
                  width={20}
                  height={20}
                  className="pointer-events-none object-contain"
                  src="/assets/logo.svg"
                />
              </div>
              <span
                className={`font-mono-ui text-[16px] font-semibold transition-colors group-hover:text-[#39a875] ${
                  isBlack ? "text-white" : "text-[#171918]"
                }`}
              >
                {portfolioData.profile.firstName}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-[22px] md:flex">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-sans-body text-[14px] transition-colors ${
                      isActive
                        ? isBlack
                          ? "font-semibold text-white"
                          : "font-semibold text-[#171918]"
                        : isBlack
                        ? "font-normal text-[#858786] hover:text-[#39a875]"
                        : "font-normal text-[#777a78] hover:text-[#39a875]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Controls (Translate + Theme Sun/Moon + Hamburger) */}
          <div className="flex items-center gap-[12px] sm:gap-[16px]">
            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={toggleLang}
              className={`flex h-[32px] cursor-pointer items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-medium transition-all ${
                isBlack
                  ? "border-[#262626] bg-[#0a0a0a] text-white hover:border-[#39a875]"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918] hover:border-[#39a875]"
              }`}
              title={
                lang === "en"
                  ? "Ganti ke Bahasa Indonesia"
                  : "Switch to English"
              }
              aria-label="Language Switcher"
            >
              <Globe className="size-3.5 text-[#39a875]" />
              <span className="uppercase tracking-wider font-semibold">
                {lang}
              </span>
              <span className="text-[10px] text-[#858786]">
                {lang === "en" ? "ID" : "EN"}
              </span>
            </button>

            {/* Theme Toggle Button (Sun / Moon) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex size-[34px] cursor-pointer items-center justify-center rounded-[8px] border transition-all ${
                isBlack
                  ? "border-[#262626] bg-[#0a0a0a] text-yellow-400 hover:border-[#39a875] hover:text-white"
                  : "border-[#e0e0e0] bg-[#f7f7f7] text-[#171918] hover:border-[#39a875]"
              }`}
              title={
                isBlack
                  ? "Ubah ke Mode Putih (White Clean)"
                  : "Ubah ke Mode Hitam (Black OLED)"
              }
              aria-label="Toggle Theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isBlack ? (
                  <Sun className="size-4.5 text-yellow-400" />
                ) : (
                  <Moon className="size-4.5 text-[#171918]" />
                )}
              </motion.div>
            </button>

            {/* Menu Button with previous icon */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`flex size-[34px] cursor-pointer items-center justify-center rounded-[8px] border transition-all ${
                isBlack
                  ? "border-[#262626] bg-[#0a0a0a] hover:border-[#39a875]"
                  : "border-[#e0e0e0] bg-[#f7f7f7] hover:border-[#39a875]"
              }`}
              title="Menu"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative size-[20px] shrink-0">
                <img
                  alt="Menu"
                  width={20}
                  height={20}
                  className={`block transition-transform duration-200 ${
                    isMenuOpen ? "rotate-90 scale-95" : ""
                  } ${isBlack ? "invert" : ""}`}
                  src="/assets/figma/command.svg"
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Animated Hamburger Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className={`flex h-full w-full max-w-[420px] flex-col justify-between border-l p-8 shadow-2xl transition-colors duration-300 ${
                isBlack
                  ? "border-[#1a1a1a] bg-[#0a0a0a] text-white"
                  : "border-[#e5e5e5] bg-white text-[#171918]"
              }`}
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b pb-6 border-neutral-800/40">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#39a875] animate-pulse" />
                  <span className="font-mono-ui text-[12px] uppercase tracking-wider text-[#858786]">
                    Navigation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded border px-2 py-1 text-[11px] font-mono-ui transition-colors ${
                    isBlack
                      ? "border-[#262626] bg-black text-[#858786] hover:border-[#39a875] hover:text-white"
                      : "border-[#e0e0e0] bg-[#f7f7f7] text-[#777a78] hover:border-[#39a875] hover:text-black"
                  }`}
                >
                  ESC
                </button>
              </div>

              {/* Drawer Menu Items (Only About, Projects, Resume) */}
              <div className="my-auto flex flex-col gap-6 py-8">
                {navLinks.map((item, idx) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * (idx + 1), duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between py-2"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[13px] text-[#39a875]">
                            {item.number}
                          </span>
                          <span
                            className={`font-display text-[32px] sm:text-[38px] tracking-tight transition-transform duration-200 group-hover:translate-x-2 ${
                              isActive
                                ? isBlack
                                  ? "text-white"
                                  : "text-[#171918]"
                                : isBlack
                                ? "text-[#858786] group-hover:text-[#39a875]"
                                : "text-[#777a78] group-hover:text-[#39a875]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <ArrowRight
                          className={`size-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#39a875] ${
                            isActive
                              ? isBlack
                                ? "text-white"
                                : "text-[#171918]"
                              : "text-[#858786]/30"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Footer Links */}
              <div className="flex flex-col gap-4 border-t pt-6 border-neutral-800/40 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#858786]">
                    {portfolioData.profile.role}
                  </span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#39a875] hover:underline"
                  >
                    WhatsApp &rarr;
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#858786]">
                  <span>{portfolioData.profile.location}</span>
                  <span>© 2026 {portfolioData.profile.firstName}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
