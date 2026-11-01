import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-bold tracking-tight text-[#39a875]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-white">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-sm text-neutral-400">
        Maaf, halaman atau proyek yang Anda cari tidak tersedia.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-[#39a875] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#34d399]"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
