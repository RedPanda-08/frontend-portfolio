import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const canvasRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [, setFpsTarget] = useState(60);

  useEffect(() => {
    document.body.style.backgroundColor = "#0d0e15";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Hardware frame rate parsing
    if (window.matchMedia("(max-width: 768px)").matches) {
      setFpsTarget(60);
    } else {
      if (window.requestAnimationFrame) {
        let start = null;
        let counts = 0;
        const check = (timestamp) => {
          if (!start) start = timestamp;
          counts++;
          if (timestamp - start < 100) {
            window.requestAnimationFrame(check);
          } else {
            const approximateHz = Math.round((counts * 1000) / (timestamp - start));
            setFpsTarget(approximateHz > 90 ? (approximateHz > 130 ? 144 : 120) : 60);
          }
        };
        window.requestAnimationFrame(check);
      }
    }

    // ── Interactive Kinetic Lighting & Hover Dot Grid Logic ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking with active status toggles
    const mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4, active: false };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleCanvasResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleCanvasResize);

    // Spatial spacing between dynamic interactive grid nodes
    const spacing = 55;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth tracking speed via lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Render primary lighting aura gradient
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.5
      );
      gradient.addColorStop(0, "rgba(140, 130, 245, 0.12)");
      gradient.addColorStop(0.3, "rgba(90, 85, 180, 0.04)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render localized dot grid ONLY when mouse is actively hovering/moving
      if (mouse.active) {
        const cols = Math.ceil(width / spacing) + 1;
        const rows = Math.ceil(height / spacing) + 1;
        const maxRadius = 180; // Operational circumference bounding proximity checks

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const nodeX = i * spacing;
            const nodeY = j * spacing;

            const dx = mouse.x - nodeX;
            const dy = mouse.y - nodeY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Dots illuminate dynamically only inside the cursor range field
            if (dist < maxRadius) {
              const strength = (maxRadius - dist) / maxRadius;
              ctx.beginPath();
              ctx.arc(nodeX, nodeY, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(180, 170, 255, ${strength * 0.35})`;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleCanvasResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="relative w-full"
      style={{
        height: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        backgroundColor: "#0d0e15",
        overflow: "hidden",
      }}
    >
      {/* ── Interactive Aura + Hover Dot Canvas Layer ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* ── Hero Content ── */}
      <main
        className="relative z-10"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(1.5rem, 8vw, 4rem)",
          gap: "clamp(1.2rem, 2.5vw, 1.8rem)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            margin: 0,
            animation: "fadeUp 0.9s ease-out 0.15s both",
          }}
        >
          Navraj{" "}
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(180,170,255,0.9)",
            }}
          >
            Singh
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: 540,
            lineHeight: 1.75,
            margin: 0,
            animation: "fadeUp 0.9s ease-out 0.3s both",
          }}
        >
          Full Stack Developer. Data Scientist. Building high-fidelity digital experiences with precision and intent.
        </p>

        <div
          style={{
            width: 48,
            height: 1,
            background: "rgba(180,170,255,0.3)",
            animation: "fadeIn 0.9s ease-out 0.45s both",
            margin: "0.5rem 0",
          }}
        />

        <Link to="/about" style={{ textDecoration: "none", animation: "fadeUp 0.9s ease-out 0.55s both", display: "inline-block" }}>
          <button
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(0.75rem, 1.4vw, 0.85rem)",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: "transparent",
              border: "1px solid rgba(180,170,255,0.35)",
              borderRadius: "4px",
              padding: "0.85rem 2.4rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(180,170,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(180,170,255,0.65)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(180,170,255,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Work →
          </button>
        </Link>
      </main>

      {/* ── High-End Utility Footer ── */}
      <footer
        className="relative z-10 w-full"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 6vw, 4rem)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          color: "rgba(255, 255, 255, 0.45)",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 8px #10b981",
            }}
          />
          <span>Available for Projects</span>
        </div>

        {windowWidth > 768 && (
          <div style={{ color: "rgba(180, 170, 255, 0.45)", letterSpacing: "0.12em" }}>
            <span></span>
          </div>
        )}

        <div>
          © {new Date().getFullYear()} Navraj Singh
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        body {
          margin: 0;
          padding: 0;
          min-height: 100dvh;
          background-color: #0d0e15;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}