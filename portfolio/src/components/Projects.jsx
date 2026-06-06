/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import "../index.css";

const NAV_H_DESKTOP = 68;
const NAV_H_MOBILE  = 56;

const C = {
  bg: "#0d0e15",
  surface: "rgba(255, 255, 255, 0.005)",
  surfaceHover: "rgba(255, 255, 255, 0.012)",
  border: "rgba(255, 255, 255, 0.04)",
  text: "#f6f5f3",
  muted: "#a1a4b0",
  accent: "rgba(165, 180, 252, 0.85)",
  dim: "rgba(165, 180, 252, 0.35)",
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: d },
  }),
};

const architectures = {
  1: {
    nodes: [
      { id: "ui",    label: "Next.js UI",      sub: "SSR · Routing · Tailwind",    x: 200, y: 32,  w: 240, h: 56 },
      { id: "api",   label: "FastAPI",         sub: "REST Gateway · JWT · CORS",   x: 200, y: 148, w: 240, h: 56 },
      { id: "ai",    label: "LLM Engine",        sub: "OpenAI · Prompt Pipeline",    x: 20,  y: 268, w: 185, h: 56 },
      { id: "db",    label: "PostgreSQL",        sub: "ORM · Migrations · Pool",    x: 435, y: 268, w: 185, h: 56 },
      { id: "queue", label: "Task Queue",        sub: "Celery · Redis Broker",       x: 200, y: 388, w: 240, h: 56 },
      { id: "cdn",   label: "CDN / Edge",        sub: "Vercel · Cache · Delivery",  x: 200, y: 508, w: 240, h: 56 },
    ],
    edges: [
      { from: "ui",    to: "api",   label: "HTTPS/REST" },
      { from: "api",   to: "ai",    label: "async prompt" },
      { from: "api",   to: "db",    label: "SQLAlchemy" },
      { from: "api",   to: "queue", label: "task.delay()" },
      { from: "queue", to: "cdn",   label: "signed PUT" },
    ],
    layers: [
      { label: "Presentation",  color: "rgba(165,180,252,0.065)", y: 14,  h: 92 },
      { label: "Application",   color: "rgba(165,180,252,0.038)", y: 130, h: 92 },
      { label: "Services",      color: "rgba(165,180,252,0.028)", y: 250, h: 92 },
      { label: "Async Delivery",color: "rgba(165,180,252,0.045)", y: 370, h: 210 },
    ],
  },
  2: {
    nodes: [
      { id: "ext", label: "Chrome Extension", sub: "Manifest v3 · Service Worker",  x: 190, y: 32,  w: 260, h: 56 },
      { id: "bg",  label: "Background Script",sub: "Tab API · Event Bus",            x: 18,  y: 152, w: 200, h: 56 },
      { id: "cs",  label: "Content Script",   sub: "DOM Intercept · History Hooks",  x: 422, y: 152, w: 200, h: 56 },
      { id: "api", label: "Express Server",   sub: "REST · CORS · Rate Limiter",     x: 190, y: 288, w: 260, h: 56 },
      { id: "db",  label: "SQLite3",          sub: "WAL Mode · Indexed Queries",     x: 190, y: 412, w: 260, h: 56 },
    ],
    edges: [
      { from: "ext", to: "bg",  label: "chrome.runtime" },
      { from: "ext", to: "cs",  label: "executeScript" },
      { from: "bg",  to: "api", label: "fetch / HTTP" },
      { from: "cs",  to: "api", label: "XHR intercept" },
      { from: "api", to: "db",  label: "better-sqlite3" },
    ],
    layers: [
      { label: "Browser Runtime", color: "rgba(165,180,252,0.065)", y: 14,  h: 92 },
      { label: "Script Layer",    color: "rgba(165,180,252,0.038)", y: 134, h: 92 },
      { label: "Server Layer",    color: "rgba(165,180,252,0.045)", y: 270, h: 92 },
      { label: "Persistence",     color: "rgba(165,180,252,0.038)", y: 394, h: 92 },
    ],
  },
  3: {
    nodes: [
      { id: "react",     label: "React Dashboard",  sub: "Framer Motion · Recharts · SPA",   x: 185, y: 32,  w: 270, h: 56 },
      { id: "boot",      label: "Spring Boot",       sub: "REST · JWT Filter · Bean Scope",   x: 185, y: 152, w: 270, h: 56 },
      { id: "auth",      label: "Auth Service",      sub: "BCrypt · RBAC · Token Store",      x: 12,  y: 280, w: 175, h: 56 },
      { id: "ehr",       label: "EHR Service",       sub: "HL7 · FHIR-lite · Record API",     x: 232, y: 280, w: 175, h: 56 },
      { id: "analytics", label: "Analytics Engine",  sub: "Aggregation · Time-series",        x: 452, y: 280, w: 175, h: 56 },
      { id: "sql",       label: "MySQL / JPA",       sub: "Hibernate ORM · Connection Pool",  x: 185, y: 412, w: 270, h: 56 },
    ],
    edges: [
      { from: "react",     to: "boot",      label: "Axios / REST" },
      { from: "boot",      to: "auth",      label: "filter chain" },
      { from: "boot",      to: "ehr",       label: "service call" },
      { from: "boot",      to: "analytics", label: "async event" },
      { from: "ehr",       to: "sql",       label: "JPQL" },
      { from: "analytics", to: "sql",       label: "native query" },
    ],
    layers: [
      { label: "UI Layer",       color: "rgba(165,180,252,0.065)", y: 14,  h: 92 },
      { label: "API Gateway",    color: "rgba(165,180,252,0.038)", y: 134, h: 92 },
      { label: "Microservices",  color: "rgba(165,180,252,0.028)", y: 262, h: 92 },
      { label: "Data Layer",     color: "rgba(165,180,252,0.045)", y: 394, h: 92 },
    ],
  },
  4: {
    nodes: [
      { id: "ui",     label: "Streamlit Frontend", sub: "Reactive Widgets · Session State", x: 185, y: 32,  w: 270, h: 56 },
      { id: "pandas", label: "Pandas Pipeline",    sub: "ETL · Cleaning · GroupBy",        x: 18,  y: 162, w: 210, h: 56 },
      { id: "plotly", label: "Plotly / Pydeck",    sub: "Choropleth · Geo · Bar Charts",   x: 412, y: 162, w: 210, h: 56 },
      { id: "proc",   label: "Risk Processor",     sub: "Scoring · Filter · Aggregation",  x: 185, y: 300, w: 270, h: 56 },
      { id: "data",   label: "UNESCO Dataset",     sub: "WHC 2023 · CSV · 1154 Sites",     x: 185, y: 428, w: 270, h: 56 },
    ],
    edges: [
      { from: "ui",     to: "pandas", label: "st.cache_data" },
      { from: "ui",     to: "plotly", label: "st.plotly_chart" },
      { from: "pandas", to: "proc",   label: "DataFrame pipe" },
      { from: "plotly", to: "proc",   label: "filtered frame" },
      { from: "proc",   to: "data",   label: "pd.read_csv" },
    ],
    layers: [
      { label: "Presentation",  color: "rgba(165,180,252,0.065)", y: 14,  h: 92 },
      { label: "Processing",    color: "rgba(165,180,252,0.038)", y: 144, h: 92 },
      { label: "Computation",   color: "rgba(165,180,252,0.028)", y: 282, h: 92 },
      { label: "Data Source",   color: "rgba(165,180,252,0.045)", y: 410, h: 92 },
    ],
  },
};

