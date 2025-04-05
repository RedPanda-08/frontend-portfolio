import React, { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.overflow = "auto";
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full" style={{ height: '100vh', display: 'grid', gridTemplateRows: '1fr auto' }}>
      {/* Floating Particles */}
      <div className="particles-container absolute inset-0 z-0 overflow-hidden">
        {[...Array(windowWidth > 768 ? 20 : 10)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-white opacity-30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content - centered in available space */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 sm:px-0">
        <div
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-center mb-6 cookie-regular"
          style={{
            animation: "fadeInDown 1.5s ease-out",
            textShadow: "0 0 15px rgba(255,255,255,0.5)"
          }}
        >
          Navraj Singh's Portfolio
        </div>

        <Link to="/about">
          <button 
            className="mt-4 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-black bg-white rounded-full shadow-md transition-transform transform hover:scale-110 active:scale-95 glow-button"
          >
            Know Me    
          </button>
        </Link>
      </div>

      {/* Footer - fixed at bottom */}
      <div className="w-full py-4 text-center text-white text-sm sm:text-lg font-semibold flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity glow-text relative z-10 bg-black">
        Made with <span className="text-red-500 text-xl sm:text-2xl animate-pulse glow-heart">❤️</span> by Navraj Singh
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-100px) translateX(100px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes buttonGlow {
          0% { box-shadow: 0 0 5px #ffffff; }
          50% { box-shadow: 0 0 20px #ffffff, 0 0 40px #affa82; }
          100% { box-shadow: 0 0 5px #ffffff; }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }
          100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
        }

        @keyframes heartGlow {
          0% { text-shadow: 0 0 5px rgba(255, 0, 0, 0.8); }
          50% { text-shadow: 0 0 15px rgba(255, 0, 0, 1); }
          100% { text-shadow: 0 0 5px rgba(255, 0, 0, 0.8); }
        }

        .glow-button {
          animation: buttonGlow 1.5s infinite alternate, bounce 2s infinite;
        }

        .glow-text {
          animation: glow 1.5s infinite alternate;
        }

        .glow-heart {
          animation: heartGlow 1.5s infinite alternate;
        }

        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background-color: #000000;
        }

        .cookie-regular {
          font-family: "Cookie", cursive;
          font-weight: 400;
          font-style: normal;
        }
        
        @media (max-width: 640px) {
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-50px) translateX(50px); }
            100% { transform: translateY(0) translateX(0); }
          }
        }
      `}</style>
    </div>
  );
}