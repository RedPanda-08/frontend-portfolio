/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import "../index.css";

// Re-engineered Contrast Slate + Crisp White Typography Grid
const C = {
  bg: "#0d0e15",          // Deep Rich Slate Charcoal
  surface: "rgba(255, 255, 255, 0.005)",
  surfaceHover: "rgba(255, 255, 255, 0.015)",
  border: "rgba(255, 255, 255, 0.06)", // Sharper border visibility
  text: "#ffffff",        // Brilliant Pure White for absolute reading clarity
  muted: "#a1a4b0",       // High-contrast secondary text grey string
  accent: "rgba(180, 170, 255, 1)",   // Vibrant Periwinkle Anchor Core
  dim: "rgba(180, 170, 255, 0.45)"
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

const ContactPage = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [windowWidth, setW] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

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

    // ── Static Multi-Hemisphere Optical Prism Canvas ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    const handleCanvasResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      renderStudioLighting();
    };
    window.addEventListener("resize", handleCanvasResize);

    const renderStudioLighting = () => {
      ctx.clearRect(0, 0, cw, ch);

      // ── Soft Violet Main Glow ──
      const primaryGlow = ctx.createRadialGradient(
        cw * 0.18,
        ch * 0.18,
        0,
        cw * 0.18,
        ch * 0.18,
        Math.max(cw, ch) * 0.62
      );

      primaryGlow.addColorStop(0, "rgba(180, 170, 255, 0.14)");
      primaryGlow.addColorStop(0.22, "rgba(160, 145, 255, 0.08)");
      primaryGlow.addColorStop(0.5, "rgba(120, 110, 255, 0.025)");
      primaryGlow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = primaryGlow;
      ctx.fillRect(0, 0, cw, ch);

      // ── Lower Right Ambient Glow ──
      const secondaryGlow = ctx.createRadialGradient(
        cw * 0.82,
        ch * 0.78,
        0,
        cw * 0.82,
        ch * 0.78,
        Math.max(cw, ch) * 0.48
      );

      secondaryGlow.addColorStop(0, "rgba(125, 140, 255, 0.055)");
      secondaryGlow.addColorStop(0.4, "rgba(125, 140, 255, 0.018)");
      secondaryGlow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = secondaryGlow;
      ctx.fillRect(0, 0, cw, ch);

      // ── Center Atmospheric Softness ──
      const centerGlow = ctx.createRadialGradient(
        cw * 0.5,
        ch * 0.4,
        0,
        cw * 0.5,
        ch * 0.4,
        Math.max(cw, ch) * 0.38
      );

      centerGlow.addColorStop(0, "rgba(255,255,255,0.012)");
      centerGlow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, cw, ch);
    };

    renderStudioLighting();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", handleCanvasResize);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === 'sending') return;
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus('error');
      setAlertMessage('Please fill in all required fields.');
      setTimeout(() => setFormStatus(null), 3000);
      return;
    }

    setFormStatus('sending');

    try {
      const response = await fetch('https://portfolio-backend-1-eogw.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus('success');
        setAlertMessage('Message sent successfully!');
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus('error');
        setAlertMessage(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus('error');
      setAlertMessage('Network error. Please try again.');
    }

    setTimeout(() => {
      setFormStatus(null);
      setAlertMessage('');
    }, 5000);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: C.bg,
        color: C.text,
        overflowX: "hidden",
      }}
    >
      {/* ── Substrate Texture Layer 01: Physical Micro-Grain Film Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.015,
          mixBlendMode: "hard-light",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='matteNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23matteNoise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Substrate Texture Layer 02: Horizontal Guideline Mesh ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.015,
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "100% 60px",
        }}
      />

      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* ── Main Layout Viewport ── */}
      <div style={{ position: "relative", zIndex: 4, maxWidth: 1100, margin: "0 auto", padding: "clamp(5rem, 10vw, 8rem) 1.5rem", boxSizing: "border-box" }}>
        
        {/* INTERLOCKING SPLIT MODULE FRAME CONTAINER */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: windowWidth > 992 ? "1fr 1.3fr" : "1fr", 
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: "4px",
          width: "100%",
          overflow: "hidden"
        }}>
          
          {/* LEFT SECTION: BRAND CHANNELS IDENTIFIERS */}
          <motion.section 
            initial="hidden" 
            animate="visible" 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between",
              gap: "4rem", 
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              borderRight: windowWidth > 992 ? `1px solid ${C.border}` : "none",
              borderBottom: windowWidth <= 992 ? `1px solid ${C.border}` : "none",
              background: "rgba(0,0,0,0.1)"
            }}
          >
            <motion.div variants={fadeUp} custom={0.1} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
              <Label>Inquiry</Label>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(2.3rem, 4.5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: C.text,
                margin: "0.5rem 0 0 0",
              }}>
                Initiate <span style={{ fontStyle: "italic", fontWeight: 400, color: C.accent }}>Contact</span>.
              </h1>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.02rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
                margin: "1rem 0 0 0"
              }}>
                Have an interesting project in mind or an absolute nightmare of a bug you want to bounce off someone? Reach out. Whether it's spinning up a new data platform or just talking code, let's connect.
              </p>
            </motion.div>

            {/* Channels Anchors Map */}
            <motion.div variants={fadeUp} custom={0.2} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ color: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Mail size={18} /></div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.08em", color: C.dim }}>EMAIL</span>
                  <a href="mailto:navrajpersonal27@gmail.com" className="studio-contact-link" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: C.text, textDecoration: "none", fontWeight: 400 }}>
                    navrajpersonal27@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ color: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><MapPin size={18} /></div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.08em", color: C.dim }}>LOCATION</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: C.text, fontWeight: 400 }}>
                    Telangana, India
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.08em", color: C.dim, marginBottom: "0.25rem" }}>SOCIAL MEDIA PLATFORMS</span>
                <div style={{ display: "flex", gap: "1.2rem" }}>
                  {[
                    { icon: <FaGithub size={18} />, href: "https://github.com/RedPanda-08/" },
                    { icon: <FaLinkedin size={18} />, href: "https://linkedin.com/in/" },
                    { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/" },
                  ].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="studio-social-icon-anchor" style={{ color: "rgba(255,255,255,0.75)", transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease" }}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* RIGHT SECTION: CORE INPUT TRANSMISSION MATRIX */}
          <motion.section initial="hidden" animate="visible" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)", boxSizing: "border-box" }}>
            <motion.div variants={fadeUp} custom={0.25}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 400, color: C.text, margin: "0 0 2rem 0" }}>CONTACT </h2>

              {formStatus && formStatus !== 'sending' && (
                <div style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "0.75rem",
                  padding: "1.1rem",
                  marginBottom: "1.5rem",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                  fontFamily: "'Outfit', sans-serif",
                  background: formStatus === 'success' ? 'rgba(46, 125, 50, 0.15)' : 'rgba(198, 40, 40, 0.15)',
                  border: formStatus === 'success' ? '1px solid rgba(46, 125, 50, 0.3)' : '1px solid rgba(198, 40, 40, 0.3)',
                  color: formStatus === 'success' ? '#c8e6c9' : '#ffcdd2',
                  fontWeight: 400
                }}>
                  {formStatus === 'success' ? <CheckCircle size={16} style={{ marginTop: "2px", flexShrink: 0 }} /> : <AlertCircle size={16} style={{ marginTop: "2px", flexShrink: 0 }} />}
                  <span>{alertMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: windowWidth > 576 ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="name" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: C.text, letterSpacing: "0.01em" }}>Name</label>
                    <input 
                      type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name"
                      className="studio-input-field"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="email" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: C.text, letterSpacing: "0.01em" }}>Email</label>
                    <input 
                      type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Your email address"
                      className="studio-input-field"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="subject" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: C.text, letterSpacing: "0.01em" }}>Subject</label>
                  <input 
                    type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} placeholder="What is this about?"
                    className="studio-input-field"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="message" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: C.text, letterSpacing: "0.01em" }}>Message</label>
                  <textarea 
                    id="message" name="message" required rows="5" value={formData.message} onChange={handleChange} placeholder="Enter your message here..."
                    className="studio-input-field studio-textarea"
                  />
                </div>

                {/* Submits Trigger Link Capsule */}
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'} 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#ffffff",
                    background: formStatus === 'sending' ? "rgba(255,255,255,0.02)" : "rgba(180, 170, 255, 0.04)",
                    border: formStatus === 'sending' ? "1px solid rgba(255,255,255,0.15)" : `1px solid rgba(180, 170, 255, 0.45)`,
                    borderRadius: "4px",
                    padding: "0.9rem 2.2rem",
                    cursor: formStatus === 'sending' ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    outline: "none",
                    marginTop: "0.5rem"
                  }}
                  className="studio-submit-btn"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="studio-spinner" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={12} style={{ color: "#ffffff" }} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          </motion.section>

        </div>

        {/* FULLY SYNCHRONIZED MOBILE FRIENDLY FOOTER BLOCK */}
        <footer style={{ 
          borderTop: `1px solid ${C.border}`, 
          marginTop: "clamp(5rem, 10vw, 7rem)", 
          paddingTop: "1rem", 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", 
          alignItems: isMobile ? "flex-start" : "center", 
          fontFamily: "'Outfit', sans-serif", 
          fontSize: "0.75rem", 
          color: C.muted, 
          letterSpacing: "0.02em",
          gap: isMobile ? "0.4rem" : "1rem" // Snug gap alignment for stacked elements
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", width: isMobile ? "100%" : "auto" }}>
            <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>© {new Date().getFullYear()} Navraj Singh</span>
          </div>
          <span style={{ 
            textAlign: isMobile ? "left" : "right", 
            fontWeight: 400, 
            color: "rgba(255, 255, 255, 0.45)",
            width: isMobile ? "100%" : "auto",
            borderTop: "none", 
            paddingTop: "0"   
          }}>
            Full Stack Developer | Data Scientist
          </span>
        </footer>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500&display=swap');
        body { margin: 0; padding: 0; background: #0d0e15; -webkit-font-smoothing: antialiased; }

        .studio-contact-link:hover {
          color: rgba(180, 170, 255, 1) !important;
        }

        .studio-social-icon-anchor:hover {
          color: rgba(180, 170, 255, 1) !important;
          transform: translateY(-2px);
        }

        /* High-fidelity layout input structures */
        .studio-input-field {
          width: 100%;
          box-sizing: border-box;
          font-family: "'Outfit', sans-serif";
          font-size: 0.95rem;
          font-weight: 400;
          padding: 0.85rem 1.1rem;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          color: #ffffff;
          outline: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .studio-input-field::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .studio-input-field:focus {
          border-color: rgba(180, 170, 255, 0.6) !important;
          background: rgba(0, 0, 0, 0.35);
          box-shadow: 0 0 0 1px rgba(180, 170, 255, 0.2);
        }

        .studio-textarea {
          resize: none;
          min-height: 120px;
        }

        .studio-submit-btn:not(:disabled):hover {
          border-color: rgba(180, 170, 255, 1) !important;
          background-color: rgba(180, 170, 255, 0.15) !important;
          letter-spacing: 0.21em !important;
          transform: translateY(-2px);
        }

        .studio-spinner {
          width: 12px;
          height: 12px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;

function Label({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
      <div style={{ width: 14, height: "1px", background: "rgba(180, 170, 255, 1)" }} />
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(180, 170, 255, 1)" }}>{children}</span>
    </div>
  );
}