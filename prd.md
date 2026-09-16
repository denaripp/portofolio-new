# Product Requirements Document (PRD)

## Website Portofolio Personal — Modern Professional

**Status:** Ready for Development
**Platform:** Responsive Web
**Primary Stack:** Next.js, React, Tailwind CSS, PostgreSQL
**Bahasa:** Bahasa Indonesia & English
**Theme:** Light Mode & Dark Mode
**Architecture:** Public Multi-page Website + Private Admin CMS

---

## 1. Product Overview

Website Portofolio adalah website personal profesional yang digunakan untuk menampilkan identitas, kemampuan, pengalaman project, dan sertifikat yang pernah diperoleh.

Website dirancang terutama sebagai **personal branding dan portfolio untuk recruiter**, sehingga informasi harus mudah dipindai, terlihat profesional, cepat diakses, dan tersedia dalam **Bahasa Indonesia maupun English**.

Website terdiri dari dua area utama:

1. **Public Portfolio**

   * Dapat diakses siapa saja.
   * Multi-page.
   * Responsive pada seluruh ukuran device.
   * Mendukung Bahasa Indonesia dan English.
   * Mendukung Light Mode dan Dark Mode.

2. **Private Admin CMS**

   * Hanya dapat diakses oleh pemilik portfolio.
   * Tidak memiliki link/menu Admin pada website publik.
   * Diakses langsung melalui URL khusus, misalnya `/admin`.
   * Digunakan untuk mengelola seluruh konten portfolio tanpa perlu mengubah source code.

---

# 2. Product Goals

### Primary Goals

1. Membuat portfolio personal yang terlihat profesional dan kredibel di mata recruiter.
2. Menampilkan kemampuan teknis dan project secara jelas.
3. Mempermudah recruiter menemukan informasi penting dalam waktu singkat.
4. Menyediakan portfolio dalam Bahasa Indonesia dan English.
5. Memberikan pengalaman pengguna yang optimal pada mobile maupun desktop.
6. Memungkinkan pemilik website mengelola seluruh konten melalui CMS.
7. Memudahkan penambahan project dan sertifikat baru tanpa mengubah kode aplikasi.
8. Membangun personal branding yang konsisten melalui desain Modern Professional.

### Success Indicators

* Recruiter dapat memahami profil dan role pemilik portfolio dengan cepat.
* Recruiter dapat melihat project dan langsung membuka demo project.
* Recruiter dapat melihat sertifikat dengan jelas.
* Recruiter dapat mengganti bahasa ID/EN dengan mudah.
* Website nyaman digunakan pada mobile, tablet, dan desktop.
* Pemilik dapat mengubah konten website dari CMS tanpa bantuan developer.

---

# 3. Target Users

## Primary User

### Recruiter / Hiring Manager

Membutuhkan informasi yang cepat mengenai:

* Siapa pemilik portfolio.
* Role/keahlian.
* Skills.
* Project yang pernah dibuat.
* Teknologi yang digunakan.
* Sertifikat yang pernah diperoleh.
* Cara menghubungi pemilik portfolio.

Recruiter dapat menggunakan **English Switcher** apabila lebih nyaman membaca portfolio dalam Bahasa Inggris.

## Secondary User

### Client / Potential Collaborator

Dapat menggunakan portfolio untuk melihat:

* Kemampuan teknis.
* Kualitas project.
* Demo project.
* Source code.
* Social/professional profiles.

## Admin

Pemilik portfolio sendiri.

Admin dapat mengelola seluruh konten website melalui CMS.

---

# 4. Core User Problems

Recruiter atau calon client sering harus membuka banyak sumber berbeda untuk memahami kemampuan seseorang.

Portfolio ini menyelesaikan masalah tersebut dengan menyediakan satu tempat yang berisi:

* Profile.
* Skills.
* Projects.
* Certificates.
* Contact & social links.

Masalah lain adalah konten portfolio dapat berubah seiring waktu. Oleh karena itu, website membutuhkan CMS agar pemilik dapat melakukan update secara mandiri.

---

# 5. Information Architecture

## Public

```text
/
├── /about
├── /skills
├── /projects
├── /certificates
└── /contact
```

## Admin

```text
/admin
└── Login

/admin/dashboard
├── Hero
├── About Me
├── Skills
├── Projects
├── Certificates
├── Social Links
└── Admin Profile
```

