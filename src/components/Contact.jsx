import { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSuccess(false);
    setIsError(false);

    emailjs
      .sendForm(
        "service_hi0rwiw", // ganti dengan Service ID kamu
        "template_vtx6o0d", // ganti dengan Template ID kamu
        e.target,
        "in3kYJ2UcTgKspA5k" // ganti dengan Public Key kamu
      )
      .then(
        () => {
          setIsSending(false);
          setIsSuccess(true);
          e.target.reset();
        },
        (error) => {
          console.error("Error:", error);
          setIsSending(false);
          setIsError(true);
        }
      );
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900">
          Kontak Kami
        </h3>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Nama"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />

          <select
            name="title"
            required
            defaultValue=""
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
            <option value="" disabled>
              Keperluan
            </option>
            <option className="hover:bg-yellow-500" value="Web Development">Web Development</option>
            <option className="hover:bg-yellow-500" value="Pengambilan & Analisis Data">Pengambilan & Analisis Data</option>
            <option className="hover:bg-yellow-500" value="Desain Sosial Media">Desain Sosial Media</option>
          </select>

          <textarea
            name="message"
            placeholder="Pesan"
            required
            className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={isSending}
            className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
              isSending
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
            }`}
          >
            {isSending ? "Mengirim..." : "Kirim Pesan"}
          </button>

          {isSuccess && (
            <p className="text-green-600 font-medium mt-2">
              ✅ Pesan berhasil dikirim!
            </p>
          )}
          {isError && (
            <p className="text-red-600 font-medium mt-2">
              ❌ Gagal mengirim pesan. Coba lagi nanti.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
