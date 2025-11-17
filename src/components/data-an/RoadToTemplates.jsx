import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function RoadPortfolioData() {
  const portfolioSteps = [
    {
      title: "Exploratory Data Analysis (EDA)",
      desc: "Analisis eksploratif untuk memahami struktur data, distribusi variabel, dan pola awal yang menjadi dasar insight.",
      features: [
        "Statistik deskriptif",
        "Visualisasi interaktif",
        "Analisis korelasi",
        "Deteksi outlier",
      ],
      route: "#",
      image: "/images/icon-eda.png",
    },
    {
      title: "Data Cleaning & Preprocessing",
      desc: "Proses pembersihan data untuk memastikan kualitas sebelum masuk tahap analisis atau pemodelan.",
      features: [
        "Mengatasi missing value",
        "Normalisasi & encoding",
        "Pembersihan noise",
        "Standarisasi data",
      ],
      route: "#",
      image: "/images/icon-cleaning.png",
    },
    {
      title: "Machine Learning Modeling",
      desc: "Penerapan algoritma ML untuk prediksi, klasifikasi, clustering, dan rekomendasi berdasarkan dataset.",
      features: [
        "Model supervised & unsupervised",
        "Evaluasi model",
        "Optimasi hyperparameter",
        "Feature engineering",
      ],
      route: "#",
      image: "/images/icon-ml.png",
    },
    {
      title: "Dashboard & Data Visualization",
      desc: "Visualisasi tingkat lanjut untuk memudahkan pemahaman data melalui grafik, dashboard, dan laporan interaktif.",
      features: [
        "Dashboard profesional",
        "Visualisasi dinamis",
        "Pemilihan chart sesuai kebutuhan",
        "Insight dari visual",
      ],
      route: "#",
      image: "/images/icon-dashboard.png",
    },
    {
      title: "Forecasting & Time Series",
      desc: "Prediksi data deret waktu menggunakan metode statistik hingga deep learning.",
      features: [
        "ARIMA, SARIMA, ETS",
        "LSTM & Bi-LSTM",
        "Analisis musiman",
        "Evaluasi error metrik",
      ],
      route: "#",
      image: "/images/icon-forecast.png",
    },
  ];

  return (
    <section className="mt-20 px-6 md:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-12">
        Road to Routing Portofolio Analisis Data
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
        {portfolioSteps.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            {/* Bagian gambar */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 flex justify-center items-center">
              <img
                src={item.image}
                alt={item.title}
                className="object-contain w-auto h-48 sm:h-44 md:h-52 lg:h-56 mx-auto drop-shadow-md"
              />
            </div>

            {/* Bagian konten */}
            <div className="p-6 flex flex-col flex-grow justify-between text-center md:text-left">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>

                <ul className="text-gray-700 mb-4 list-disc list-inside text-left space-y-1">
                  {item.features.map((feature, j) => (
                    <li key={j}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2"
                >
                  <Link to={item.route}>Lihat Portofolio</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
