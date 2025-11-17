export default function IndexDataAnalyst() {
  return (
    <div className="relative bg-gray-50 min-h-screen overflow-hidden pt-30 pb-15">
      <section className="container mx-auto px-5 sm:px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* ========= TEKS ========= */}
        <div className="text-left md:w-1/2 space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-yellow-400 leading-tight drop-shadow-sm">
            Layanan <br className="hidden sm:block" /> Data Analyst
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium max-w-lg leading-relaxed">
            Kami membantu Anda dalam{" "}
            <span className="text-yellow-500 font-semibold">
              mengambil keputusan berbasis data
            </span>
            . Mulai dari pengumpulan, pembersihan, visualisasi, hingga analisis
            mendalam untuk mendukung strategi bisnis dan penelitian Anda.
          </p>

          {/* Tombol kembali seperti tampilan lama (berdampingan di mobile) */}
          <div className="flex flex-row gap-3 pt-3">
            <a
              href="#layanan-data"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 shadow-md text-center"
            >
              Lihat Layanan
            </a>
            <a
              href="#konsultasi"
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold px-5 py-3 rounded-xl transition duration-300 text-center"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>

        {/* ========= GAMBAR ========= */}
        <div className="md:w-1/2 flex justify-center md:justify-end relative mt-6 sm:mt-10 md:mt-0">
          <div className="relative w-full md:w-[90%] flex justify-center">
            <img
              src="../images/icon-data-analyst-dashboard.jpg"
              alt="Data Visualization Dashboard"
              className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl object-contain"
            />

            <img
              src="/images/char-data-sciencetist.png"
              alt="Data Scientist Character"
              className="absolute -bottom-8 sm:-bottom-10 left-2 w-20 sm:w-28 md:w-36 drop-shadow-lg animate-float"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
