import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '150px 0', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="text-label" style={{ marginBottom: '2rem' }}>What's Next?</p>
        
        <motion.a 
          href="mailto:hello@designer.com"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, color: 'var(--accent-gold)' }}
          className="font-display"
          style={{ 
            fontSize: 'clamp(3rem, 15vw, 15rem)', 
            lineHeight: 0.9, 
            color: 'var(--text-main)', 
            textDecoration: 'none',
            display: 'block',
            marginBottom: '4rem',
            cursor: 'pointer'
          }}
        >
          Let's Talk.
        </motion.a>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <span className="font-sans text-muted">© 2025</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" className="font-sans text-muted" style={{ textDecoration: 'none' }}>LinkedIn</a>
            <a href="#" className="font-sans text-muted" style={{ textDecoration: 'none' }}>Twitter</a>
            <a href="#" className="font-sans text-muted" style={{ textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
