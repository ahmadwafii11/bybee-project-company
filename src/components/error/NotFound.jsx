export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-7xl font-extrabold text-yellow-500">404</h1>
      <p className="text-gray-600 mt-4 text-lg">Halaman tidak ditemukan.</p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-xl"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