Tidak ada link `/admin` pada navbar atau footer public website.

---

# 6. Public Website

## 6.1 Global Navbar

Navbar digunakan pada seluruh halaman public.

### Navigation

* Home
* About
* Skills
* Projects
* Certificates
* Contact

### Right-side Controls

* Language Switcher: `ID / EN`
* Theme Switcher: `Light / Dark`
* CTA: `Contact Me`

### Requirements

* Sticky atau fixed navigation dapat digunakan jika tidak mengganggu UX.
* Responsive.
* Pada mobile menggunakan mobile navigation/menu.
* Tidak menampilkan menu Admin.
* Active page harus terlihat jelas.

---

# 7. Home Page

Home berfungsi sebagai entry point utama untuk recruiter.

Urutan section:

### 1. Hero

Menampilkan:

* Foto profil.
* Nama.
* Role/jabatan.
* Headline/tagline.
* Deskripsi singkat.
* Primary CTA.
* Secondary CTA.

Seluruh konten Hero harus editable melalui CMS.

Contoh:

```text
Muhammad Najwa Syarif
Web Developer

Membangun website yang modern dan fungsional.

[ Lihat Project ]
[ Hubungi Saya ]
```

### 2. About Preview

Menampilkan ringkasan profile dan tombol:

**View More**

yang mengarah ke `/about`.

### 3. Skills Preview

Menampilkan beberapa skills utama.

Tersedia tombol:

**View All**

menuju `/skills`.

### 4. Featured Projects

Menampilkan project pilihan.

Setiap project berupa card.

Ketika project diklik:

**→ langsung membuka Demo Project di tab baru.**

Tidak dibuat halaman detail project internal.

### 5. Certificates Preview

Menampilkan beberapa sertifikat terbaru/unggulan.

Tersedia tombol:

**View All**

menuju `/certificates`.

### 6. Contact CTA

Section CTA untuk mengarahkan recruiter/client menghubungi pemilik portfolio.

### 7. Footer

Footer simple professional:

* Nama/logo.
* Short tagline.
* Social links.
* Copyright.

---

# 8. About Page

Route:

`/about`

Menampilkan informasi personal secara lebih lengkap.

### Fields

* Nama.
* Foto profil.
* Bio/deskripsi.
* Lokasi.
* Pendidikan saat ini.
* Status.
* Email.
* Nomor WhatsApp.

### Bilingual Content

Content yang relevan mendukung:

* Bahasa Indonesia.
* English.

CMS menggunakan sistem tab:

```text
[ 🇮🇩 Indonesia ] [ 🇬🇧 English ]
```

---

# 9. Skills Page

Route:

`/skills`

Menampilkan daftar kemampuan dan tools.

Contoh:

* React.
* Tailwind CSS.
* Laravel.
* PHP.
* JavaScript.
* dan skill lain yang ditambahkan admin.

### Skill Fields

Setiap skill memiliki:

* Nama skill.
* Icon/logo.
* Kategori.
* Level.
* Urutan tampil.

### Category

Kategori awal:

* Frontend.
* Backend.
* Tools.

Kategori dapat dikembangkan jika diperlukan.

### Level

* Beginner.
* Intermediate.
* Advanced.

### CMS

Admin dapat:

* Add skill.
* Edit skill.
* Delete skill.
* Upload/change icon.
* Mengubah kategori.
* Mengubah level.
* Mengatur urutan.

---

# 10. Projects Page

Route:

`/projects`

Menampilkan seluruh project dalam bentuk card.

## Project Card

Minimal menampilkan:

* Gambar.
* Judul.
* Deskripsi singkat.
* Tech stack.
* Status.
* Demo.
* GitHub/source code.

### Project Fields

* Judul project.
* Gambar project.
* Deskripsi.
* Teknologi/tech stack.
* Demo URL.
* GitHub/source code URL.
* Status.
* Urutan tampil.

### Status

* Completed.
* In Progress.

### Project Interaction

Ketika recruiter mengklik project:

**Demo URL dibuka pada tab baru.**

Portfolio tetap terbuka pada tab sebelumnya.

### Source Code

GitHub/source code menjadi link terpisah.

Jika tersedia:

`View Source`

juga dibuka pada tab baru.

---

# 11. Certificates Page

Route:

`/certificates`

Halaman ini menampilkan **sertifikat yang pernah diperoleh**, seperti sertifikat:

