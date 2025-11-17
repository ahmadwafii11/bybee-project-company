import { BarChart3, LineChart, Cog } from "lucide-react";

export default function WhyDataAnalyst() {
  return (
    <section className="mt-20 px-6 md:px-16 py-10 bg-gradient-to-b from-white to-gray-50">
      {/* ================= TITLE & DESCRIPTION ================= */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
          Mengapa Memilih <span className="text-yellow-500">Layanan Data Analyst</span> Kami?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Kami membantu Anda dalam membangun <span className="font-semibold text-gray-800">strategi berbasis data</span> 
          — mulai dari pengumpulan, pembersihan, hingga visualisasi dan analisis mendalam 
          untuk mendukung pengambilan keputusan yang lebih cerdas dan efisien.
        </p>
      </div>

      {/* ================= FEATURE CARDS ================= */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* Card 1 - Analisis Data Prediktif */}
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 mb-5 bg-blue-100 text-blue-600 rounded-full">
            <BarChart3 size={28} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-800">Analisis Data Prediktif</h3>
          <p className="text-gray-600">
            Gunakan machine learning untuk memprediksi tren, peluang, dan risiko bisnis di masa depan agar keputusan lebih strategis.
          </p>
        </div>

        {/* Card 2 - Visualisasi Data Interaktif */}
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 mb-5 bg-green-100 text-green-600 rounded-full">
            <LineChart size={28} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-800">Visualisasi Data Interaktif</h3>
          <p className="text-gray-600">
            Dashboard dinamis dengan Power BI, Tableau, atau Metabase untuk insight cepat, visual menarik, dan keputusan yang tepat.
          </p>
        </div>

        {/* Card 3 - Data Cleaning & Automasi */}
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
          <div className="flex items-center justify-center w-14 h-14 mb-5 bg-yellow-100 text-yellow-600 rounded-full">
            <Cog size={28} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-800">Data Cleaning & Automasi</h3>
          <p className="text-gray-600">
            Bersihkan, olah, dan otomatisasi pipeline data Anda agar proses analisis lebih cepat dan efisien.
          </p>
        </div>
      </div>
    </section>
  );
}
