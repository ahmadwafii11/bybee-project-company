import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const texts = [
    "Website modern yang siap meningkatkan kepercayaan bisnis Anda.",
    "Desain konten kreatif untuk branding digital yang konsisten.",
    "Insight data yang membantu Anda mengambil keputusan lebih tepat."
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0); // kalimat ke berapa
  const [subIndex, setSubIndex] = useState(0); // posisi huruf
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) return;

    const currentText = texts[index];
    let typingSpeed = deleting ? 40 : 80;

    const interval = setInterval(() => {
      setDisplayedText(
        deleting
          ? currentText.substring(0, subIndex - 1)
          : currentText.substring(0, subIndex + 1)
      );
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, typingSpeed);

    if (!deleting && subIndex === currentText.length) {
      clearInterval(interval);
      setTimeout(() => setDeleting(true), 1500); // tunggu sebelum hapus
    } else if (deleting && subIndex === 0) {
      clearInterval(interval);
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length); // loop ke teks berikutnya
    }

    return () => clearInterval(interval);
  }, [subIndex, deleting, index, texts]);

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center md:justify-end text-center md:text-right h-screen overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 flex justify-center md:justify-start items-center overflow-visible">
        <img
          src="/images/background-image.jpeg"
          alt="Digital Solutions"
          className="
            object-contain
            mt-8 md:mt-0
            w-[150%] sm:w-[100%] md:w-[60%] lg:w-[85%]
            h-auto
            translate-y-[-16%] md:translate-y-0 md:translate-x-0
            transition-all duration-500 ease-in-out
          "
        />
      </div>

      {/* Blok putih transparan di atas gambar (khusus mobile) */}
      <div className="absolute inset-0 bg-white/60 md:hidden"></div>

      {/* Konten teks */}
      <div className="relative z-10 px-6 md:px-16 max-w-xl mt-10 md:mt-0">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-black drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Solusi Digital Dalam Menjangkau Pertumbuhan Bisnis Anda
        </motion.h2>

        <p className="mt-4 text-base md:text-xl text-gray-700 font-medium">
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>

        <motion.a
          href="#services"
          className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-white rounded-lg shadow-lg hover:bg-yellow-500 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Jelajahi Layanan
        </motion.a>
      </div>
    </section>




  );
}