* Bootcamp.
* Course.
* Training.
* Skill program.
* Program pembelajaran lainnya.

Istilah yang digunakan di seluruh produk:

**Sertifikat / Certificates**

Bukan "Sertifikasi".

## Certificate Fields

* Judul sertifikat.
* Nama penyelenggara/lembaga.
* Gambar sertifikat.
* Deskripsi singkat.
* Tahun/tanggal diperoleh.
* Link sertifikat (optional).
* Urutan tampil.

## Certificate Interaction

Ketika sertifikat diklik:

**Gambar dibuka dalam modal/lightbox.**

Requirements:

* Gambar dapat diperbesar.
* Modal dapat ditutup.
* Klik di luar modal dapat menutup modal.
* Tombol close tersedia.
* Tidak perlu pindah halaman.

---

# 12. Contact Page

Route:

`/contact`

Contact page berfungsi sebagai halaman CTA.

### Contact Platforms

* WhatsApp.
* LinkedIn.
* GitHub.
* Email.
* Instagram.
* Platform lainnya.

Tidak menggunakan contact form.

### Dynamic Social Links

Social links tidak hard-coded.

Admin dapat:

* Add social platform.
* Edit platform.
* Delete platform.
* Mengubah URL.
* Mengatur icon.
* Mengatur urutan.

Contoh:

```text
WhatsApp
LinkedIn
GitHub
Instagram
Email
X/Twitter
Telegram
Behance
Dribbble
```

Admin dapat menambahkan platform baru jika diperlukan.

---

# 13. Internationalization

Website wajib mendukung:

### 🇮🇩 Bahasa Indonesia

### 🇬🇧 English

## Language Switcher

Tersedia pada public navbar:

```text
ID | EN
```

Recruiter dapat mengganti bahasa kapan saja.

### Requirements

* Language switcher tersedia pada seluruh public website.
* Pergantian bahasa tidak mengharuskan user kembali ke Home.
* Preferensi bahasa dipertahankan ketika berpindah halaman.
* UI diterjemahkan ke bahasa yang dipilih.
* Konten portfolio yang dikelola melalui CMS mendukung dua bahasa.
* Tidak mengandalkan automatic translation untuk konten utama portfolio.

## CMS Language Editor

Konten bilingual menggunakan tab:

```text
[ Indonesia ] [ English ]
```

Admin mengisi masing-masing versi secara manual.

---

# 14. Theme System

Website wajib menyediakan:

### Light Mode

Tema terang dengan nuansa profesional.

### Dark Mode

Tema gelap yang tetap mempertahankan readability dan accessibility.

### Theme Switcher

User dapat berpindah theme melalui navbar.

Requirements:

* Preference disimpan pada browser.
* Tidak menyebabkan flash visual yang mengganggu saat page load.
* Seluruh component harus memiliki styling Light/Dark.
* Modal, card, navbar, footer, button, typography, dan form CMS harus mendukung theme yang sesuai.

---

# 15. Visual Design System

## Design Direction

**Modern Professional**

Karakter desain:

* Clean.
* Professional.
* Modern.
* Strong visual hierarchy.
* Tidak terlihat seperti template generik.
* Tidak menggunakan "AI slop".
* Tidak menggunakan neon berlebihan.
* Card digunakan secara strategis untuk memperkuat hierarchy dan aesthetics.

## Color Direction

### Primary

**Navy Blue**

Digunakan untuk branding dan elemen utama.

### Base

**Black & White**

Digunakan sebagai foundation visual dan typography.

### Accent

**Orange**

Digunakan secara terkontrol untuk:

* CTA.
* Highlight.
* Active state.
* Important interaction.

Orange tidak boleh digunakan secara berlebihan.

## Typography

Menggunakan font yang:

* Professional.
* Modern.
* Highly readable.
* Cocok untuk personal portfolio developer.
* Memiliki hierarchy yang jelas antara heading, subtitle, body, dan label.

Pemilihan font final dilakukan saat implementasi berdasarkan compatibility dengan Next.js dan readability pada berbagai device.

---

# 16. Responsive Design

Website wajib responsive pada:

* Mobile phone.
* Tablet.
* Laptop.
* Desktop.
* Large desktop/display.

### Requirements

