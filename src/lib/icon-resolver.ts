/**
 * Helper to resolve skill icon string to a valid image URL.
 * Supports:
 * 1. Full URLs (http:// or https://)
 * 2. Local uploads / paths (/uploads/... or /images/...)
 * 3. Short icon keywords resolved via Simple Icons CDN (https://cdn.simpleicons.org/{slug})
 */

const KEYWORD_ALIASES: Record<string, string> = {
  // Frameworks & Libraries
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  "vue.js": "vuedotjs",
  vuejs: "vuedotjs",
  "express.js": "express",
  expressjs: "express",
  tailwind: "tailwindcss",
  "tailwind-css": "tailwindcss",
  "tailwind css": "tailwindcss",
  postgres: "postgresql",
  mongo: "mongodb",
  "c++": "cplusplus",
  cpp: "cplusplus",
  "c#": "csharp",
  csharp: "csharp",
  ".net": "dotnet",
  dotnet: "dotnet",
  golang: "go",

  // Adobe & Design
  photoshop: "adobephotoshop",
  illustrator: "adobeillustrator",
  premiere: "adobepremierepro",
  "premiere pro": "adobepremierepro",
  "premiere-pro": "adobepremierepro",
  aftereffects: "adobeaftereffects",
  "after effects": "adobeaftereffects",
  lightroom: "adobelightroom",
  xd: "adobexd",
  indesign: "adobeindesign",

  // Microsoft Suite
  excel: "microsoftexcel",
  "ms excel": "microsoftexcel",
  "ms-excel": "microsoftexcel",
  word: "microsoftword",
  "ms word": "microsoftword",
  "ms-word": "microsoftword",
  powerpoint: "microsoftpowerpoint",
  "ms powerpoint": "microsoftpowerpoint",
  "ms-powerpoint": "microsoftpowerpoint",
  vscode: "visualstudiocode",
  "vs code": "visualstudiocode",
};

export function resolveSkillIconUrl(iconString?: string | null): string {
  if (!iconString) return "";
  const trimmed = iconString.trim();
  if (!trimmed) return "";

  // 1. Direct absolute URL or local path
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  // 2. Keyword normalization for Simple Icons
  const normalizedKey = trimmed.toLowerCase();
  const slug = KEYWORD_ALIASES[normalizedKey] || normalizedKey.replace(/\s+/g, "");

  return `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`;
}
