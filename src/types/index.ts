export type Locale = "id" | "en";
export type ThemeMode = "light" | "dark" | "system";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export * from "./content";
export * from "./admin";