* Tidak ada horizontal scrolling yang tidak diperlukan.
* Navbar menyesuaikan mobile.
* Card grid berubah berdasarkan viewport.
* Image menggunakan responsive sizing.
* Typography menggunakan responsive scale.
* CTA mudah disentuh pada mobile.
* Modal certificate nyaman digunakan pada mobile.
* CMS dashboard juga responsive.
* Semua interaction tetap usable menggunakan touch.

---

# 17. Animation & Interaction

Design menggunakan:

**Subtle & Professional Animation**

Contoh:

* Fade-in ringan.
* Slide-in ringan.
* Hover transition.
* Button transition.
* Card hover.
* Smooth scrolling.
* Theme transition.
* Language transition bila relevan.

### Constraint

Tidak menggunakan animasi berlebihan yang:

* Mengganggu recruiter.
* Memperlambat website.
* Mengurangi readability.
* Terlihat gimmicky.

Accessibility harus diperhatikan melalui dukungan reduced-motion.

---

# 18. Admin CMS

Admin CMS merupakan private area untuk mengelola seluruh website.

## Access

Admin diakses langsung melalui:

```text
/admin
```

Public website **tidak memiliki Admin menu**.

## Authentication

Admin membutuhkan:

* Username/email.
* Password.
* Secure authentication.
* Session management.

Hanya admin yang sudah authenticated yang dapat mengakses dashboard.

---

# 19. Admin Dashboard

Dashboard menyediakan navigation/menu:

```text
Dashboard
├── Hero
├── About Me
├── Skills
├── Projects
├── Certificates
├── Social Links
└── Admin Profile
```

Dashboard memberikan overview sederhana mengenai jumlah:

* Projects.
* Skills.
* Certificates.
* Social Links.

---

# 20. Hero CMS

Admin dapat mengubah seluruh konten Hero:

* Foto profil.
* Nama.
* Role/jabatan.
* Headline/tagline.
* Deskripsi singkat.
* Primary button text.
* Primary button URL.
* Secondary button text.
* Secondary button URL.

### Bilingual

Menggunakan:

```text
[ Indonesia ] [ English ]
```

---

# 21. About CMS

Admin dapat mengubah:

* Nama.
* Foto profil.
* Bio.
* Lokasi.
* Pendidikan.
* Status.
* Email.
* WhatsApp.

Content text mendukung Indonesia dan English.

---

# 22. Skills CMS

CRUD:

* Create.
* Read.
* Update.
* Delete.

Fields:

```text
Name
Icon
Category
Level
Display Order
```

Admin dapat mengubah urutan skills.

---

# 23. Projects CMS

CRUD:

* Create.
* Read.
* Update.
* Delete.

Fields:

```text
Title ID
Title EN

Description ID
Description EN

Project Image

Tech Stack

Demo URL
GitHub URL

Status
Display Order
```

### Validation

* Demo URL harus valid URL jika diisi.
* GitHub URL harus valid URL jika diisi.
* Image harus memiliki format yang didukung.
* Required fields harus tervalidasi sebelum publish/save.

---

# 24. Certificates CMS

CRUD:

* Create.
* Read.
* Update.
* Delete.

Fields:

```text
Title ID
Title EN

Organization

Certificate Image

Description ID
Description EN

Date/Year Obtained

Certificate URL (optional)

Display Order
```

Certificate image dapat di-upload langsung dari CMS.

---

# 25. Social Links CMS

Admin dapat:

* Create.
* Read.
* Update.
* Delete.

Fields minimal:

```text
Platform Name
Icon
URL
Display Order
Active/Inactive
```

Contoh platform:

* WhatsApp.
* LinkedIn.
* GitHub.
* Instagram.
* Email.
* X/Twitter.
* Telegram.
* Behance.
* Dribbble.

Tidak ada hard limit pada jenis platform.

---

# 26. Admin Profile

Admin dapat:

* Melihat profile admin.
* Mengubah email/username.
* Mengubah password.

Password tidak boleh disimpan dalam bentuk plaintext.

---

# 27. Image Upload

CMS menyediakan image upload langsung dari dashboard.

Digunakan untuk:

* Profile photo.
* Project image.
* Certificate image.
* Skill icon/logo.

### Requirements

* Preview sebelum/save jika memungkinkan.
* Validasi file type.
* Validasi file size.
* Image optimization.
* Unique filename.
* Prevent unsafe file upload.
* Image URL disimpan bersama data content.

Format umum:

* JPG/JPEG.
* PNG.
* WebP.

---

# 28. Database

Database:

**PostgreSQL**

