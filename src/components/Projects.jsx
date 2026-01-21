import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Lumina Financial",
      type: "Fintech Dashboard",
      desc: "Institutional trading platform.",
      year: "2024"
    },
    {
      title: "Aura Mind",
      type: "Wellness App",
      desc: "Mobile-first mindfulness.",
      year: "2023"
    },
    {
      title: "Vortex Gear",
      type: "E-Commerce",
      desc: "3D shopping experience.",
      year: "2023"
    }
  ];

  return (
    <section id="projects" className="container" style={{ padding: '150px 0' }}>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-label" 
        style={{ marginBottom: '4rem' }}
      >
        Selected Works (03)
      </motion.p>

      <div>
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, opacity: 0.8 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'baseline',
              padding: '4rem 0', 
              borderTop: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer'
            }}
          >
            <div>
              <h3 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}>{project.title}</h3>
              <span className="font-sans text-muted" style={{ display: 'block', marginTop: '0.5rem' }}>{project.type} — {project.desc}</span>
            </div>
            
            <div className="font-sans text-muted" style={{ fontSize: '1rem' }}>{project.year}</div>
          </motion.div>
        ))}
        {/* Closing Line */}
        <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.2)' }} />
      </div>
    </section>
  );
};

export default Projects;
