import { FaInstagram, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0c0d20] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
        
        {/* Bagian Kiri (Logo + Nama + Deskripsi) */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/images/logo.png"
            alt="ByBee Logo"
            className="h-10 mb-3"
          />
          <h2 className="text-yellow-400 text-xl font-bold">ByBee Project</h2>
          <p className="text-gray-300 text-sm">
            Solusi digital dalam menjangkau pertumbuhan bisnis Anda
          </p>
        </div>

        {/* Bagian Kanan (Ikon Sosial Media) */}
        <div className="flex space-x-5 text-2xl text-gray-300">
          <a href="https://instagram.com/bybeeproject" className="hover:text-yellow-400 transition"><FaInstagram /></a>
          <a href="https://wa.me/62895417790000" className="hover:text-yellow-400 transition"><FaWhatsapp /></a>
          <a href="https://linkedin.com" className="hover:text-yellow-400 transition"><FaLinkedin /></a>
          <a href="https://github.com" className="hover:text-yellow-400 transition"><FaGithub /></a>
        </div>
      </div>

      {/* Garis pemisah */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © 2025 <span className="text-yellow-400 font-semibold">ByBee Project</span>. All Rights Reserved.
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/62895417790000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* WhatsApp Icon */}
          <img
            src="/images/whatsapp-icon.png"
            alt="WhatsApp"
            className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          />

          {/* Glowing Effect */}
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 blur-md animate-ping"></span>
        </div>
      </a>
    </footer>
  );
}
