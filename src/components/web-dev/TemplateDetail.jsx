import { useParams, Link } from "react-router-dom";
import { templates } from "../data/templates";

export default function TemplateDetail() {
  const { id } = useParams();
  const template = templates.find((item) => item.id === parseInt(id)); // ✅ ubah ke number

  if (!template) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Template tidak ditemukan</h2>
        <Link to="/web-dev/templates" className="text-yellow-600 hover:underline">
          Kembali ke daftar template
        </Link>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-20 mt-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <img
          src={template.image}
          alt={template.name}
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{template.name}</h1>
          <p className="text-gray-600 mb-6">{template.description}</p>

          {/* Contoh fitur dummy agar tidak error */}
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Fitur Unggulan:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Desain responsif dan modern</li>
            <li>Mudah dikustomisasi</li>
            <li>Optimasi SEO dan performa</li>
          </ul>

          <Link
            to="/web-dev/templates"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            ← Kembali ke Template
          </Link>
        </div>
      </div>
    </section>
  );
}
