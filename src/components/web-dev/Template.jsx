import { Link } from "react-router-dom";
import { templates } from "../data/templates";

export default function Template() {
  return (
    <section className="px-6 md:px-20 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Pilihan Template Website Kami
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
              </div>
              <Link
                to={`/web-dev/template/${template.id}`}
                className="inline-block text-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl py-2 mt-auto transition duration-200"
              >
                Lihat Template
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
