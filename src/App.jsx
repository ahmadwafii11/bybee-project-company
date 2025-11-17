import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NavbarWebDev from "./components/web-dev/Navbar";
import IndexWebDev from "./components/web-dev/Index";
import Why from "./components/web-dev/Why";
import ModelWebsite from "./components/web-dev/Model-Website";
import PesanSekarang from "./components/web-dev/Pesan-Sekarang";
import Template from "./components/web-dev/Template";
import TemplateDetail from "./components/web-dev/TemplateDetail";
import IndexDataAnalyst from "./components/data-an/Index";
import WhyDataAnalyst from "./components/data-an/Why";
import AlurLayananData from "./components/data-an/ProsesAnalisisData";
import RoadPortfolioData from "./components/data-an/RoadToTemplates";
import NotFound from "./components/error/NotFound";

function App() {
  return (
    <Router>
      {/* Navbar Global */}
      <NavbarWebDev />

      {/* Semua Route Harus di Dalam <Routes> */}
      <Routes>
        {/* Halaman Utama */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Services />
              <Faq />
              <Contact />
            </>
          }
        />

        {/* Halaman Web Development */}
        <Route
          path="/web-dev"
          element={
            <>
              <IndexWebDev />
              <Why />
              <ModelWebsite />
              <PesanSekarang />
              <Faq />
              <Contact />
            </>
          }
        />

        {/* Halaman Template */}
        <Route path="/web-dev/templates" element={<Template />} />

        {/* Halaman Detail Template */}
        <Route path="/web-dev/templates/:id" element={<TemplateDetail />} />

        {/* Halaman Data Analyst */}
        <Route
          path="/data-an"
          element={
            <>
              <IndexDataAnalyst />
              <WhyDataAnalyst />
              <AlurLayananData />
              <RoadPortfolioData />
              <Faq />
              <Contact />
            </>
          }
        />
        {/* Halaman Desain Sosmed */}
        <Route
          path="/desain-sosmed"
          element={
            <>
              <NotFound/>
            </>
          }
        />
      </Routes>
      

      {/* Footer Global */}
      <Footer />
    </Router>
  );
}

export default App;