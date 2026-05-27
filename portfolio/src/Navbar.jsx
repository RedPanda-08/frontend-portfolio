import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.1rem clamp(1.5rem, 6vw, 4rem)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backgroundColor: "rgba(13, 14, 21, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxSizing: "border-box",
      }}
    >
      {/* Brand Monogram Identity */}
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "1.1rem",
          color: "#ffffff",
          letterSpacing: "0.02em",
          userSelect: "none"
        }}
      >
        Navraj Singh
      </span>

      {/* Hamburger Toggle (Mobile Viewports) */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            outline: "none"
          }}
          aria-label="Toggle Navigation Grid"
        >
          <span style={{ display: "block", width: "22px", height: "1px", backgroundColor: "#ffffff", transition: "transform 0.25s ease", transform: isOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1px", backgroundColor: "#ffffff", transition: "opacity 0.2s ease", opacity: isOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1px", backgroundColor: "#ffffff", transition: "transform 0.25s ease", transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      )}

      {/* Desktop Navigation Links */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
          <NavLink to="/projects" currentPath={location.pathname}>Projects</NavLink>
          <NavLink to="/contact" currentPath={location.pathname}>Contact</NavLink>
        </div>
      )}

      {/* Mobile Modular Grid Dropdown Menu */}
      {isMobile && isOpen && (
        <div 
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "rgba(13, 14, 21, 0.98)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxSizing: "border-box",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)"
          }}
        >
          <MobileNavLink to="/" currentPath={location.pathname} onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/about" currentPath={location.pathname} onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/projects" currentPath={location.pathname} onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
          <MobileNavLink to="/contact" currentPath={location.pathname} onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
        </div>
      )}

      {/* Global CSS Stylesheet Scope Injection */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500&display=swap');

        .nav-anchor {
          font-family: "'Outfit', sans-serif";
          font-size: 0.8rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          position: relative;
          padding: 0.4rem 0;
          transition: color 0.25s ease;
        }

        .nav-anchor:hover, .nav-anchor.active {
          color: #ffffff;
        }

        /* High-fidelity custom underline metric */
        .nav-anchor::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background-color: rgba(180, 170, 255, 0.8);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-anchor:hover::after {
          width: 100%;
          left: 0;
        }

        .nav-anchor.active::after {
          width: 16px;
          left: calc(50% - 8px);
          background-color: rgba(180, 170, 255, 1);
        }

        /* Mobile Utility Specific Classes */
        .mobile-nav-anchor {
          font-family: "'Outfit', sans-serif";
          font-size: 0.9rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          padding: 0.25rem 0;
          transition: all 0.2s ease;
          display: block;
        }

        .mobile-nav-anchor:hover, .mobile-nav-anchor.active {
          color: rgba(180, 170, 255, 1);
          padding-left: 4px;
        }
      `}</style>
    </nav>
  );
}

const NavLink = ({ to, currentPath, children }) => (
  <Link
    to={to}
    className={`nav-anchor ${currentPath === to ? "active" : ""}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, currentPath, onClick, children }) => (
  <Link
    to={to}
    className={`mobile-nav-anchor ${currentPath === to ? "active" : ""}`}
    onClick={onClick}
  >
    {children}
  </Link>
);