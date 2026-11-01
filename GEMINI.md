# Workspace Rules: Web Scraping & UI Cloning Protocol

Whenever the user asks to scrape, clone, replicate, or recreate a website, UI, landing page, or component (even if the user's prompt is short or inaccurate):

### 1. Zero Improvisation (Strict Anti-Hallucination)
- Dilarang membuat metrik KPI palsu, angka dummy, nama orang/klien fiktif, atau kartu buatan sendiri.
- 100% teks harus verbatim dari DOM rendered browser target.

### 2. Computed CSS & Exact Geometry
- Ukuran, padding, margin, font-size, letter-spacing, dan border-radius wajib diekstrak dari `window.getComputedStyle()`.
- Warna hex/rgba, gradient stops, dan glow effect diambil persis dari CSS aslinya.

### 3. Ekstraksi Aset & Font Asli
- Unduh semua gambar asli (WebP, PNG) dan vektor SVG asli.
- Unduh file web font asli (.woff2) dari `@font-face` agar tipografi identik (jangan fallback ke font standar seperti Inter jika webnya menggunakan serif editorial).

### 4. Visual Benchmark Validation
- Ambil screenshot full-page website target untuk validasi visual 1:1 sebelum finalisasi.
