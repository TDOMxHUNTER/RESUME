import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      date: "2023 - Present",
      role: "Senior Digital Designer",
      company: "Creative Pulse Agency",
      desc: "Leading the design system initiative and crafting narrative-driven web experiences for Fortune 500 clients."
    },
    {
      date: "2020 - 2023",
      role: "UI/UX Developer",
      company: "Innovate Labs",
      desc: "Developed high-fidelity prototypes and production-ready interfaces. Specialized in micro-interactions."
    },
    {
      date: "2018 - 2020",
      role: "Frontend Engineer",
      company: "StartUp Vision",
      desc: "Built the core product MVP using modern JavaScript frameworks. Focused on performance optimization."
    }
  ];

  return (
    <section id="experience" className="container" style={{ padding: '150px 0', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
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