const layerBreakdowns = {
  1: [
    { layer: "Presentation", detail: "Next.js architecture with functional bundle splitting and global client intercept loops." },
    { layer: "Application", detail: "FastAPI request pipeline utilizing asymmetric crypto validation routines and background handlers." },
    { layer: "Services", detail: "Dynamic abstract generation modules referencing cached DB layer context parameters seamlessly." },
    { layer: "Async Delivery", detail: "Distributed pipeline utilizing volatile queue clusters and immediate edge invalidation cycles." },
  ],
  2: [
    { layer: "Browser Runtime", detail: "Background workers managing event loops and state mapping patterns natively." },
    { layer: "Script Layer", detail: "Targeted capture vectors tracking runtime interaction boundaries cleanly inside view configurations." },
    { layer: "Server Layer", detail: "Localized microservice running rate-controlled ingestion rules across active communication lines." },
    { layer: "Persistence", detail: "High-throughput storage configured for transaction reliability during high-frequency events." },
  ],
  3: [
    { layer: "UI Layer", detail: "Reactive monitoring matrix executing micro-interaction patterns cleanly across states." },
    { layer: "API Gateway", detail: "Central protection layout processing rule chains and interface validation constraints." },
    { layer: "Microservices", detail: "Decoupled logic architecture handling processing demands with bounded consistency parameters." },
    { layer: "Data Layer", detail: "Entity relationship arrays abstracting connection allocation bounds smoothly." },
  ],
  4: [
    { layer: "Presentation", detail: "Re-rendering UI loop mapping state updates smoothly across localized variables." },
    { layer: "Processing", detail: "Clean ingest parsing executing vector filters across geographical datasets." },
    { layer: "Computation", detail: "Weighted index calculator running multi-dimensional matrices in real-time." },
    { layer: "Data Source", detail: "Version-controlled global site arrays acting as system source validation layers." },
  ],
};

