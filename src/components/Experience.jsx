import React from 'react';
import { motion } from 'framer-motion';
import ExperienceScene from './3d/ExperienceScene';

const Experience = () => {
  const experiences = [
    {
      date: "2025 - 2026 - Present",
      role: "AI Full Stack Web Developer",
      company: "Freelance / Independent",
      desc: "Building next-generation web experiences with AI integration, immersive 3D interactions, and blockchain technologies."
    }
  ];

  return (
    <section id="experience" style={{ position: 'relative', padding: '150px 0', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* 3D Background - Now Full Width */}
      <ExperienceScene />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative', zIndex: 1 }}>
        
        {/* Sticky Header */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-huge"
            style={{ marginBottom: '2rem', color: 'var(--text-main)' }}
          >
            The <br/> Journey
          </motion.h2>
          <p className="font-sans text-muted" style={{ maxWidth: '300px' }}>
            A timeline of technical evolution and creative milestones.
          </p>
        </div>

        {/* Scrollable Content */}
        <div>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              style={{ padding: '3rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className="text-label text-gold" style={{ display: 'block', marginBottom: '1rem' }}>{exp.date}</span>
              <h3 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
              <div className="font-sans text-muted" style={{ fontSize: '1.25rem', marginBottom: '2rem', fontStyle: 'italic' }}>{exp.company}</div>
              <p className="font-sans text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{exp.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
