import { useState } from "react";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Berapa biaya yang diperlukan untuk membuat website?",
      answer:
        "ByBee memberikan layanan pembuatan website secara custom yang disesuaikan dengan kebutuhan. Oleh karena itu, penawaran harga secara akurat baru dapat diketahui setelah proses konsultasi.",
    },
    {
      question: "Apa saja yang perlu dipersiapkan untuk membuat website?",
      answer:
        "Anda perlu menyiapkan konten, gambar, dan informasi bisnis agar kami dapat merancang website yang sesuai dengan identitas dan kebutuhan Anda.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk membuat website?",
      answer:
        "Waktu pembuatan website tergantung kompleksitas, biasanya diantara 3 hingga 4 minggu.",
    },
    {
      question: "Apa saja layanan yang saya dapatkan dari ByBee?",
      answer:
        "Kami menyediakan layanan pembuatan website, branding, pengelolaan konten digital, hingga optimasi SEO.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 container mx-auto px-4">
      <h1 className="items-center text-center text-2xl md:text-4xl font-extrabold mb-10">
        <span className="text-black-900">Pertanyaan yang Sering</span>{" "}
        <span className="text-yellow-500">Ditanyakan</span>
      </h1>

      <div className="max-w-6xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-md shadow-sm transition-all duration-300 ${
              activeIndex === index ? "bg-yellow-400 text-white" : "bg-white text-gray-800"
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left px-6 py-4 font-semibold focus:outline-none"
            >
              {faq.question}
              <span className="text-2xl font-bold">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-4 py-4 text-sm md:text-base border-t border-gray-300 md:border-none bg-white text-gray-800 text-left md:text-justify leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