function wob(seed, amp = 5) {
  return Math.sin(seed * 127.1 + 311.7) * amp;
}

function pencilEdge(ax, ay, bx, by, idx) {
  const my = (ay + by) / 2;
  const cp1x = ax + wob(idx * 3.1, 6);
  const cp1y = my + wob(idx * 2.7, 5);
  const cp2x = bx + wob(idx * 4.3, -5);
  const cp2y = my + wob(idx * 1.9, 6);
  return `M ${ax} ${ay} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${bx} ${by}`;
}

const SVG_W = 640;
const SVG_H = 590;

function nodeCentre(id, nodes) {
  const n = nodes.find((x) => x.id === id);
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

function ArchDiagram({ arch, visible }) {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return;
      const containerWidth = wrapperRef.current.getBoundingClientRect().width;
      if (containerWidth < SVG_W) {
        setScale(containerWidth / SVG_W);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    const svg = svgRef.current;
    const layers  = svg.querySelectorAll(".al");
    const rects   = svg.querySelectorAll(".ar");
    const labels  = svg.querySelectorAll(".at");
    const subs    = svg.querySelectorAll(".as");
    const edges   = svg.querySelectorAll(".ae");
    const elabels = svg.querySelectorAll(".ael");

    [...layers, ...rects, ...labels, ...subs, ...elabels].forEach(el => el.style.opacity = "0");
    edges.forEach(p => {
      const len = p.getTotalLength ? p.getTotalLength() : 120;
      p.style.strokeDasharray  = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.opacity = "1";
    });

    const tl = [];
    const L_S = 0,   L_D = 450, L_G = 50;
    const R_S = 220, R_D = 300, R_G = 100;
    const T_O = 60,  S_O = 100;
    const E_S = R_S + rects.length * R_G + 60;
    const E_D = 580, E_G = 130;
    const EL_S = E_S + edges.length * E_G + 50;

    layers.forEach((el, i)  => tl.push({ el, t: "fade", s: L_S + i*L_G, d: L_D }));
    rects.forEach((el, i)   => tl.push({ el, t: "fade", s: R_S + i*R_G, d: R_D }));
    labels.forEach((el, i)  => tl.push({ el, t: "fade", s: R_S + i*R_G + T_O, d: 210 }));
    subs.forEach((el, i)    => tl.push({ el, t: "fade", s: R_S + i*R_G + S_O, d: 190 }));
    edges.forEach((el, i)   => {
      const len = el.getTotalLength ? el.getTotalLength() : 120;
      tl.push({ el, t: "draw", s: E_S + i*E_G, d: E_D, len });
    });
    elabels.forEach((el, i) => tl.push({ el, t: "fade", s: EL_S + i*50, d: 190 }));

    const totalMs = EL_S + elabels.length * 50 + 280;
    const t0 = performance.now();

    const tick = (now) => {
      const el = now - t0;
      tl.forEach(({ el: elem, t, s, d, len }) => {
        const p = Math.min(Math.max((el - s) / d, 0), 1);
        const e = p < 0.5 ? 2*p*p : -1 + (4 - 2*p)*p;
        if (t === "fade") elem.style.opacity = `${e}`;
        else              elem.style.strokeDashoffset = `${len * (1 - e)}`;
      });
      if (el < totalMs) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible, arch]);

  if (!arch) return null;

  return (
    <div ref={wrapperRef} style={{ width: "100%", position: "relative", height: `${SVG_H * scale}px`, overflow: "hidden" }}>
      <svg
        ref={svgRef}
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{
          display: "block",
          fontFamily: "'Outfit', sans-serif",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        <defs>
          <filter id="pencil-edge" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="8" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="node-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="arr" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 2.5 L10 6 L2 9.5" fill="none" stroke="rgba(165,180,252,0.68)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <linearGradient id="ng" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(32,34,58,0.98)"/>
            <stop offset="100%" stopColor="rgba(18,20,36,0.98)"/>
          </linearGradient>
        </defs>

        {arch.layers.map((l, i) => (
          <g key={i} className="al" style={{ opacity: 0 }}>
            <rect x={6} y={l.y} width={SVG_W - 12} height={l.h} rx="4" fill={l.color} stroke="rgba(165,180,252,0.07)" strokeWidth="0.6"/>
            <text x={16} y={l.y + 15} fill="rgba(165,180,252,0.28)" fontSize="9" fontWeight="500" letterSpacing="0.2em">
              {l.label.toUpperCase()}
            </text>
          </g>
        ))}

        {arch.edges.map((e, i) => {
          const a = nodeCentre(e.from, arch.nodes);
          const b = nodeCentre(e.to,   arch.nodes);
          return (
            <path key={i} className="ae" d={pencilEdge(a.x, a.y, b.x, b.y, i)} fill="none" stroke="rgba(165,180,252,0.48)" strokeWidth="1.4" strokeLinecap="round" filter="url(#pencil-edge)" markerEnd="url(#arr)" style={{ opacity: 1 }}/>
          );
        })}

        {arch.edges.map((e, i) => {
          const a  = nodeCentre(e.from, arch.nodes);
          const b  = nodeCentre(e.to,   arch.nodes);
          const mx = (a.x + b.x) / 2 + wob(i * 1.8, 10);
          const my = (a.y + b.y) / 2 - 1;
          const tw = e.label.length * 5.8 + 16;
          return (
            <g key={`el${i}`} className="ael" style={{ opacity: 0 }}>
              <rect x={mx - tw/2} y={my - 11} width={tw} height={16} rx="3" fill="rgba(11,12,22,0.95)" stroke="rgba(165,180,252,0.16)" strokeWidth="0.7"/>
              <text x={mx} y={my + 2} textAnchor="middle" fill="rgba(165,180,252,0.75)" fontSize="8.5" fontWeight="500" letterSpacing="0.06em">
                {e.label}
              </text>
            </g>
          );
        })}

        {arch.nodes.map((n, i) => {
          const cx = n.x + n.w / 2;
          const cy = n.y + n.h / 2;
          return (
            <g key={i}>
              <rect className="ar" x={n.x - 6} y={n.y - 6} width={n.w + 12} height={n.h + 12} rx="10" fill="rgba(165,180,252,0.045)" filter="url(#node-glow)" style={{ opacity: 0 }}/>
              <rect className="ar" x={n.x} y={n.y} width={n.w} height={n.h} rx="6" fill="url(#ng)" stroke="rgba(165,180,252,0.55)" strokeWidth="1.1" style={{ opacity: 0 }}/>
              <rect className="ar" x={n.x + 1} y={n.y + 1} width={n.w - 2} height={14} rx="5" fill="rgba(255,255,255,0.035)" style={{ opacity: 0 }}/>
              <text className="at" x={cx} y={cy - 8} textAnchor="middle" fill="#edecf0" fontSize="12.5" fontWeight="500" letterSpacing="0.01em" style={{ opacity: 0 }}>
                {n.label}
              </text>
              <text className="as" x={cx} y={cy + 12} textAnchor="middle" fill="rgba(165,180,252,0.5)" fontSize="8.5" fontWeight="300" letterSpacing="0.05em" style={{ opacity: 0 }}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ArchModal({ project, onClose, isMobile }) {
  const arch      = architectures[project.id];
  const breakdown = layerBreakdowns[project.id];
  const [drawn, setDrawn] = useState(false);
  const [tab,   setTab]   = useState("diagram");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDrawn(true), 160);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200, background: "rgba(3,4,10,0.92)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
        paddingTop: isMobile ? `${NAV_H_MOBILE}px` : `${NAV_H_DESKTOP}px`,
        paddingBottom: isMobile ? "0" : "2rem", paddingLeft: isMobile ? "0" : "2rem", paddingRight: isMobile ? "0" : "2rem",
        boxSizing: "border-box",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: isMobile ? 50 : 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: isMobile ? 50 : 20, scale: 0.97 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#0e0f18", border: "1px solid rgba(165,180,252,0.12)", borderRadius: isMobile ? "16px 16px 0 0" : "8px",
          width: "100%", maxWidth: isMobile ? "100%" : "1080px", maxHeight: "100%", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 48px 100px -24px rgba(0,0,0,0.95)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "1.2rem 1.25rem 1rem" : "1.6rem 2rem 1.2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0, background: "#0e0f18", zIndex: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.25rem" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L4 8L9.5 2.5L10 3L4.5 9L2.5 10.5Z" stroke="rgba(165,180,252,0.65)" strokeWidth="0.9" fill="rgba(165,180,252,0.1)"/>
                <path d="M8.5 1.5L10.5 3.5" stroke="rgba(165,180,252,0.65)" strokeWidth="0.9"/>
              </svg>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.67rem", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:C.accent }}>System Architecture</span>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize: isMobile ? "1.2rem" : "1.55rem", color:C.text, margin:0, fontWeight:400 }}>{project.title}</h2>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"4px", color:C.muted, cursor:"pointer", padding:"0.45rem 0.55rem", display:"flex", alignItems:"center", transition:"all 0.2s", flexShrink:0 }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(165,180,252,0.3)"; e.currentTarget.style.color=C.accent; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color=C.muted; }}
          ><FaTimes size={12}/></button>
        </div>

        {/* Mobile tabs */}
        {isMobile && (
          <div style={{ display:"flex", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            {[{ id:"diagram", label:"✏   Sketch" }, { id:"breakdown", label:"⊞   Breakdown" }].map(({ id, label }) => (
              <button key={id} onClick={() => setTab(id)} style={{ flex:1, padding:"0.8rem 0", background:"none", border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color: tab === id ? "#f0efed" : C.muted, borderBottom: tab === id ? "1.5px solid rgba(165,180,252,0.6)" : "1.5px solid transparent", transition:"all 0.2s" }}>{label}</button>
            ))}
          </div>
        )}

        <div className="modal-grid-layout" style={{ overflowY: "auto", flex: 1, touchAction: "manipulation" }}>
          {/* Diagram pane */}
          {(!isMobile || tab === "diagram") && (
            <div style={{ padding: isMobile ? "1.5rem 1rem 2.5rem 1rem" : "1.75rem 1.5rem 2rem 2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.9rem", fontFamily:"'Outfit',sans-serif", fontSize:"0.66rem", color:"rgba(165,180,252,0.28)", letterSpacing:"0.08em" }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L4 8L9 3L10 4L5 9L3 10Z" stroke="rgba(165,180,252,0.35)" strokeWidth="0.85" fill="rgba(165,180,252,0.07)"/>
                  <path d="M8 2L10 4" stroke="rgba(165,180,252,0.35)" strokeWidth="0.85"/>
                </svg>
                sketching system architecture…
              </div>
              <ArchDiagram arch={arch} visible={drawn} />
            </div>
          )}

          {/* Breakdown pane */}
          {(!isMobile || tab === "breakdown") && (
            <div style={{ padding: isMobile ? "1.25rem 1.25rem 2.5rem" : "1.75rem 2rem 2rem 1.75rem" }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.66rem", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:C.accent, margin:"0 0 1.4rem 0" }}>Layer Breakdown</p>
              <div style={{ display:"flex", flexDirection:"column" }}>
                {breakdown.map((item, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay: 0.2 + i * 0.1, duration:0.36, ease:"easeOut" }}
                    style={{ paddingBottom: i < breakdown.length - 1 ? "1.3rem" : 0, marginBottom: i < breakdown.length - 1 ? "1.3rem" : 0, borderBottom: i < breakdown.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.4rem" }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", border:"1px solid rgba(165,180,252,0.55)", background:"rgba(165,180,252,0.12)", flexShrink:0 }}/>
                      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.8rem", fontWeight:500, color:C.accent }}>{item.layer}</span>
                    </div>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.84rem", color:C.muted, lineHeight:1.7, margin:0, fontWeight:300, paddingLeft:"0.95rem" }}>{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop:"1.75rem", paddingTop:"1.25rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(165,180,252,0.28)", margin:"0 0 0.65rem 0" }}>Stack</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.38rem" }}>
                  {project.technologies?.map((t, i) => (
                    <span key={i} style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.68rem", color:C.muted, background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", padding:"0.22rem 0.55rem", borderRadius:"3px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const canvasRef = useRef(null);
  const [windowWidth, setW] = useState(window.innerWidth);
  const [activeProject, setActiveProject] = useState(null);

  const isMobile   = windowWidth <= 768;
  const navOffset  = isMobile ? `${NAV_H_MOBILE + 24}px` : `${NAV_H_DESKTOP + 28}px`;

  useEffect(() => {
    document.body.style.backgroundColor = C.bg;
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    window.scrollTo(0, 0);

    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    const bgnodes = [];
    const nodeCount = Math.min(50, Math.floor((cw * ch) / 28000));
    for (let i = 0; i < nodeCount; i++) {
      bgnodes.push({
        x: Math.random() * cw, y: Math.random() * ch,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.1 + 0.5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.015,
      });
    }

    const mouse = { x: cw*0.5, y: ch*0.4, tx: cw*0.5, ty: ch*0.4 };
    const onMM  = (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    const onCR  = () => { cw = canvas.width = window.innerWidth; ch = canvas.height = window.innerHeight; };
    window.addEventListener("mousemove", onMM);
    window.addEventListener("resize", onCR);

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, Math.max(cw,ch)*0.5);
      g.addColorStop(0, "rgba(145,135,245,0.09)");
      g.addColorStop(0.4, "rgba(90,85,180,0.01)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g; ctx.fillRect(0,0,cw,ch);
      for (const n of bgnodes) {
        n.angle += n.speed;
        n.x += n.vx + Math.sin(n.angle)*0.1;
        n.y += n.vy + Math.cos(n.angle)*0.1;
        if (n.x<0||n.x>cw) n.vx*=-1;
        if (n.y<0||n.y>ch) n.vy*=-1;
        const dx=mouse.x-n.x, dy=mouse.y-n.y;
        const dist=Math.sqrt(dx*dx+dy*dy), maxR=220;
        let rx=n.x, ry=n.y;
        if (dist<maxR) {
          const str=(maxR-dist)/maxR;
          rx-=(dx/dist)*str*18; ry-=(dy/dist)*str*18;
          ctx.strokeStyle=`rgba(165,180,252,${str*0.09})`;
          ctx.lineWidth=0.5;
          ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(mouse.x,mouse.y); ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(rx,ry,n.radius,0,Math.PI*2);
        ctx.fillStyle = dist<maxR ? `rgba(165,180,252,${0.25+(maxR-dist)/maxR*0.45})` : "rgba(246,245,243,0.15)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onCR);
      window.removeEventListener("mousemove", onMM);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key==="Escape") setActiveProject(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const projects = [
    { id: 1, title: "ContentAI", description: "An AI-driven content generation platform optimized for production scaling, performant modular layouts, and autonomous workflow handling.", technologies: ["Next.js","FastAPI","Python","PostgreSQL","Tailwind CSS"], githubLink: "https://github.com/RedPanda-08", liveLink: "https://ai-content-generator-blush-one.vercel.app/" },
    { id: 2, title: "BrowsyBot", description: "Chrome subsystem extension built to securely isolate and archive local browsing history data arrays independently, preventing loss against local browser state deletions.", technologies: ["Python","JavaScript","SQLite3","Chrome API","Express.js"], githubLink: "https://github.com/RedPanda-08/BrowsyBot", liveLink: "https://example.com/" },
    { id: 3, title: "Arogya Mitra", description: "Collaborative healthcare analytics intelligence dashboard focused on modular electronic health records management, systemic parsing, and metadata metrics rendering.", technologies: ["Spring Boot","React","Java","SQL","Framer Motion"], githubLink: "https://github.com/RedPanda-08", liveLink: "https://example.com/" },
    { id: 4, title: "ACIS — Ancient Civilization Intelligence System", description: "A modern interactive data visualization dashboard built using Streamlit, Plotly, and Pandas to explore UNESCO World Heritage Sites data. The project focuses on clean analytics, geographical visualization, heritage risk analysis, and country-level insights using the UNESCO WHC 2023 dataset.", technologies: ["Streamlit","Plotly","Pandas","Python","Data Visualization"], githubLink: "https://github.com/RedPanda-08/ASCI---Archeological-Analytics", liveLink: "https://asci-archeological-analytics.streamlit.app/" },
  ];

  return (
    <div style={{ position:"relative", minHeight:"100vh", backgroundColor:C.bg, color:C.text, overflowX:"hidden" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:3, opacity:0.012, mixBlendMode:"hard-light", backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='mn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23mn)'/%3E%3C/svg%3E")`}}/>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:1, opacity:0.015, backgroundImage:`linear-gradient(to right,rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.4) 1px,transparent 1px)`, backgroundSize:"60px 60px"}}/>
      <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}/>

      <div style={{ position: "relative", zIndex: 4, maxWidth: 1100, margin: "0 auto", padding: `${navOffset} 1.5rem clamp(3rem,6vw,5rem)`, boxSizing: "border-box" }}>
        {/* Header */}
        <motion.section initial="hidden" animate="visible" style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"clamp(4rem,8vw,6rem)" }}>
          <motion.div variants={fadeUp} custom={0.1} style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:"0.5rem" }}>
            <Label>Index</Label>
            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(2.4rem,6vw,4.5rem)", lineHeight:1.1, letterSpacing:"-0.01em", color:C.text, margin:0 }}>
              Selected <span style={{ fontStyle:"italic", fontWeight:400, color:C.accent }}>Productions</span>.
            </h1>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(0.95rem,2vw,1.12rem)", fontWeight:300, color:C.muted, maxWidth:"520px", lineHeight:1.65, margin:"0.5rem 0 0 0" }}>
              A curation of platform architectures, dataset classification tools, and deep-stack engineering implementations built with clear operational intent.
            </p>
          </motion.div>
        </motion.section>

        {/* Cards grid */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.05 }} style={{ marginBottom:"4rem" }}>
          <div style={{ display:"grid", gridTemplateColumns: windowWidth > 768 ? "1fr 1fr" : "1fr", gap:"1.5rem", width:"100%" }}>
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={fadeUp} custom={index*0.12}
                style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"4px", padding:"2rem", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"2rem", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", boxSizing:"border-box" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(165,180,252,0.3)"; e.currentTarget.style.backgroundColor=C.surfaceHover; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 30px -15px rgba(145,135,245,0.14)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.backgroundColor=C.surface; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                  <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontStyle:"italic", fontSize:"1.4rem", color:C.text, margin:0, letterSpacing:"0.01em" }}>{project.title}</h3>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.95rem", fontWeight:300, color:C.text, lineHeight:1.65, margin:0, opacity:0.95 }}>{project.description}</p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                    {project.technologies.map((tech,i)=>(
                      <span key={i} style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.72rem", fontWeight:400, color:C.muted, background:"rgba(255,255,255,0.015)", border:`1px solid ${C.border}`, padding:"0.35rem 0.75rem", borderRadius:"3px", letterSpacing:"0.02em" }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"1.2rem", borderTop:`1px solid ${C.border}`, paddingTop:"1.1rem", fontFamily:"'Outfit',sans-serif", flexWrap:"wrap" }}>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", color:C.dim, fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.08em", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e=>e.currentTarget.style.color=C.accent} onMouseLeave={e=>e.currentTarget.style.color=C.dim}
                    ><FaGithub size={13}/> Source Code</a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", color:C.dim, fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.08em", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e=>e.currentTarget.style.color=C.accent} onMouseLeave={e=>e.currentTarget.style.color=C.dim}
                    ><FaExternalLinkAlt size={11}/> Launch Site</a>
                    <button onClick={() => setActiveProject(project)}
                      style={{ marginLeft:"auto", display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"rgba(165,180,252,0.05)", border:"1px solid rgba(165,180,252,0.2)", borderRadius:"3px", color:"rgba(165,180,252,0.65)", fontSize:"0.7rem", fontFamily:"'Outfit',sans-serif", textTransform:"uppercase", letterSpacing:"0.1em", padding:"0.35rem 0.8rem", cursor:"pointer", transition:"all 0.2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(165,180,252,0.12)"; e.currentTarget.style.borderColor="rgba(165,180,252,0.45)"; e.currentTarget.style.color=C.accent; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(165,180,252,0.05)"; e.currentTarget.style.borderColor="rgba(165,180,252,0.2)"; e.currentTarget.style.color="rgba(165,180,252,0.65)"; }}
                    >
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L4 8L9.5 2.5 L10 3L4.5 9L2.5 10.5Z" stroke="currentColor" strokeWidth="0.9" fill="rgba(165,180,252,0.1)"/>
                        <path d="M8.5 1.5L10.5 3.5" stroke="currentColor" strokeWidth="0.9"/>
                      </svg>
                      Architecture
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

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

      <AnimatePresence>
        {activeProject && <ArchModal project={activeProject} onClose={() => setActiveProject(null)} isMobile={isMobile} />}
      </AnimatePresence>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@300;400;500&display=swap');
        body { margin:0; padding:0; background:#0d0e15; -webkit-font-smoothing:antialiased; }
        
        .modal-grid-layout {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
        }

        @media (max-width: 768px) {
          .modal-grid-layout {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
      <div style={{ width: 14, height: "1px", background:C.accent }} />
      <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:C.accent }}>{children}</span>
    </div>
  );
}