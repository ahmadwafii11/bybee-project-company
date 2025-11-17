export default function AlurLayananData() {
  const steps = [
    {
      title: "1. Konsultasi Awal",
      desc: "Diskusikan kebutuhan Anda, tujuan analisis, serta jenis data yang tersedia.",
      icon: "📞",
    },
    {
      title: "2. Pengumpulan & Pembersihan Data",
      desc: "Data dikumpulkan, diproses, dibersihkan, dan disiapkan agar siap dianalisis.",
      icon: "🧹",
    },
    {
      title: "3. Analisis & Exploratory Data",
      desc: "Analisis statistik, visualisasi, dan pola awal untuk memahami kondisi data.",
      icon: "📊",
    },
    {
      title: "4. Pemodelan / Machine Learning",
      desc: "Penerapan model prediksi, klasifikasi, clustering, atau teknik analisis lainnya.",
      icon: "🤖",
    },
    {
      title: "5. Interpretasi & Insight",
      desc: "Kami memberikan hasil analisis yang mudah dipahami dalam bentuk insight actionable.",
      icon: "💡",
    },
    {
      title: "6. Laporan & Presentasi",
      desc: "Anda menerima laporan lengkap, dashboard, atau presentasi data yang profesional.",
      icon: "📑",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-5 md:px-16 text-center">
        
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Alur Layanan Analisis Data
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Berikut adalah proses kerja kami dalam membantu Anda mengolah data
          menjadi insight yang bermanfaat dan dapat digunakan dalam pengambilan keputusan.
        </p>

        {/* GRID STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
