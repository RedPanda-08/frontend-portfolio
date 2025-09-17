import React, { useEffect,useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      // Call your backend tracking function only once
      fetch("https://portfolio-backend-1-eogw.onrender.com/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "home" })
      })
        .then(res => res.json())
        .then(data => console.log("Visit tracked:", data))
        .catch(err => console.error("Error tracking visit:", err));

      hasTracked.current = true; 
    }
  }, []);

  // Initialize GA4 only once
  useEffect(() => {
    ReactGA.initialize("G-K3HPQR3MY2"); 
    ReactGA.send("pageview");
  }, []);

  // Track portfolio visit once per session
  useEffect(() => {
    if (!sessionStorage.getItem("visitTracked")) {
      fetch("https://portfolio-backend-1-eogw.onrender.com/api/track/visit", {
        method: "POST"
      })
      .then(() => {
        console.log("Portfolio visit tracked");
        sessionStorage.setItem("visitTracked", "true");
      })
      .catch(err => console.error("Error tracking visit:", err));
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