Conceptual entities:

```text
Admin
Hero
About
Skill
Project
ProjectTechnology
Certificate
SocialLink
```

## Example Relationships

```text
Project
 └── ProjectTechnology

Admin
 └── manages all CMS content
```

Untuk bilingual content, field bahasa disimpan secara terstruktur sehingga setiap content memiliki versi Indonesia dan English.

---

# 29. Technical Architecture

## Frontend

* Next.js.
* React.
* Tailwind CSS.

Next.js digunakan sebagai framework utama untuk:

* Public pages.
* Admin pages.
* Server-side functionality.
* API/server actions yang diperlukan CMS.
* SEO metadata.
* Routing.

## Backend

Tidak membutuhkan backend framework terpisah.

Next.js digunakan sebagai application/server layer yang terhubung ke PostgreSQL.

## Database

PostgreSQL menyimpan:

* Profile.
* Hero.
* Skills.
* Projects.
* Certificates.
* Social links.
* Admin credentials/session-related data.

---

# 30. Routing

## Public Routes

```text
/
 /about
 /skills
 /projects
 /certificates
 /contact
```

## Admin Routes

```text
/admin
/admin/dashboard
/admin/dashboard/hero
/admin/dashboard/about
/admin/dashboard/skills
/admin/dashboard/projects
/admin/dashboard/certificates
/admin/dashboard/social-links
/admin/dashboard/profile
```

Route admin harus dilindungi authentication.

---

# 31. SEO

SEO merupakan requirement wajib.

## Metadata

Setiap public page harus memiliki:

* Unique title.
* Meta description.
* Canonical URL.
* Open Graph metadata.
* Social sharing preview.

## Technical SEO

Implementasi:

* Semantic HTML.
* Clean URL.
* Sitemap.
* `robots.txt`.
* Proper heading hierarchy.
* Image alt text.
* Responsive design.
* Performance optimization.

## Bilingual SEO

Metadata dapat memiliki versi:

* Indonesian.
* English.

Language-specific pages/content harus memiliki metadata yang sesuai.

---

# 32. Performance

Target utama:

* Fast initial load.
* Optimized images.
* Lazy loading untuk image yang tidak berada di viewport.
* Minimize unnecessary JavaScript.
* Server-side rendering/static rendering bila sesuai.
* Avoid excessive animation.
* Efficient database queries.

Portfolio harus terasa cepat terutama pada mobile.

---

# 33. Accessibility

Minimum requirements:

* Keyboard navigation.
* Visible focus state.
* Semantic HTML.
* Alt text untuk image.
* Sufficient text contrast.
* Accessible buttons.
* Accessible modal.
* Reduced-motion support.
* Form labels pada CMS.
* Jangan menggunakan warna sebagai satu-satunya indikator informasi.

---

# 34. Security

Admin CMS merupakan area private sehingga security menjadi requirement penting.

### Requirements

* Password di-hash.
* Authentication dilakukan server-side.
* Session menggunakan secure cookie.
* Cookie menggunakan `HttpOnly`.
* Cookie menggunakan `Secure` pada production.
* CSRF protection sesuai mekanisme aplikasi.
* Authorization dicek pada setiap protected route/action.
* User tidak dapat mengakses CMS hanya dengan mengetahui URL.
* File upload divalidasi.
* Input CMS divalidasi dan disanitasi.
* Jangan expose database credentials ke client.
* Environment secrets menggunakan environment variables.
* Error internal tidak ditampilkan kepada public user.

---

# 35. Deployment Recommendation

Karena aplikasi menggunakan:

* Next.js.
* PostgreSQL.
* Admin CMS.
* Image upload.

deployment yang direkomendasikan adalah:

### Option 1 — Managed Next.js Hosting + Managed PostgreSQL

Contoh arsitektur:

```text
User
 ↓
Next.js Application
 ↓
PostgreSQL
```

Untuk image upload, gunakan persistent object/file storage yang kompatibel dengan deployment target.

### Recommendation

Gunakan deployment managed yang mendukung Next.js dengan baik dan PostgreSQL managed untuk database.

Detail provider dapat dipilih saat implementation berdasarkan biaya, kemudahan maintenance, dan kebutuhan storage.

**Deployment provider bukan bagian dari core product requirement**, sehingga aplikasi harus tetap portable.

---

# 36. CMS Content Flow

Contoh alur admin menambahkan project:

