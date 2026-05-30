import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{
          opacity: 0,
          y: -18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile
            ? "0.9rem 1.2rem"
            : "1rem clamp(2rem, 5vw, 4rem)",
          background: "rgba(10, 10, 15, 0.28)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Logo isMobile={isMobile} />

        {/* Desktop Nav */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.2rem",
            }}
          >

            <NavLink to="/about" currentPath={location.pathname}>
              About
            </NavLink>

            <NavLink to="/projects" currentPath={location.pathname}>
              Projects
            </NavLink>

            <NavLink to="/contact" currentPath={location.pathname}>
              Contact
            </NavLink>
          </motion.div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            style={{
              background: "transparent",
              border: "none",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {/* Top Line */}
            <span
              style={{
                position: "absolute",
                width: "24px",
                height: "2px",
                background: "#ffffff",
                borderRadius: "999px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen
                  ? "rotate(45deg)"
                  : "translateY(-7px)",
              }}
            />

            {/* Middle Line */}
            <span
              style={{
                position: "absolute",
                width: "24px",
                height: "2px",
                background: "#ffffff",
                borderRadius: "999px",
                transition: "all 0.25s ease",
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />

            {/* Bottom Line */}
            <span
              style={{
                position: "absolute",
                width: "24px",
                height: "2px",
                background: "#ffffff",
                borderRadius: "999px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen
                  ? "rotate(-45deg)"
                  : "translateY(7px)",
              }}
            />
          </button>
        )}

        {/* Mobile Dropdown */}
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "rgba(10,10,15,0.96)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              padding: "2rem 1rem",
            }}
          >

            <MobileNavLink
              to="/about"
              currentPath={location.pathname}
              onClick={() => setIsOpen(false)}
            >
              About
            </MobileNavLink>

            <MobileNavLink
              to="/projects"
              currentPath={location.pathname}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </MobileNavLink>

            <MobileNavLink
              to="/contact"
              currentPath={location.pathname}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </MobileNavLink>
          </motion.div>
        )}
      </motion.nav>

      {/* Global Styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap");

        .nav-link {
          font-family: "Outfit", sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.55);
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #ffffff;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 1px;
          background: linear-gradient(
            90deg,
            #8b5cf6,
            rgba(139, 92, 246, 0.1)
          );
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .mobile-link {
          font-family: "Outfit", sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.65);
          transition: all 0.25s ease;
        }

        .mobile-link:hover,
        .mobile-link.active {
          color: #8b5cf6;
        }
      `}</style>
    </>
  );
}

/* =========================================
   LOGO
========================================= */

const Logo = ({ isMobile }) => {
  return (
    <Link
      to="/"
      style={{
        textDecoration: "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.75,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          lineHeight: 1,
          position: "relative",
        }}
      >
        {/* Name */}
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? "0.95rem" : "1.15rem",
            fontWeight: 700,
            letterSpacing: isMobile ? "0.14em" : "0.22em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          Navraj{" "}
          <span
            style={{
              color: "#bba2f6",
            }}
          >
            Singh
          </span>
        </span>

        {/* Subtitle */}
        <span
          style={{
            marginTop: "8px",
            fontFamily: "'Outfit', sans-serif",
            fontSize: isMobile ? "0.5rem" : "0.58rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.42)",
            letterSpacing: isMobile ? "0.32em" : "0.45em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Since 2005
        </span>

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "-20px",
            width: "120px",
            height: "80px",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)",
            filter: "blur(18px)",
            zIndex: -1,
          }}
        />
      </motion.div>
    </Link>
  );
};

/* =========================================
   DESKTOP NAV LINK
========================================= */

const NavLink = ({ to, currentPath, children }) => {
  return (
    <Link
      to={to}
      className={`nav-link ${currentPath === to ? "active" : ""}`}
    >
      {children}
    </Link>
  );
};

/* =========================================
   MOBILE NAV LINK
========================================= */

const MobileNavLink = ({
  to,
  currentPath,
  onClick,
  children,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`mobile-link ${
        currentPath === to ? "active" : ""
      }`}
    >
      {children}
    </Link>
  );
};