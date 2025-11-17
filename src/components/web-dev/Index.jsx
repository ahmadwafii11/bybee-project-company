export default function IndexWebDev() {
  return (
    <div className="relative bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* ===== Background Image ===== */}
      <div className="absolute inset-0">
        <img
          src="/images/background-indexwebdev.png"
          alt="Digital Solutions"
          className="
            w-full h-full 
            object-cover 
            object-center
            opacity-70 md:opacity-100 
            transition-all duration-500
          "
        />
        {/* Overlay transparan untuk mobile */}
        <div className="absolute inset-0 bg-white/50 bg-transparent" />
      </div>

      {/* ===== Konten ===== */}
      <section className="relative z-10 container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Teks */}
        <div className="text-left md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-500">
            Layanan Web Development
          </h1>
          <p className="text-base md:text-xl text-white-100 font-medium max-w-lg">
            Kami menyediakan layanan pembuatan website modern, cepat, dan
            responsif untuk membantu Anda tampil profesional di dunia digital.
            Pilih jenis website sesuai kebutuhan Anda, dimulai dari portofolio pribadi,
            lembaga pendidikan, hingga perusahaan.
          </p>
        </div>

        {/* Gambar tambahan (khusus desktop) */}
        <div className="hidden md:flex md:w-1/2 justify-end">
          <img
            src="/images/icon-web-development.png"
            alt="Laptop Illustration"
            className="w-[100%] rounded-lg object-cover"
          />
        </div>
      </section>
    </div>
  );
};
