import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "../index.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  useEffect(() => {
    document.body.style.overflow = "scroll";
    window.scrollTo(0, 0);
  }, []);
  

  // Project data 
  const projects = [
    
    {
      id: 1,
      title: "BrowsyBot",
      description: "BrowsyBot is a Chrome extension + bot, that tracks and saves your web browsing history independently, ensuring you never lose important sites—even if your browser history is deleted.",
      technologies: ["Python","HTML5","CSS3","JavaScript","Express.js","Sqlite3","Google Chrome Extension"],
      githubLink: "https://github.com/RedPanda-08/BrowsyBot",
      liveLink: "https://example.com/",
      featured: false
    },
    {
        id: 2,
        title: "Portfolio",
        description: "The portfolio website you are currently viewing. It showcases my skills, projects, and contact information.",
        technologies: ["React + Vite","Tailwind CSS","Framer Motion","Express.js","MongoDB"],
        githubLink: "https://github.com/RedPanda-08/",
        liveLink: "https://example.com/",
        featured: false
      },
    
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start text-white p-10 md:p-20 animated-bg overflow-auto">
      {/* Projects Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl mb-16 text-center"
      >
        <h2 className="text-4xl font-bold skills-heading p-10">
          <span className="soft-glow-blue">My</span> <span className="soft-glow-yellow">Projects</span>
        </h2>
        <p className="mt-4 text-2xl text-gray-300 max-w-3xl mx-auto">
          Here are some of my recent projects that showcase my skills.
        </p>
      </motion.div>

      

      {/* Other Projects Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-6xl mb-16"
      >
        <h3 className="text-2xl font-bold mb-8 soft-glow-yellow">Featured Projects &#128640; </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.filter(project => !project.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="project-card"
            >
              <div className="project-content">
                <h4 className="project-title">{project.title}</h4>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech-container">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="project-tech">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> Code
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        /* Background Animation - matches your AboutMe component */
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

        /* Glowing Text - matches your AboutMe component */
        .soft-glow-blue {
          color: #60a5fa;
          text-shadow: 0 0 8px rgba(96, 165, 250, 0.8);
        }

        .soft-glow-yellow {
          color: #facc15;
          text-shadow: 0 0 8px rgba(250, 204, 21, 0.8);
        }

        /* Skills Heading - matches your AboutMe component */
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

        /* Project Card Styles */
        .project-card {
          background: rgba(10, 25, 47, 0.7);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(96, 165, 250, 0.2);
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(96, 165, 250, 0.3);
          border: 1px solid rgba(96, 165, 250, 0.5);
        }

        .project-card.featured {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-image-container {
          overflow: hidden;
          width: 100%;
          height: 0;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          position: relative;
        }

        .project-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.05);
        }

        .project-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          background: linear-gradient(90deg, #60a5fa, #facc15);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .project-description {
          color: #d1d5db;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex: 1;
        }

        .project-tech-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1.5rem;
        }

        .project-tech {
          background: rgba(96, 165, 250, 0.15);
          color: #93c5fd;
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d1d5db;
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
        }

        .project-link:hover {
          color: #facc15;
          background: rgba(96, 165, 250, 0.2);
          border: 1px solid rgba(250, 204, 21, 0.4);
        }

        @media (max-width: 768px) {
          .project-card.featured {
            display: block;
          }
          
          .project-image-container {
            padding-top: 66.67%; /* 3:2 aspect ratio for mobile */
          }
        }
      `}</style>
    </div>
  );
}