```text
Login
 ↓
Admin Dashboard
 ↓
Projects
 ↓
Add Project
 ↓
Indonesia Tab
 ↓
Isi judul + deskripsi
 ↓
English Tab
 ↓
Isi judul + deskripsi
 ↓
Upload Image
 ↓
Isi Tech Stack
 ↓
Isi Demo URL
 ↓
Isi GitHub URL
 ↓
Pilih Status
 ↓
Atur Display Order
 ↓
Save
 ↓
Project tampil di Public Website
```

---

# 37. Recruiter User Flow

```text
Recruiter membuka website
 ↓
Home
 ↓
Melihat Hero
 ↓
Melihat About Preview
 ↓
Melihat Skills
 ↓
Melihat Featured Projects
 ↓
Klik Project
 ↓
Demo Project terbuka di TAB BARU
```

Recruiter dapat kapan saja:

```text
ID ↔ EN
Light ↔ Dark
```

dan tetap berpindah antar halaman portfolio.

---

# 38. Certificate User Flow

```text
Recruiter
 ↓
Certificates
 ↓
Klik Certificate
 ↓
Modal / Lightbox
 ↓
Melihat gambar dalam ukuran besar
 ↓
Close
```

Tidak meninggalkan halaman `/certificates`.

---

# 39. Contact User Flow

```text
Recruiter
 ↓
Contact
 ↓
Pilih platform
 ├── WhatsApp
 ├── LinkedIn
 ├── GitHub
 ├── Email
 └── Instagram
 ↓
External platform/contact application
```

Tidak menggunakan contact form.

---

# 40. Functional Requirements Summary

| ID    | Requirement                   | Priority |
| ----- | ----------------------------- | -------- |
| FR-01 | Public multi-page website     | Must     |
| FR-02 | Responsive seluruh device     | Must     |
| FR-03 | Light/Dark Mode               | Must     |
| FR-04 | Indonesian/English switcher   | Must     |
| FR-05 | CMS authentication            | Must     |
| FR-06 | Hero CMS                      | Must     |
| FR-07 | About CMS                     | Must     |
| FR-08 | Skills CRUD                   | Must     |
| FR-09 | Projects CRUD                 | Must     |
| FR-10 | Certificates CRUD             | Must     |
| FR-11 | Social Links CRUD             | Must     |
| FR-12 | Image upload                  | Must     |
| FR-13 | Project demo opens in new tab | Must     |
| FR-14 | Certificate image lightbox    | Must     |
| FR-15 | SEO                           | Must     |
| FR-16 | Admin profile/password        | Must     |
| FR-17 | Bilingual CMS content         | Must     |
| FR-18 | Secure admin routes           | Must     |
| FR-19 | Professional subtle animation | Should   |
| FR-20 | Dynamic display ordering      | Should   |

---

# 41. Non-Functional Requirements

### Performance

Website harus cepat dan ringan.

### Reliability

Public website tidak boleh bergantung pada session admin.

### Security

Admin CMS hanya dapat diakses oleh authenticated admin.

### Scalability

CMS harus memungkinkan penambahan:

* Project.
* Skill.
* Certificate.
* Social platform.

tanpa perubahan struktur public UI.

### Maintainability

Code harus memiliki separation yang jelas antara:

* UI.
* Content/data.
* CMS.
* Database access.
* Authentication.

---

# 42. Out of Scope

Untuk versi awal:

* Blog.
* News/article CMS.
* Comment system.
* Contact form.
* Online chat.
* User registration.
* Multiple admin roles.
* Recruiter account.
* Project detail page internal.
* AI-generated content.
* Professional certification verification system.

Portfolio hanya fokus pada personal branding, skills, projects, certificates, dan contact.

---

# 43. MVP Definition

MVP dianggap selesai jika:

### Public

* [ ] Home tersedia.
* [ ] About tersedia.
* [ ] Skills tersedia.
* [ ] Projects tersedia.
* [ ] Certificates tersedia.
* [ ] Contact tersedia.
* [ ] Navbar responsive.
* [ ] Footer tersedia.
* [ ] Light/Dark Mode bekerja.
* [ ] ID/EN switcher bekerja.
* [ ] Project demo terbuka di tab baru.
* [ ] Certificate dapat dibuka melalui lightbox.
* [ ] Responsive seluruh device.
* [ ] SEO dasar dan technical SEO tersedia.

### CMS

