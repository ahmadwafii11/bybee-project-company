import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function ModelWebsite() {
  const businessModels = [
    {
      title: "Website Pribadi / Portofolio",
      desc: "Tingkatkan citra profesional Anda dengan website pribadi yang menampilkan karya, pengalaman, dan profil secara elegan. Cocok untuk freelancer, kreator, maupun profesional muda.",
      features: [
        "Desain elegan & personal branding",
        "Halaman portofolio dan kontak",
        "Integrasi media sosial & form kontak",
        "SEO dasar & mobile responsive",
      ],
      price: "Mulai dari Rp 1.500.000",
      template: "/images/icon-web-dev-portpri.png",
    },
    {
      title: "Website Sekolah / Lembaga Pendidikan",
      desc: "Solusi digital lengkap untuk sekolah, kampus, dan lembaga pelatihan. Memudahkan pengelolaan informasi, pendaftaran siswa, hingga publikasi kegiatan.",
      features: [
        "Halaman profil sekolah & guru",
        "Berita & agenda kegiatan",
        "Formulir pendaftaran online",
        "Dashboard admin sederhana",
      ],
      price: "Mulai dari Rp 3.000.000",
      template: "/images/icon-web-dev-school.png",
    },
    {
      title: "Website Perusahaan / Bisnis",
      desc: "Bangun kepercayaan klien dengan website profesional untuk menampilkan profil bisnis, produk, dan layanan Anda secara kredibel & modern.",
      features: [
        "Desain premium sesuai brand",
        "Halaman layanan & portofolio bisnis",
        "Form kontak & integrasi WhatsApp",
        "Optimasi SEO & Google Business",
      ],
      price: "Mulai dari Rp 4.500.000",
      template: "/images/icon-web-dev-comp.png",
    },
  ];

  return (
    <section className="mt-20 px-6 md:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-12">
        Tipe Website yang Kami Tawarkan
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
        {businessModels.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            {/* Bagian gambar */}
            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 flex justify-center items-center">
              <img
                src={item.template}
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
                <p className="text-yellow-600 font-bold mb-4 text-lg">{item.price}</p>
                <Button
                  asChild
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl py-2"
                >
                  <Link to="/web-dev/templates">Lihat Template</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
