import { cookies } from "next/headers";
import { Locale } from "@/types";
import { dictionaries, Dictionary } from "./dictionaries";
import { BilingualField } from "@/types/content";

export const LOCALE_COOKIE_NAME = "portfolio_locale";
export const DEFAULT_LOCALE: Locale = "id";

/**
 * Resolves current active locale on the server by reading the session cookie.
 */
export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (cookieVal === "en" || cookieVal === "id") {
    return cookieVal;
  }

  return DEFAULT_LOCALE;
}

/**
 * Returns the dictionary object for the requested or current server locale.
 */
export async function getDictionary(explicitLocale?: Locale): Promise<Dictionary> {
  const locale = explicitLocale || (await getCurrentLocale());
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

/**
 * Resolves a bilingual field from the database for the active locale.
 */
export function resolveBilingual(
  field: BilingualField | null | undefined,
  locale: Locale,
  fallback = ""
): string {
  if (!field) return fallback;
  return field[locale] || field.id || fallback;
}
