import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavbarWebDev() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center">
            <li>
              <a 
                href="#"
                className="inline-block px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-lg"
              >
                Masuk
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="inline-block px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-lg"
              >
                Kembali
              </Link>
            </li>
            {/* Dropdown Bahasa Desktop */}
            <li className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <img src="/images/globe_white1.png" alt="globe_icon" className="w-7 h-7"/>
                <svg
                  className={`w-2.5 h-2.5 ml-3 transform transition-transform ${langOpen ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute mt-2 right-0 z-10 bg-white rounded-lg shadow-sm w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:text-white">
                        <img src="/images/flag_indonesia.jpeg" alt="flag_indonesia" className="w-6 h-4 rounded-sm"/>
                        <span>Indonesia</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:text-white">
                        <img src="/images/flag_english.jpeg" alt="flag_english" className="w-6 h-4 rounded-sm"/>
                        <span>English</span>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* ================= HAMBURGER (MOBILE ONLY) ================= */}
        <button 
          id="menu-btn" 
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <nav className="md:hidden bg-gray-100 p-4 text-left">
          <ul className="flex flex-col gap-4">
            <li><a href="#login" onClick={() => setIsOpen(false)}>Masuk</a></li>

            {/* Dropdown Bahasa Mobile */}
            <li>
              <button 
                className="w-full flex items-center justify-between bg-gray-100 rounded-md text-left font-medium"
                onClick={() => setLangOpen(!langOpen)}
              >
                <span className="flex items-left justify-left text-gray-800">
                  Bahasa
                </span>
                <svg 
                  className={`w-4 h-4 transform transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>


              {langOpen && (
                <div className="mt-2 w-full bg-white rounded-lg shadow-sm">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a href="#" className="flex items-center gap-2 px-4 py-2 dark:hover:bg-gray-300 dark:hover:text-white">
                        <img src="/images/flag_indonesia.jpeg" alt="flag_indonesia" className="w-6 h-4 rounded-sm"/>
                        <span>Indonesia</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 px-4 py-2 dark:hover:bg-gray-300 dark:hover:text-white">
                        <img src="/images/flag_english.jpeg" alt="flag_english" className="w-6 h-4 rounded-sm"/>
                        <span>English</span>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Kembali
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
