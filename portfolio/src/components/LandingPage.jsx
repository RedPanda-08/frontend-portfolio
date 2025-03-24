import React, { useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative flex flex-col justify-center items-center p-4">
      {/* Floating Particles */}
      <div className="particles-container absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-white opacity-30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          className="text-white text-5xl md:text-8xl font-bold cookie-regular mb-6"
          style={{
            animation: "fadeInDown 1.5s ease-out",
            textShadow: "0 0 15px rgba(255,255,255,0.5)",
          }}
        >
          Navraj Singh's Portfolio
        </h1>

        {/* Animated Glowing Button */}
        <Link to="/about">
          <button className="mt-4 px-6 py-3 text-lg md:text-xl font-semibold text-black bg-white rounded-full shadow-md transition-transform transform hover:scale-110 active:scale-95 glow-button">
            Know Me
          </button>
        </Link>
      </div>

      {/* Made with Love Text */}
      <div className="absolute bottom-4 text-white text-sm md:text-lg font-semibold flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity glow-text">
        Made with <span className="text-red-500 text-2xl animate-pulse glow-heart">❤️</span> by Navraj Singh
      </div>

      {/* Added CSS for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-100px) translateX(100px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
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
          animation: buttonGlow 1.5s infinite alternate;
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
          background-color: #000000;
        }

        .cookie-regular {
          font-family: "Cookie", cursive;
        }
      `}</style>
    </div>
  );
}
