import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import "../index.css";
import developerimg from "../images/developerimg.jpg";

export default function AboutMe() {
  const typedRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);

    // Typed.js initialization
    const typed = new Typed(typedRef.current, {
      strings: ["Aspiring Data Scientist", "Full Stack Developer", "Passionate Photographer"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
    });

    // Force scroll recalculation
    if (containerRef.current) {
      // This forces a reflow/repaint
      containerRef.current.style.overflowY = "hidden";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.overflowY = "auto";
        }
      }, 10);
    }

    // // Make sure there's enough content to scroll
    // document.body.style.minHeight = "101vh";

    return () => {
      typed.destroy();
    };
  }, []);

  // Define your skills
  const skillsSet1 = [
    { name: "React", color: "#61DAFB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", color: "#F7DF1E", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", color: "#3776AB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "HTML5", color: "#E34F26", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", color: "#1572B6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  ];
  
  const skillsSet2 = [
    { name: "Express.js", color: "#ffffff", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "SQL", color: "#4479A1", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", color: "#F05032", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", color: "#FF6F00", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Firebase", color: "#007ACC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ];
  
  const educationData = [
    {
      year: "2023 - 2027",
      degree: " 🎓 B.Tech in Data Science",
      institution: " 🏫 Malla Reddy University, Hyderabad, Telangana",
      description: [
        " 📌 Studying advanced concepts in:",
        "- Data Science",
        "- Software Development"
      ],
    },
    {
      year: "2021 - 2023",
      degree: " 📜 Telangana State Board of Intermediate Education",
      institution: " 🏫 Loyola Academy, Hyderabad, Telangana",
      description: [
        "📌 Specialized in Mathematics, Physics, and Chemistry (MPC).",
        "Developed strong analytical and problem-solving skills."
      ],
    },
    {
      year: "2013 - 2021",
      degree: " 📜 Central Board of Secondary Education (CBSE)",
      institution: " 🏫 Sadhu Vaswani International School, Hyderabad, Telangana",
      description: [
        " 📌 Built a strong foundation in:",
        "- Mathematics & Science",
        "- Computer Science & Logical Thinking",
        "- Communication & Leadership Skills"
      ],
    },
  ];
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-start text-white p-20 animated-bg overflow-auto"
    >
      {/* Hero Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10 mb-24"
      >
        {/* Left Section - Animated Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <p className="text-4xl md:text-5xl font-bold font-poppins text-center md:text-left tracking-wide">
            Hi, I'm <span className="soft-glow-blue">Navraj Singh</span>.<br />
            I am a <span ref={typedRef} className="soft-glow-yellow inline"></span>
          </p>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex justify-center md:justify-start space-x-6 mt-6"
          >
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub className="text-3xl md:text-4xl bg-transparent rounded-full" />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin className="text-3xl md:text-4xl bg-transparent rounded-full text-blue-600" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram className="text-3xl md:text-4xl bg-transparent rounded-full text-pink-500" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="image-container mt-10">
            <img
              src={developerimg}
              alt="Developer"
              className="developer-img rounded-xl w-80 md:w-80 object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-6xl mb-32"
      >
        <h2 className="text-4xl font-bold text-center mb-8 skills-heading">
          <span className="soft-glow-blue">My</span> <span className="soft-glow-yellow">Skills</span>
        </h2>

        <div className="skills-container">
          <div className="skills-wrapper">
            {/* First row of skills scrolling left to right */}
            <div className="skills-track track-1">
              {[...skillsSet1, ...skillsSet1].map((skill, index) => (
                <div 
                  key={`skill1-${index}`} 
                  className="skill-pill" 
                  style={{
                    backgroundColor: `${skill.color}15`,
                    border: `2px solid ${skill.color}`
                  }}
                >
                  <img 
                    src={skill.logo} 
                    alt={`${skill.name} logo`} 
                    className="skill-logo" 
                  />
                  <span style={{ color: skill.color }}>{skill.name}</span>
                </div>
              ))}
            </div>
            
            {/* Second row of skills scrolling right to left */}
            <div className="skills-track track-2">
              {[...skillsSet2, ...skillsSet2].map((skill, index) => (
                <div 
                  key={`skill2-${index}`} 
                  className="skill-pill" 
                  style={{
                    backgroundColor: `${skill.color}15`,
                    border: `2px solid ${skill.color}`
                  }}
                >
                  <img 
                    src={skill.logo} 
                    alt={`${skill.name} logo`} 
                    className="skill-logo" 
                  />
                  <span style={{ color: skill.color }}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div 
        className="education-container w-full max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-left mb-8 skills-heading">
          <span className="soft-glow-blue">My</span> <span className="soft-glow-yellow">Educational Journey</span>
        </h2>

        <div className="timeline">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.3 } }
              }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">{edu.year}</h3>
                <h4 className="timeline-degree">{edu.degree}</h4>
                <p className="timeline-institution">{edu.institution}</p>
                <div className="timeline-description">
                  {Array.isArray(edu.description) ? (
                    edu.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))
                  ) : (
                    <p>{edu.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* Add extra content to ensure there's something to scroll */}
      <div className="h-64"></div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        /* Background Animation */
        @keyframes backgroundFade {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-bg {
          background: linear-gradient(-45deg, #000000, #0a192f, #1c1c1c);
          background-size: 400% 400%;
          animation: backgroundFade 15s infinite ease-in-out;
        }

        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }

        /* Glowing Text */
        .soft-glow-blue {
          color: #60a5fa;
          text-shadow: 0 0 8px rgba(96, 165, 250, 0.8);
        }

        .soft-glow-yellow {
          color: #facc15;
          text-shadow: 0 0 8px rgba(250, 204, 21, 0.8);
        }

        /* Social Media Icon Styling */
        .social-icon {
          transition: transform 0.3s ease-in-out, filter 0.4s ease-in-out;
        }

        .social-icon:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.6));
        }

        /* Image Container & Effect */
        .image-container {
          position: relative;
          border-radius: 12px;
          padding: 6px;
          background: linear-gradient(45deg, #60a5fa, #facc15);
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.4);
          overflow: hidden;
          animation: borderPulse 2s infinite alternate;
        }

        /* Developer Image Styling */
        .developer-img {
          transition: transform 0.5s ease-in-out;
          height: auto;
          aspect-ratio: 1/1;
          object-position: center;
          filter: contrast(1.05) brightness(1.05);
        }

        .image-container:hover .developer-img {
          transform: scale(1.05);
        }

        /* Animated Border */
        @keyframes borderPulse {
          0% {
            box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.6);
          }
          100% {
            box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
          }
        }

        /* Skills Section Styling */
        .skills-heading {
          position: relative;
          display: inline-block;
          padding-bottom: 15px;
        }

        .skills-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #60a5fa, #facc15);
          border-radius: 2px;
        }

        .skills-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(3, 3, 3, 0.3);
        }

        .skills-wrapper {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding: 10px 0;
        }

        .skills-track {
          display: flex;
          gap: 20px;
          white-space: nowrap;
        }

        .track-1 {
          animation: scroll 25s linear infinite;
        }

        .track-2 {
          animation: scroll-reverse 25s linear infinite;
        }

        /* Logo styling for skills */
        .skill-logo {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          object-fit: contain;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
        }

        .skill-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* For the Express.js logo which may be difficult to see on dark background */
        .skill-pill img[alt="Express.js logo"] {
          filter: invert(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
        }

        /* For GitHub logo which may be difficult to see */
        .skill-pill img[alt="GitHub logo"] {
          filter: invert(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
        }

        .skill-pill:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Timeline styling */
        .timeline {
          position: relative;
          margin-top: 20px;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #60a5fa, #facc15);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          width: 50%;
          padding: 20px;
        }

        .timeline-dot {
          position: absolute;
          top: 30px;
          width: 16px;
          height: 16px;
          background: #facc15;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 8px rgba(250, 204, 21, 0.8);
        }

        .timeline-item.left {
          text-align: right;
          left: 0;
        }

        .timeline-item.right {
          left: 50%;
        }

        .timeline-item.left .timeline-dot {
          right: -8px;
        }

        .timeline-item.right .timeline-dot {
          left: -8px;
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease-in-out;
        }

        .timeline-content:hover {
          transform: scale(1.05);
        }

        .timeline-year {
          display: block;
          font-size: 1.2rem;
          font-weight: bold;
          color: #facc15;
          margin-bottom: 10px;
        }

        .timeline-degree {
          font-weight: bold;
          color: #60a5fa;
          margin-bottom: 5px;
        }

        .timeline-institution {
          font-style: italic;
          margin-bottom: 10px;
        }

        .timeline-description p {
          margin-bottom: 5px;
        }
          @media (max-width: 768px) {
            .timeline-item {
              width: 100%;
              left: 0 !important;
              text-align: left !important;
              padding-left: 40px;
            }

            .timeline::before {
              left: 20px;
            }

            .timeline-dot {
              left: 12px !important;
              right: auto !important;
            }
          }


        /* Media Queries */
        @media (max-width: 768px) {
            .timeline-single-column {
              padding-left: 50px;
            }
            
            .timeline-dot-single {
              left: -20px;
            }
            
            .timeline-content-single {
              padding: 45px;
            }

          .image-container {
            margin-top: 2rem;
          }
          
          .skill-pill {
            padding: 8px 16px;
            font-size: 14px;
          }

          .skill-logo {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }
        }

        /* Styling for education cards */
        .education-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(96, 165, 250, 0.3);
          transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        /* Glowing effect on hover */
        .education-card:hover {
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.7), 
                      0 0 25px rgba(250, 204, 21, 0.5);
          transform: translateY(-3px);
          footer {
            text-align: center;
            padding: 10px;
            background: #222;
            margin-top: 2rem;
            color: white;
            font-size: 14px;
        }
        }
      `}</style>

      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.8 }}
  className="w-full max-w-6xl mt-16 mb-4 text-center"
>
  <div className="copyright-container">
    <p className="copyright-text">
      © {new Date().getFullYear()} Navraj Singh. All Rights Reserved.
    </p>
    <p className="copyright-subtitle">
      Made with <span className="heart">❤️</span> and React+Vite
    </p>
  </div>

  {/* Add this to your existing style jsx section */}
  <style jsx>{`
    /* Copyright Styles */
    .copyright-container {
      padding: 20px;
      border-top: 1px solid rgba(96, 165, 250, 0.2);
    }

    .copyright-text {
      font-size: 0.9rem;
      color: #9ca3af;
      margin-bottom: 4px;
    }

    .copyright-subtitle {
      font-size: 0.8rem;
      color: #6b7280;
    }

    .heart {
      color: #ef4444;
      display: inline-block;
      animation: heartbeat 1.5s infinite;
    }

    @keyframes heartbeat {
      0% { transform: scale(1); }
      5% { transform: scale(1.25); }
      10% { transform: scale(1); }
      15% { transform: scale(1.25); }
      20% { transform: scale(1); }
      100% { transform: scale(1); }
    }
    
}
  `}</style>
  </motion.div>
    </div>
  );
}