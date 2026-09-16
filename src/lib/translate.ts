/**
 * Robust Multi-Tier Auto-Translation Utility
 * 1. Tier 1: Configured LibreTranslate (Self-Hosted Docker or Remote Instance)
 * 2. Tier 2: Public Cloud Translation Service (MyMemory API - Zero Config)
 * 3. Tier 3: Common Portfolio Phrase Dictionary
 * 4. Tier 4: Graceful Identity Fallback (Never throws or blocks CMS saves)
 */

export interface TranslateOptions {
  sourceLang?: string;
  targetLang?: string;
  timeoutMs?: number;
}

const COMMON_FALLBACKS: Record<string, string> = {
  "lihat project": "View Projects",
  "lihat karya": "View Projects",
  "lihat semua project": "View All Projects",
  "hubungi saya": "Contact Me",
  "tentang saya": "About Me",
  "keahlian & tools": "Skills & Tools",
  "karya & project": "Projects & Works",
  "sertifikat": "Certificates",
  "open to work": "Open to Work / Available for Hire",
  "open to work / siap bekerja": "Open to Work / Available for Hire",
  "web developer": "Web Developer",
  "frontend developer": "Frontend Developer",
  "full stack developer": "Full Stack Developer",
  "tech & administration": "Tech & Administration",
  "react & tailwind css": "React & Tailwind CSS",
  "next.js & react": "Next.js & React",
};

function getSmartFallback(text: string): string {
  const lower = text.trim().toLowerCase();
  return COMMON_FALLBACKS[lower] || text;
}

/**
 * Attempts to translate using LibreTranslate API endpoint.
 */
async function tryLibreTranslate(
  text: string,
  sourceLang: string,
  targetLang: string,
  timeoutMs: number
): Promise<string | null> {
  const endpoint = process.env.LIBRETRANSLATE_URL || "http://localhost:5000/translate";
  const apiKey = process.env.LIBRETRANSLATE_API_KEY || "";

  try {
    const payload: Record<string, any> = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    };
    if (apiKey) payload.api_key = apiKey;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.translatedText === "string" && data.translatedText.trim()) {
        return data.translatedText.trim();
      }
    }
  } catch (error) {
    // LibreTranslate not reachable or timed out -> proceed to fallback
  }

  return null;
}

/**
 * Attempts to translate using MyMemory Translation API (Free & unauthenticated).
 */
async function tryMyMemory(
  text: string,
  sourceLang: string,
  targetLang: string,
  timeoutMs: number
): Promise<string | null> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${sourceLang}|${targetLang}`;

    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (response.ok) {
      const data = await response.json();
      if (
        data &&
        data.responseData &&
        typeof data.responseData.translatedText === "string" &&
        data.responseData.translatedText.trim()
      ) {
        const translated = data.responseData.translatedText.trim();
        // Ignore if MyMemory returns error messages or identical text for long sentences
        if (!translated.toUpperCase().startsWith("MYMEMORY WARNING")) {
          return translated;
        }
      }
    }
  } catch (error) {
    // MyMemory not reachable or timed out
  }

  return null;
}

/**
 * Main translation function: ID -> EN with multi-tier failover.
 */
export async function translateText(
  text: string,
  options: TranslateOptions = {}
): Promise<string> {
  const trimmed = text?.trim();
  if (!trimmed) return text || "";

  const sourceLang = options.sourceLang || "id";
  const targetLang = options.targetLang || "en";
  const timeoutMs = options.timeoutMs || 4000;

  // 0. Curated Dictionary Match for exact standard phrases
  const lower = trimmed.toLowerCase();
  if (COMMON_FALLBACKS[lower]) {
    return COMMON_FALLBACKS[lower];
  }

  // 1. Tier 1: Try configured LibreTranslate
  const ltResult = await tryLibreTranslate(trimmed, sourceLang, targetLang, Math.min(timeoutMs, 2500));
  if (ltResult && ltResult !== trimmed) {
    return ltResult;
  }

  // 2. Tier 2: Try MyMemory Cloud Service
  const myMemoryResult = await tryMyMemory(trimmed, sourceLang, targetLang, timeoutMs);
  if (myMemoryResult && myMemoryResult !== trimmed) {
    return myMemoryResult;
  }

  // 3. Tier 3: Graceful Identity Fallback
  return trimmed;
}

/**
 * Batch translates multiple strings in parallel.
 */
export async function translateBatch(
  texts: string[],
  options: TranslateOptions = {}
): Promise<string[]> {
  if (!texts || texts.length === 0) return [];
  return Promise.all(texts.map((t) => translateText(t, options)));
}
