import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import AboutMe from "../src/components/aboutme.jsx";
import Projects from "../src/components/Projects.jsx";
import Navbar from "./Navbar.jsx";
import ContactPage from "../src/components/Contact.jsx";



export default function App() {
  return (
      <MainApp />
  );
}

function MainApp() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";


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
