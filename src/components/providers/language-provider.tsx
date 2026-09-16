"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/types";
import { dictionaries, Dictionary } from "@/lib/i18n/dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

const LOCALE_COOKIE_NAME = "portfolio_locale";

export function LanguageProvider({
  children,
  initialLocale = "id",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);

  const setLocale = React.useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;

      // 1. Set 1-year persistent cookie
      document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // 2. Update state locally
      setLocaleState(newLocale);

      // 3. Refresh Next.js server components so data from DB re-renders in the new locale
      router.refresh();
    },
    [locale, router]
  );

  const t = React.useMemo(() => dictionaries[locale], [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
