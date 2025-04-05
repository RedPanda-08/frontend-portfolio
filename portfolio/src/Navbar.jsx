import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false); // Close menu on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed tracking-wide top-0 left-0 w-full bg-black text-white p-4 shadow-md z-50 flex justify-between items-center">
      <h1
        className="text-2xl font-bold cookie-font"
        style={{ textShadow: "0 0 15px rgba(255,255,255,0.5)" }}
      >
        Navraj Singh's Portfolio
      </h1>

      {/* Hamburger Menu (Mobile) */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1">
            <span className={`h-0.5 bg-white transition-all ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`h-0.5 bg-white transition-all ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`h-0.5 bg-white transition-all ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </div>
        </button>
      )}

      {/* Desktop Links */}
      {!isMobile && (
        <div className="ml-auto flex space-x-6">
          <NavLink to="/" currentPath={location.pathname}>
            &#127968; Home
          </NavLink>
          <NavLink to="/about" currentPath={location.pathname}>
            &#129489; About Me
          </NavLink>
          <NavLink to="/projects" currentPath={location.pathname}>
            &#128640; Projects
          </NavLink>
          <NavLink to="/contact" currentPath={location.pathname}>
            &#128231; Contact Me
          </NavLink>
        </div>
      )}

      {/* Mobile Menu (Dropdown) */}
      {isMobile && isOpen && (
        <div className="absolute top-full left-0 w-full bg-black py-4 px-6 shadow-lg flex flex-col gap-4">
          <MobileNavLink to="/" currentPath={location.pathname} onClick={() => setIsOpen(false)}>
            &#127968; Home
          </MobileNavLink>
          <MobileNavLink to="/about" currentPath={location.pathname} onClick={() => setIsOpen(false)}>
            &#129489; About Me
          </MobileNavLink>
          <MobileNavLink to="/projects" currentPath={location.pathname} onClick={() => setIsOpen(false)}>
            &#128640; Projects
          </MobileNavLink>
          <MobileNavLink to="/contact" currentPath={location.pathname} onClick={() => setIsOpen(false)}>
            &#128231; Contact Me
          </MobileNavLink>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');

        .cookie-font {
          font-family: 'Cookie', cursive;
          font-size: 2rem;
        }

        /* Desktop NavLink */
        .nav-link {
          position: relative;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease-in-out;
          text-decoration: none;
        }

        .nav-link:hover {
          background: white;
          color: black;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
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

        .nav-link.active::before {
          width: 100%;
          left: 0;
          background-color: white;
          height: 3px;
        }

        .nav-link.active {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        /* Mobile NavLink */
        .mobile-nav-link {
          padding: 0.75rem 0;
          font-size: 1.2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }

        .mobile-nav-link:hover {
          color: #ddd;
          padding-left: 0.5rem;
        }

        .mobile-nav-link.active {
          color: white;
          font-weight: bold;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .cookie-font {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </nav>
  );
}

// Reusable NavLink component (Desktop)
const NavLink = ({ to, currentPath, children }) => (
  <Link
    to={to}
    className={`nav-link ${currentPath === to ? "active" : ""}`}
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, currentPath, onClick, children }) => (
  <Link
    to={to}
    className={`mobile-nav-link ${currentPath === to ? "active" : ""}`}
    onClick={onClick}
  >
    {children}
  </Link>
);