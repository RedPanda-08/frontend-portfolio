import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed tracking-wide top-0 left-0 w-full bg-black text-white p-4 shadow-md z-50 flex justify-between items-center">
      <h1
        className="text-2xl font-bold cookie-font"
        style={{ textShadow: "0 0 15px rgba(255,255,255,0.5)" }}
      >
        Navraj Singh's Portfolio
      </h1>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      
      {/* Navigation Links */}
      <div 
        className={`md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full bg-black md:w-auto transition-all duration-300 ${isOpen ? "block" : "hidden"} md:block`}>
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          &#127968; Home
        </Link>
        <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
          &#129489; About Me
        </Link>
        <Link to="/projects" className={`nav-link ${location.pathname === "/projects" ? "active" : ""}`}>
          &#128640; Projects
        </Link>
        <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
          &#128231; Contact Me
        </Link>
      </div>

      {/* Import Google Fonts & Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');

        .cookie-font {
          font-family: 'Cookie', cursive;
          font-size: 2rem;
        }

        .nav-link {
          display: block;
          text-align: center;
          font-size: 1.1rem;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease-in-out;
          text-decoration: none;
        }

        .nav-link:hover {
          background: white;
          color: black;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .nav-link.active {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .nav-link {
            padding: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}
