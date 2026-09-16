# Modern Professional Portfolio

Website portofolio personal premium, dinamis, dan fully responsive untuk **Muhammad Najwa Syarif** yang dilengkapi dengan **Custom Admin CMS**, sistem **Bilingual (Indonesian & English)**, **Media Processing (Sharp WebP)**, dan **SEO & Performance Optimization**.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19 + TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Color Tokens (Primary Navy, Neutral Black/White, Accent Orange)
- **Database & ORM**: PostgreSQL + [Prisma ORM 6](https://www.prisma.io/)
- **Theme**: Dark Mode & Light Mode (Zero-flash via `next-themes`)
- **i18n**: Sistem bilingual ID / EN (Server-driven dictionary + persistent cookie)
- **Security**: JWT Session (HttpOnly cookie), Password hashing (bcryptjs), route protection middleware
- **Media Engine**: Image validation (True magic-byte header inspection) + Sharp optimization (WebP compression, max 5MB)
- **Icons**: Lucide React + Custom SVG Brand Icons

---

## 🛠️ Prasyarat (Prerequisites)

Pastikan sistem Anda sudah terinstall:
- [Node.js](https://nodejs.org/) versi **18.18+** atau **20+**
- [PostgreSQL](https://www.postgresql.org/) database server (lokal atau cloud seperti Supabase/Neon/Railway)

---

## 📦 Panduan Instalasi & Setup

### 1. Clone Repositori & Install Dependency
```bash
git clone <url-repositori-anda>
cd portofolio
npm install
```

### 2. Setup Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka `.env` dan sesuaikan nilainya:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db?schema=public"
AUTH_SECRET="buat-kunci-rahasia-random-minimal-32-karakter"
SESSION_COOKIE_NAME="portfolio_admin_session"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Migrasi Database & Seed Data
Jalankan migrasi Prisma untuk membuat tabel, lalu jalankan seed script:
```bash
# Push schema dan migrasi database
npx prisma migrate dev --name init

# Generate prisma client
npx prisma generate

# Jalankan seeder (konten awal + akun admin pertama)
npm run seed
```

---

## 🔑 Akun Admin Pertama Kali

Setelah menjalankan `npm run seed`, akun admin default telah dibuat secara otomatis:

- **Portal Login**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Default Password**: `AdminPassword123!`

> ⚠️ **PENTING**: Segera masuk ke menu **Admin Dashboard → Profile & Security** (`/admin/dashboard/profile`) setelah pertama kali login untuk mengganti username, email, dan kata sandi Anda.

---

## 💻 Menjalankan Server Development

```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat website publik.

---

## 🏗️ Build & Production Deployment

Untuk memvalidasi dan mem-build project untuk production:
```bash
npm run build
npm run start
```

### Rekomendasi Deployment (Portable & Vendor-Neutral)

1. **Web Application Hosting**:
   - [Vercel](https://vercel.com/) (Rekomendasi utama untuk Next.js App Router).
   - [Railway](https://railway.app/) atau VPS (Docker/Node.js).
2. **Database PostgreSQL**:
   - [Supabase](https://supabase.com/) (Gratis tier PostgreSQL handal).
   - [Neon.tech](https://neon.tech/) (Serverless PostgreSQL).
   - [Railway PostgreSQL](https://railway.app/).
3. **Media Storage (Portable)**:
   - Saat ini tersimpan di `public/uploads/`.
   - Untuk deployment cloud serverless (seperti Vercel), integrasikan modul [`src/lib/media/storage.ts`](src/lib/media/storage.ts) ke Cloudflare R2 atau Supabase Storage Bucket yang kompatibel dengan S3 API tanpa vendor lock-in.
