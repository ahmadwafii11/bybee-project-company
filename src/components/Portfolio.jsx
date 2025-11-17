export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 container mx-auto px-4 text-center">
      <h3 className="text-2xl font-bold mb-10">Portofolio</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <img src="/images/portfolio1.png" alt="Portfolio 1" className="rounded-xl shadow"/>
        <img src="/images/portfolio2.png" alt="Portfolio 2" className="rounded-xl shadow"/>
        <img src="/images/portfolio3.png" alt="Portfolio 3" className="rounded-xl shadow"/>
      </div>
    </section>
  );
}
