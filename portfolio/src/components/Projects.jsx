/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../index.css";

// Refined Architectural Slate + Warm Paper Premium Color Matrix
const C = {
  bg: "#0d0e15",          // Deep Slate Charcoal Base
  surface: "rgba(255, 255, 255, 0.005)",
  surfaceHover: "rgba(255, 255, 255, 0.012)",
  border: "rgba(255, 255, 255, 0.04)",
  text: "#f6f5f3",        // Warm Gallery White (Relieves digital eye strain)
  muted: "#a1a4b0",       // Industrial Cool Silver
  accent: "rgba(165, 180, 252, 0.85)", // Muted Periwinkle
  dim: "rgba(165, 180, 252, 0.35)"
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

export default function Projects() {
  const canvasRef = useRef(null);
  const [windowWidth, setW] = useState(window.innerWidth);

  useEffect(() => {
    // Immediate global view state optimization
    document.body.style.backgroundColor = C.bg;
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    window.scrollTo(0, 0);

    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);

    // ── Kinetic Constellation Fields Background Engine ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    const nodes = [];
    const nodeCount = Math.min(50, Math.floor((cw * ch) / 28000));
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.1 + 0.5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.015
      });
    }

    const mouse = { x: cw * 0.5, y: ch * 0.4, targetX: cw * 0.5, targetY: ch * 0.4, active: false };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => { mouse.active = false; };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleCanvasResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleCanvasResize);

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);

      // Interpolation to deliver linear velocity tracking loops
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;

      // Layer 01: Low-Frequency Warm Architectural Glow
      const environmentalGlow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, Math.max(cw, ch) * 0.5);
      environmentalGlow.addColorStop(0, "rgba(145, 135, 245, 0.09)"); 
      environmentalGlow.addColorStop(0.4, "rgba(90, 85, 180, 0.01)");
      environmentalGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = environmentalGlow;
      ctx.fillRect(0, 0, cw, ch);

      // Layer 02: Dynamic Substrate Node Processing Map
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        n.angle += n.speed;
        n.x += n.vx + Math.sin(n.angle) * 0.1;
        n.y += n.vy + Math.cos(n.angle) * 0.1;

        if (n.x < 0 || n.x > cw) n.vx *= -1;
        if (n.y < 0 || n.y > ch) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = 220;

        let rX = n.x;
        let rY = n.y;

        if (dist < maxRadius) {
          const strength = (maxRadius - dist) / maxRadius;
          rX -= (dx / dist) * strength * 18; 
          rY -= (dy / dist) * strength * 18;

          ctx.strokeStyle = `rgba(165, 180, 252, ${strength * 0.09})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(rX, rY);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(rX, rY, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < maxRadius 
          ? `rgba(165, 180, 252, ${0.25 + (maxRadius - dist) / maxRadius * 0.45})` 
          : "rgba(246, 245, 243, 0.15)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", handleCanvasResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "ContentAI",
      description: "An AI-driven content generation platform optimized for production scaling, performant modular layouts, and autonomous workflow handling.",
      technologies: ["Next.js", "FastAPI", "Python", "PostgreSQL", "Tailwind CSS"],
      githubLink: "https://github.com/RedPanda-08",
      liveLink: "https://ai-content-generator-blush-one.vercel.app/",
    },
    {
      id: 2,
      title: "BrowsyBot",
      description: "Chrome subsystem extension built to securely isolate and archive local browsing history data arrays independently, preventing loss against local browser state deletions.",
      technologies: ["Python", "JavaScript", "SQLite3", "Chrome API", "Express.js"],
      githubLink: "https://github.com/RedPanda-08/BrowsyBot",
      liveLink: "https://example.com/",
    },
    {
      id: 3,
      title: "Arogya Mitra",
      description: "Collaborative healthcare analytics intelligence dashboard focused on modular electronic health records management, systemic parsing, and metadata metrics rendering.",
      technologies: ["Spring Boot", "React", "Java", "SQL", "Framer Motion"],
      githubLink: "https://github.com/RedPanda-08",
      liveLink: "https://example.com/",
    },
    {
      id: 4,
      title: "ACIS — Ancient Civilization Intelligence System",
      description: "A modern interactive data visualization dashboard built using Streamlit, Plotly, and Pandas to explore UNESCO World Heritage Sites data.The project focuses on clean analytics, geographical visualization, heritage risk analysis, and country-level insights using the UNESCO WHC 2023 dataset.",
      technologies: ["Streamlit", "Plotly", "Pandas", "Python", "Data Visualization"],
      githubLink: "https://github.com/RedPanda-08/ASCI---Archeological-Analytics",
      liveLink: "https://asci-archeological-analytics.streamlit.app/",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: C.bg,
        color: C.text,
        overflowX: "hidden",
      }}
    >
      {/* ── Substrate Layer 01: Physical Micro-Grain Film Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.012,
          mixBlendMode: "hard-light",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='matteNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23matteNoise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Substrate Layer 02: Structural Technical Blueprint Matrix Lines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.015,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* ── Main Index Layout Content Viewport ── */}
      <div style={{ position: "relative", zIndex: 4, maxWidth: 1100, margin: "0 auto", padding: "clamp(5rem, 10vw, 8rem) 1.5rem", boxSizing: "border-box" }}>
        
        {/* PROJECTS SECTION HEADER */}
        <motion.section initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "clamp(5rem, 10vw, 7rem)" }}>
          <motion.div variants={fadeUp} custom={0.1} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
            <Label>Index</Label>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: C.text,
              margin: 0,
            }}>
              Selected <span style={{ fontStyle: "italic", fontWeight: 400, color: C.accent }}>Productions</span>.
            </h1>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              fontWeight: 300,
              color: C.muted,
              maxWidth: "520px",
              lineHeight: 1.6,
              margin: "0.5rem 0 0 0"
            }}>
              A curation of platform architectures, dataset classification tools, and deep-stack engineering implementations built with clear operational intent.
            </p>
          </motion.div>
        </motion.section>

        {/* ── THE SYSTEMIC CARDS GRID MATRIX ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} style={{ marginBottom: "4rem" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: windowWidth > 768 ? "1fr 1fr" : "1fr", 
            gap: "1.5rem",
            width: "100%",
            
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                custom={index * 0.12}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "2rem",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxSizing: "border-box"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(165, 180, 252, 0.3)";
                  e.currentTarget.style.backgroundColor = C.surfaceHover;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px -15px rgba(145, 135, 245, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.backgroundColor = C.surface;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    color: C.text,
                    margin: 0,
                    letterSpacing: "0.01em"
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 300,
                    color: C.text,
                    lineHeight: 1.65,
                    margin: 0,
                    opacity: 0.95
                  }}>
                    {project.description}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Structural Modular Technologies Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 400,
                          color: C.muted,
                          background: "rgba(255, 255, 255, 0.015)",
                          border: `1px solid ${C.border}`,
                          padding: "0.35rem 0.75rem",
                          borderRadius: "3px",
                          letterSpacing: "0.02em"
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Clean Non-Pill Functional Micro Links */}
                  <div style={{ 
                    display: "flex", 
                    gap: "1.5rem", 
                    borderTop: `1px solid ${C.border}`, 
                    paddingTop: "1.1rem",
                    fontFamily: "'Outfit', sans-serif" 
                  }}>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        color: C.dim,
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        textDecoration: "none",
                        transition: "color 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = C.accent}
                      onMouseLeave={(e) => e.currentTarget.style.color = C.dim}
                    >
                      <FaGithub size={13} /> Source Code
                    </a>
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        color: C.dim,
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        textDecoration: "none",
                        transition: "color 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = C.accent}
                      onMouseLeave={(e) => e.currentTarget.style.color = C.dim}
                    >
                      <FaExternalLinkAlt size={11} /> Launch Site
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* STUDIO FOOTER */}
        <footer style={{ borderTop: `1px solid ${C.border}`, paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: C.dim, letterSpacing: "0.02em" }}>
          <span>© {new Date().getFullYear()} Navraj Singh</span>
          <span>Full Stack Developer | Data Scientist</span>
        </footer>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500&display=swap');
        body { margin: 0; padding: 0; background: #0d0e15; -webkit-font-smoothing: antialiased; }
      `}</style>
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
      <div style={{ width: 14, height: "1px", background: C.accent }} />
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>{children}</span>
    </div>
  );
}