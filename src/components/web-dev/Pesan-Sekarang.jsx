import { Button } from "../ui/button";

export default function PesanSekarang() {
  return (
      <>
        <section className="mt-24 text-center px-6 md:px-20">
          {/* ================= CALL TO ACTION ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Siap Membuat Website Impian Anda?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Konsultasikan kebutuhan website Anda dengan tim profesional kami.
            Kami bantu wujudkan solusi digital yang sesuai dengan target bisnis
            dan gaya visual yang Anda inginkan.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-xl text-lg">
            Pesan Sekarang
          </Button>
        </section>  
      </>
  );
};