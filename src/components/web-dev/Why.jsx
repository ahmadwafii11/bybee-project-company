import { Globe, Zap, Wrench } from "lucide-react";

export default function Why() {
  return (
    <section className="mt-20 px-6 md:px-16 py-10 bg-gradient-to-b from-white to-gray-50">
      {/* ================= WHY SECTION ================= */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
          Mengapa Memilih <span className="text-yellow-500">Layanan Web Development</span> Kami?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Kami tidak hanya membuat website. Kami juga akan membantu Anda dalam membangun
          <span className="font-semibold text-gray-800"> identitas digital yang kuat dan berkelanjutan. </span>  
          Dengan desain responsif, performa cepat, serta tampilan modern, website Anda siap
          menarik perhatian pengunjung dan meningkatkan kepercayaan.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 mb-5 bg-blue-100 text-blue-600 rounded-full">
            <Globe size={28} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-800">Desain Responsif & Modern</h3>
          <p className="text-gray-600">
            Website tampil sempurna di berbagai perangkat seperti desktop, tablet, hingga smartphone.  
            Fokus pada kecepatan dan pengalaman pengguna.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 mb-5 bg-green-100 text-green-600 rounded-full">
            <Zap size={28} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-800">Kinerja Cepat & SEO Friendly</h3>
          <p className="text-gray-600">
            Optimasi performa dan SEO membantu website Anda muncul lebih tinggi di hasil pencarian Google.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 mb-5 bg-purple-100 text-purple-600 rounded-full">
            <Wrench size={28} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-800">Dukungan & Maintenance</h3>
          <p className="text-gray-600">
            Kami siap membantu pembaruan, perawatan, dan pengembangan jangka panjang agar website Anda tetap optimal.
          </p>
        </div>
      </div>
    </section>
  );
}
