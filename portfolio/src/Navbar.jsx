import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed tracking-wide top-0 left-0 w-full bg-black text-white p-4 shadow-md z-50 flex justify-between items-center">
      <h1
        className="text-2xl font-bold cookie-font"
        style={{ textShadow: "0 0 15px rgba(255,255,255,0.5)" }}
      >
        Navraj Singh's Portfolio
      </h1>

      <div className="ml-auto flex space-x-6">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          &#127968; Home
        </Link>
        <Link
          to="/about"
          className={`nav-link ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          &#129489; About Me
        </Link>
        <Link
          to="/projects"
          className={`nav-link ${
            location.pathname === "/projects" ? "active" : ""
          }`}
        >
          &#128640; Projects
        </Link>
        <Link
          to="/contact"
          className={`nav-link ${
            location.pathname === "/contact" ? "active" : ""
          }`}
        >
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
          position: relative;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease-in-out;
          text-decoration: none;
        }

        /* Glow effect on hover */
        .nav-link:hover {
          background: white;
          color: black;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* Glowing effect */
        }

        .nav-link::before {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0%;
          height: 3px;
          background-color: white;
          transition: all 0.3s ease-in-out;
        }

        .nav-link:hover::before {
          width: 100%;
          left: 0;
        }

        /* Active Page Indicator */
        .nav-link.active::before {
          width: 100%;
          left: 0;
          background-color: white;
          height: 3px;
        }

        .nav-link.active {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </nav>
  );
}