* [ ] Admin login bekerja.
* [ ] Admin dashboard bekerja.
* [ ] Hero dapat diedit.
* [ ] About dapat diedit.
* [ ] Skills CRUD bekerja.
* [ ] Projects CRUD bekerja.
* [ ] Certificates CRUD bekerja.
* [ ] Social Links CRUD bekerja.
* [ ] Image upload bekerja.
* [ ] Bilingual content bekerja.
* [ ] Admin dapat mengubah password.
* [ ] Protected route bekerja.

---

# 44. Acceptance Criteria

## Language

**Given** recruiter berada di website
**When** recruiter memilih English
**Then** public interface dan konten bilingual yang tersedia berubah ke English.

## Theme

**Given** recruiter menggunakan Light Mode
**When** recruiter memilih Dark Mode
**Then** seluruh interface berubah ke Dark Mode tanpa merusak readability.

## Project Demo

**Given** sebuah project memiliki Demo URL
**When** recruiter mengklik project
**Then** Demo URL terbuka pada tab browser baru.

## Certificate

**Given** recruiter berada di Certificates
**When** recruiter mengklik certificate
**Then** certificate image muncul dalam modal/lightbox.

## CMS

**Given** admin telah login
**When** admin mengubah project
**Then** perubahan tersimpan ke database dan ditampilkan pada public website.

## Unauthorized Admin

**Given** user belum login
**When** user membuka protected admin dashboard
**Then** user diarahkan ke halaman login.

## Image Upload

**Given** admin membuat project baru
**When** admin upload gambar valid
**Then** image tersimpan dan dapat digunakan sebagai project image.

## Social Links

**Given** admin menambahkan social platform baru
**When** admin menyimpan perubahan
**Then** platform tersebut dapat muncul di public Contact/Footer sesuai status dan urutannya.

---

# 45. Recommended Development Phases

## Phase 1 — Foundation

* Setup Next.js.
* React architecture.
* Tailwind CSS.
* PostgreSQL connection.
* Environment configuration.
* Base layout.
* Typography.
* Color system.
* Light/Dark theme.

## Phase 2 — Public Website

* Navbar.
* Home.
* About.
* Skills.
* Projects.
* Certificates.
* Contact.
* Footer.
* Responsive UI.

## Phase 3 — Internationalization

* ID/EN system.
* Language switcher.
* Bilingual CMS data structure.
* Localized metadata.

## Phase 4 — Admin CMS

* Admin authentication.
* Dashboard.
* Hero management.
* About management.
* Skills CRUD.
* Projects CRUD.
* Certificates CRUD.
* Social Links CRUD.

## Phase 5 — Media

* Image upload.
* Image validation.
* Image optimization.
* Profile/project/certificate image management.

## Phase 6 — SEO & Optimization

* Metadata.
* Open Graph.
* Sitemap.
* robots.txt.
* Performance optimization.
* Accessibility audit.

## Phase 7 — QA & Deployment

* Mobile testing.
* Tablet testing.
* Desktop testing.
* Browser testing.
* CMS testing.
* Authentication testing.
* Upload testing.
* Language testing.
* Theme testing.
* SEO validation.
* Production deployment.

---

# 46. Final Product Vision

Website ini bukan sekadar website untuk "memajang project".

Produk akhirnya harus berfungsi sebagai **personal portfolio profesional yang siap digunakan recruiter**.

Prioritas pengalaman:

```text
Professional
      ↓
Easy to Understand
      ↓
Easy to Navigate
      ↓
Fast
      ↓
Responsive
      ↓
Bilingual
      ↓
Easy to Maintain
```

Public website memberikan pengalaman yang clean dan profesional, sedangkan CMS memberikan kontrol penuh kepada pemilik untuk mengelola konten.

Arsitektur harus memungkinkan portfolio berkembang dari waktu ke waktu tanpa harus melakukan perubahan source code setiap kali ingin:

* Menambah project.
* Mengubah skill.
* Menambahkan sertifikat.
* Mengubah profile.
* Mengubah social media.
* Mengubah CTA.
* Mengubah konten Indonesia/English.

**End State:** sebuah portfolio personal Modern Professional dengan Next.js + React + Tailwind CSS + PostgreSQL, bilingual ID/EN, Light/Dark Mode, fully responsive, SEO-ready, dan memiliki private CMS yang memungkinkan seluruh konten dikelola secara mandiri.