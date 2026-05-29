/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { FaGithub, FaLinkedin, FaInstagram, FaFileDownload } from "react-icons/fa";
import { GitPullRequest, Terminal, Layers, Activity } from "lucide-react";
import { motion } from "framer-motion";
import "../index.css";

const C = {
  bg: "#090a0f",
  surface: "rgba(255, 255, 255, 0.025)",
  surfaceHover: "rgba(255, 255, 255, 0.045)",
  border: "rgba(255, 255, 255, 0.12)",
  accent: "rgba(180, 170, 255, 0.85)",
  text: "#ffffff",
  muted: "rgba(255, 255, 255, 0.75)",
  dim: "rgba(180, 170, 255, 0.35)",
  statusGreen: "#22c55e",
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

export default function AboutMe() {
  const typedRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [windowWidth, setW] = useState(window.innerWidth);
  const [mouse, setMouse] = useState({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 });

  const isMobile = windowWidth <= 768;

  useEffect(() => {
    document.body.style.backgroundColor = C.bg;
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    window.scrollTo(0, 0);

    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);

    const typed = new Typed(typedRef.current, {
      strings: ["Data Science Student", "Full Stack Developer", "Passionate Photographer"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    const handleCanvasResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleCanvasResize);

    const onMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      typed.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", handleCanvasResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    const spotlight = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, Math.max(cw, ch) * 0.38);
    spotlight.addColorStop(0,   "rgba(180, 170, 255, 0.15)");
    spotlight.addColorStop(0.3, "rgba(160, 150, 255, 0.08)");
    spotlight.addColorStop(0.6, "rgba(120, 110, 220, 0.03)");
    spotlight.addColorStop(1,   "rgba(0, 0, 0, 0)");
    ctx.fillStyle = spotlight;
    ctx.fillRect(0, 0, cw, ch);

    const ambient = ctx.createRadialGradient(cw * 0.1, ch * 0.1, 0, cw * 0.1, ch * 0.1, Math.max(cw, ch) * 0.4);
    ambient.addColorStop(0, "rgba(100, 92, 200, 0.05)");
    ambient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, cw, ch);
  }, [mouse]);

  const skillsSet1 = [
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  ];

  const skillsSet2 = [
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ];

  const educationData = [
    {
      index: "01",
      year: "2023 – 2027",
      degree: "B.Tech in Data Science",
      institution: "Malla Reddy University, Hyderabad",
      description: "Focusing on database architectures, machine learning models, and building backend systems. I spend most of my time figuring out how to connect data engineering routines with responsive full-stack applications."
    },
    {
      index: "02",
      year: "2021 – 2023",
      degree: "Intermediate Education (MPC)",
      institution: "Loyola Academy, Hyderabad",
      description: "Specialized in Mathematics, Physics, and Chemistry. This is where I picked up my logical habits, learning to handle algebraic problem-solving and systematic breakdown techniques early on."
    },
    {
      index: "03",
      year: "2013 – 2021",
      degree: "Central Board of Secondary Education (CBSE)",
      institution: "Sadhu Vaswani International School, Hyderabad",
      description: "Completed my core schooling tracks with an early introduction to computer science modules, practical science labs, and foundational mathematics."
    }
  ];

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", minHeight: "100vh", backgroundColor: C.bg, color: C.text, overflowX: "hidden" }}
    >
      {/* Micro-Grain Film Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.015,
          mixBlendMode: "hard-light",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='matteNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23matteNoise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Horizontal Guideline Spec Lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.012,
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "100% 60px",
        }}
      />

      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      <div style={{ 
        position: "relative", 
        zIndex: 4, 
        maxWidth: 1100, 
        margin: "0 auto", 
        padding: `${isMobile ? "clamp(5.5rem, 12vw, 7rem)" : "clamp(3.5rem, 7vw, 6rem)"} 1.5rem clamp(3.5rem, 7vw, 6rem)`, 
        boxSizing: "border-box" 
      }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: windowWidth > 992 ? "repeat(3, 1fr)" : "1fr",
          gap: "1.5rem",
          width: "100%"
        }}>

          {/* PROFILE CARD */}
          <motion.section
            initial="hidden" animate="visible" variants={fadeUp} custom={0.1}
            style={{
              gridColumn: windowWidth > 992 ? "span 2" : "auto",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "clamp(1.75rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2.5rem", // Tightened up overall container padding behavior
              boxSizing: "border-box",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.35)";
              e.currentTarget.style.backgroundColor = C.surfaceHover;
              e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(0, 0, 0, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.backgroundColor = C.surface;
              e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.4)";
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.4rem 0.85rem",
                background: "rgba(34, 197, 94, 0.06)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "30px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: C.statusGreen,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                <span className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.statusGreen, display: "inline-block" }} />
                Available for Opportunities
              </div>

              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2.3rem, 4.5vw, 4rem)", lineHeight: 1.1, letterSpacing: "-0.01em", color: C.text, margin: 0 }}>
                Hi, I'm Navraj <span style={{ fontStyle: "italic", fontWeight: 400, color: C.accent }}>Singh</span>.
              </h1>

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)", fontWeight: 300, color: C.muted, margin: 0, minHeight: "1.5em", letterSpacing: "0.01em" }}>
                I am a <span ref={typedRef} style={{ color: C.text, fontWeight: 400 }} />
              </p>
            </div>

            {/* UNIFIED INTERACTION FOOTER BLOCK (Space metrics reduced explicitly) */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {[
                  { icon: <FaGithub size={19} />, href: "https://github.com/RedPanda-08?tab=repositories" },
                  { icon: <FaLinkedin size={19} />, href: "https://linkedin.com/in/navraj-singh-kalsi-448a30283/" },
                  { icon: <FaInstagram size={19} />, href: "https://instagram.com/" },
                ].map(({ icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, display: "flex", alignItems: "center", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.muted}>{icon}</a>
                ))}
              </div>

              <a href="Navraj Singh resume.pdf" download="Navraj_Singh_Resume.pdf" style={{ textDecoration: "none" }}>
                <button style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "#ffffff", background: "rgba(180, 170, 255, 0.04)", border: `1px solid rgba(180, 170, 255, 0.45)`, borderRadius: "4px", padding: "0.7rem 1.4rem", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.backgroundColor = "rgba(180, 170, 255, 0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.45)"; e.currentTarget.style.backgroundColor = "rgba(180, 170, 255, 0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <FaFileDownload size={12} /> Download Resume
                </button>
              </a>
            </div>
          </motion.section>

          {/* MY FOCUS CARD */}
          <motion.section
            initial="hidden" animate="visible" variants={fadeUp} custom={0.18}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
              boxSizing: "border-box",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.35)";
              e.currentTarget.style.backgroundColor = C.surfaceHover;
              e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(0, 0, 0, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.backgroundColor = C.surface;
              e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.4)";
            }}
          >
            <Label>My Focus</Label>
            <div style={{ fontFamily: "'Outfit', sans-serif" }}>
              <p style={{ fontSize: "0.95rem", color: C.text, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                I specialize in bridging Full-Stack development with data-driven backends. I love building responsive user interfaces, optimized data processing routines, and reliable engineering structures that keep applications fluid and fast.
              </p>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: C.muted }}>
              <span>Status: Active</span>
              <span>Based in Hyderabad</span>
            </div>
          </motion.section>

          {/* INFINITE SCROLLING SKILLS TRACK */}
          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
            style={{
              gridColumn: windowWidth > 992 ? "span 3" : "auto",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "2rem 0",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              boxSizing: "border-box",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
              marginTop: "0.5rem",
              marginBottom: "0.5rem"
            }}
          >
            <div style={{ padding: "0 2rem", marginBottom: "0.5rem" }}>
              <Label>Tech Stack</Label>
            </div>

            <div style={{ display: "flex", width: "max-content" }} className="ticker-track-forward">
              {[...skillsSet1, ...skillsSet1, ...skillsSet1, ...skillsSet1].map((sk, i) => (
                <div key={`f-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.2rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: "4px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: C.text, margin: "0 0.4rem" }}>
                  <img src={sk.logo} alt="" style={{ width: 14, height: 14, objectFit: "contain", filter: sk.invert ? "invert(1) opacity(0.6)" : "opacity(0.85)" }} />
                  <span>{sk.name}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", width: "max-content" }} className="ticker-track-backward">
              {[...skillsSet2, ...skillsSet2, ...skillsSet2, ...skillsSet2].map((sk, i) => (
                <div key={`r-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.2rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: "4px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: C.text, margin: "0 0.4rem" }}>
                  <img src={sk.logo} alt="" style={{ width: 14, height: 14, objectFit: "contain", filter: sk.invert ? "invert(1) opacity(0.6)" : "opacity(0.85)" }} />
                  <span>{sk.name}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* EDUCATION TIMELINE */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            style={{
              gridColumn: windowWidth > 992 ? "span 2" : "auto",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "clamp(1.5rem, 4vw, 3.5rem)",
              boxSizing: "border-box",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
              overflow: "hidden"
            }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "3rem" }}>
              <Label>History</Label>
              <h2 style={sH2}>Educational Journey</h2>
            </motion.div>

            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute", left: "6px", top: "10px",
                  width: "1px", background: "rgba(180, 170, 255, 0.3)"
                }}
              />

              {educationData.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{ position: "relative", paddingLeft: "2.2rem" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1 + (i * 0.15), type: "spring", stiffness: 120 }}
                    style={{
                      position: "absolute", left: "0px", top: "5px",
                      width: "11px", height: "11px", borderRadius: "50%",
                      background: C.bg, border: `2px solid ${C.accent}`,
                      boxShadow: `0 0 12px ${C.accent}`
                    }}
                  />

                  <div className="timeline-content" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <span style={{ fontSize: "0.75rem", color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>{edu.year}</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: C.text, margin: "0.3rem 0 0.15rem 0" }}>{edu.degree}</h3>
                    <h4 style={{ fontSize: "0.88rem", fontWeight: 400, color: C.muted, margin: 0, opacity: 0.85 }}>{edu.institution}</h4>
                    <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.6, marginTop: "0.75rem", fontWeight: 300 }}>{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PHILOSOPHY CARD */}
          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              boxSizing: "border-box",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.35)";
              e.currentTarget.style.backgroundColor = C.surfaceHover;
              e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(0, 0, 0, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.backgroundColor = C.surface;
              e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.4)";
            }}
          >
            <Label>Philosophy</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: "'Outfit', sans-serif" }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: C.text, margin: "0 0 0.4rem 0", fontWeight: 400 }}>Reliable Code</h3>
                <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.55, margin: 0, fontWeight: 300 }}>
                  I believe in catching issues early. I write clean validation schemas and robust data configurations to organize logic long before it ever enters production modules.
                </p>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: C.text, margin: "0 0 0.4rem 0", fontWeight: 400 }}>Keeping Things Lean</h3>
                <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.55, margin: 0, fontWeight: 300 }}>
                  I maintain rapid backend performance by leveraging lightweight, native libraries. Keeping architectures highly cohesive means fewer things break under load.
                </p>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: C.text, margin: "0 0 0.4rem 0", fontWeight: 400 }}>Team Collaboration</h3>
                <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.55, margin: 0, fontWeight: 300 }}>
                  Great software isn't built in a vacuum. I value jumping into code reviews, brainstorming edge-cases with teammates, and keeping documentation straightforward so anyone can spin up the environment quickly.
                </p>
              </div>
            </div>
          </motion.section>

          {/* BENTO GRID OPEN SOURCE EXPERIENCE SECTION */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            style={{
              gridColumn: windowWidth > 992 ? "span 3" : "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            <div>
              <Label>Contributions</Label>
              <h2 style={sH2}>Engineering Experience</h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: windowWidth > 768 ? (windowWidth <= 992 ? "1fr" : "1.4fr 1fr") : "1fr",
              gap: "1.2rem",
              width: "100%"
            }}>
              
              {/* Card 1: Ecosystem Overview */}
              <div
                style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "2rem",
                  display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.35)"; e.currentTarget.style.backgroundColor = C.surfaceHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.surface; }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>[ CORE_SUBSYSTEM ]</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: C.accent, background: "rgba(255,255,255,0.02)", padding: "0.2rem 0.5rem", borderRadius: "3px", border: `1px solid ${C.border}`, letterSpacing: "0.12em", fontWeight: 500 }}>
                      JUN – AUG 2025
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginTop: "0.75rem", marginBottom: "0.25rem", color: C.text }}>
                    Social Summer of Code (SSoC)
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: C.accent, fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 300 }}>
                    <GitPullRequest size={14} />
                    <span>Open Source Contributor</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.92rem", color: C.muted, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                  Collaborated within the open-source pipeline to rewrite backend routes, patch interface layout constraints, and optimize scalable system parameters.
                </p>
              </div>

              {/* Card 2: Technology Footprint */}
              <div
                style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "2rem",
                  display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.35)"; e.currentTarget.style.backgroundColor = C.surfaceHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.surface; }}
              >
                <div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>[ RUNTIME_STACK ]</span>
                  <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", fontWeight: 400, marginTop: "0.5rem", marginBottom: "0", color: C.text }}>
                    Framework Integration
                  </h4>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {["Next.js", "React", "FastAPI", "Spring Boot", "Git / GitHub", "API Routing"].map((tech, idx) => (
                    <span key={idx} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: C.text, background: "rgba(180, 170, 255, 0.04)", border: `1px solid ${C.border}`, padding: "0.35rem 0.65rem", borderRadius: "3px", fontWeight: 400 }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: C.muted, fontSize: "0.72rem", fontFamily: "'Outfit', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  <Terminal size={12} style={{ color: C.accent }} />
                  <span>ENV_PRODUCTION_VERIFIED</span>
                </div>
              </div>

              {/* Card 3: Deep Stack Metrics Impact */}
              <div
                style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "2rem",
                  display: "flex", flexDirection: "column", gap: "1.5rem",
                  gridColumn: windowWidth > 992 ? "span 2" : "span 1",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(180, 170, 255, 0.35)"; e.currentTarget.style.backgroundColor = C.surfaceHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.surface; }}
              >
                <div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>[ CORE_METRICS_LOGS ]</span>
                  <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", fontWeight: 400, marginTop: "0.5rem", marginBottom: "0", color: C.text }}>
                    Production Contributions & Subsystem Impact
                  </h4>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <Activity size={15} style={{ color: C.accent, marginTop: "0.2rem", flexShrink: 0 }} />
                    <div>
                      <h5 style={{ margin: "0 0 0.25rem 0", color: C.text, fontSize: "0.92rem", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Pipeline Concurrency Optimization</h5>
                      <p style={{ margin: 0, color: C.muted, fontSize: "0.85rem", lineHeight: 1.6, fontWeight: 300, fontFamily: "'Outfit', sans-serif" }}>Refactored application layer request routes to handle asynchronous processing tasks smoothly, neutralizing thread blocks before downstream system filters execute.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <Layers size={15} style={{ color: C.accent, marginTop: "0.2rem", flexShrink: 0 }} />
                    <div>
                      <h5 style={{ margin: "0 0 0.25rem 0", color: C.text, fontSize: "0.92rem", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Payload Interface Validation</h5>
                      <p style={{ margin: 0, color: C.muted, fontSize: "0.85rem", lineHeight: 1.6, fontWeight: 300, fontFamily: "'Outfit', sans-serif" }}>Patched strict type-checking parsing boundaries to ensure unexpected user payloads or corrupt data schemas dissolve silently at client endpoints.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.section>

        </div>

        <footer style={{ borderTop: `1px solid ${C.border}`, marginTop: "4rem", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: C.dim, letterSpacing: "0.02em" }}>
          <span>© {new Date().getFullYear()} Navraj Singh</span>
          <span>Full Stack Developer | Data Scientist</span>
        </footer>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        .typed-cursor { color: ${C.accent}; font-weight: 300; }
        body { margin: 0; padding: 0; background: #090a0f; -webkit-font-smoothing: antialiased; }

        @keyframes scrollForward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes scrollBackward {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .ticker-track-forward { animation: scrollForward 26s linear infinite; }
        .ticker-track-backward { animation: scrollBackward 26s linear infinite; }

        @keyframes subtlePulse {
          0% { transform: scale(0.92); opacity: 0.6; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 8px 2px rgba(34, 197, 94, 0.25); }
          100% { transform: scale(0.92); opacity: 0.6; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        .pulse-dot { animation: subtlePulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        canvas { transition: none; }
      `}</style>
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
      <div style={{ width: 12, height: "1px", background: C.accent }} />
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent }}>{children}</span>
    </div>
  );
}

const sH2 = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
  color: "#fff",
  margin: 0,
};