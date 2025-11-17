import { Link } from "react-router-dom";

const services = [
  {
    title: "Web Development",
    desc: "Website profesional untuk memperkuat citra bisnis dan identitas Anda.",
    link: "/web-dev",
    img: "/images/icon-web-development.png",
    layout: "highlight", // blok besar
  },
  {
    title: "Pengambilan & Analisis Data",
    desc: "Membantu Anda dalam pengambilan keputusan yang berbasiskan data.",
    link: "/data-an",
    img: "/images/icon-data-analyst.png",
    layout: "highlight", // blok kecil
  },
  {
    title: "Sosial Media",
    desc: "Desain feed & konten sosial media kreatif untuk branding perusahaan Anda.",
    link: "/desain-sosmed",
    img: "/images/icon-desain-sosial-media.png",
    layout: "highlight", // blok besar dengan background
  }
];

export default function Services() {
  return (
    <section id="services" className="py-10 bg-white-100">
      <h1 className="items-center text-center text-2xl md:text-4xl font-extrabold">Layanan yang Kami Sediakan</h1>
      <div className="container mx-auto px-4 space-y-10">
        {/* Large block */}
        {services
          .filter((s) => s.layout === "large")
          .map((service, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full md:w-1/2 object-contain p-6"
              />
              <div className="p-6 md:w-1/2 text-center md:text-left">
                <h4 className="text-2xl font-semibold">{service.title}</h4>
                <p className="mt-2 text-gray-600">{service.desc}</p>
                <Link
                  to="/web-dev"
                  className="mt-4 inline-block px-5 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          ))}

        {/* Small blocks (grid 2 kolom) */}
        <div className="grid md:grid-cols-2 gap-6">
          {services
            .filter((s) => s.layout === "small")
            .map((service, i) => (
              <div
                key={i}
                className="flex items-center bg-white shadow rounded-xl p-4 hover:shadow-md transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-20 h-20 object-contain mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                  <a
                    href={service.link}
                    className="mt-2 inline-block text-blue-600 font-medium hover:underline"
                  >
                    Selengkapnya
                  </a>
                </div>
              </div>
            ))}
        </div>

        {/* Highlight block */}
        {services
          .filter((s) => s.layout === "highlight")
          .map((service, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center bg-yellow-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-90 md:w-90 object-contain mb-4 md:mb-0"
              />
              <div className="md:ml-6 text-center md:text-left">
                <h4 className="text-2xl font-semibold">{service.title}</h4>
                <p className="mt-2 text-gray-700">{service.desc}</p>
                <a
                  href={service.link}
                  className="mt-4 inline-block px-5 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                >
                  Selengkapnya
                </a>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
