import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import LandingPage from "./components/LandingPage.jsx";
import AboutMe from "./components/aboutme.jsx";
import Projects from "./components/Projects.jsx";
import Navbar from "./Navbar.jsx";
import ContactPage from "./components/Contact.jsx";

export default function App() {
  return (
    <MainApp />
  );
}

function MainApp() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // 1. Initialize GA4 (Google Analytics) only once when application mounts
  useEffect(() => {
    ReactGA.initialize("G-K3HPQR3MY2"); 
    ReactGA.send("pageview");
  }, []);

  // 2. Session-Level Tracking: Fire Pushover phone notification once per visitor session
  useEffect(() => {
    // Dynamic Environment Switcher
    const backendUrl = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://portfolio-backend-1-eogw.onrender.com";

    if (!sessionStorage.getItem("visitTracked")) {
      fetch(`${backendUrl}/api/track/visit`, {
        method: "POST"
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Global session telemetry established:", data);
        sessionStorage.setItem("visitTracked", "true");
      })
      .catch((err) => console.error("Session telemetry sync failed:", err));
    }
  }, []);

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}