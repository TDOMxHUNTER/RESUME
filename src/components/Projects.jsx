import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null); // Tracks hover for background
  const [expandedProject, setExpandedProject] = useState(null); // Tracks click for accordion

  const projects = [
    {
      title: "Valhalla",
      type: "NFT Ecosystem",
      desc: "The official website for Valhalla on Monad. (X: @Valhalla__xyz)",
      year: "2026",
      link: "https://valhallanft.xyz/",
      img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" // Placeholder image for now, or user can update
    },
    {
      title: "Monad Element",
      type: "Ecosystem Gallery",
      desc: "A showcase gallery for the Monad ecosystem, built for the Dev Mission.",
      year: "2025",
      link: "https://monad-element.vercel.app/",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Coming Soon",
      type: "In Development",
      desc: "More projects are currently in the works. Stay tuned.",
      year: "2026",
      link: "#",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const handleInteraction = (index) => {
    setActiveProject(index);
  };

  return (
    <section id="projects" style={{ position: 'relative', padding: '150px 0', minHeight: '100vh' }}>
      
      {/* 1. Cinematic Background Takeover with Round Corners */}
      <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0, 
          borderRadius: '40px', // Matches Experience Section
          overflow: 'hidden',   // Clips the iframes
          pointerEvents: 'none' // Ensures background isn't interactive
      }}>
        <AnimatePresence>
            {projects.map((project, index) => (
                activeProject === index && (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.5, scale: 1 }} // slightly higher opacity for websites
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: '#000'
                        }}
                    >
                        <iframe 
                            src={project.link}
                            title={project.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                filter: 'grayscale(30%) contrast(1.1)' // Cinematic look
                            }}
                        />
                    </motion.div>
                )
            ))}
        </AnimatePresence>
        {/* Gradient Overlay to ensure text readability */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, #050505 10%, transparent 50%, #050505 90%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-label" 
          style={{ marginBottom: '4rem' }}
        >
          Selected Works (03)
        </motion.p>

        <div onMouseLeave={() => setActiveProject(null)}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => handleInteraction(index)}
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
              style={{ 
                padding: '4rem 0', 
                borderTop: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}>{project.title}</h3>
                  <span className="font-sans text-muted" style={{ display: 'block', marginTop: '0.5rem' }}>{project.type} — {project.desc}</span>
                </div>
                <div className="font-sans text-muted" style={{ fontSize: '1rem' }}>{project.year}</div>
              </div>

              {/* 3. Accordion Expansion */}
              <AnimatePresence>
                {expandedProject === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: '2rem' }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                     <p className="font-sans text-muted" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                        Detailed case study description goes here. Explaining the tech stack, the challenge, and the solution provided for {project.title}.
                     </p>
                     <motion.a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 10 }}
                        className="font-display"
                        style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}
                     >
                        Visit Website <span>→</span>
                     </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {/* Closing Line */}
          <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

    </section>
  );
};

export default Projects;
