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

        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            paddingTop: '3rem',
            marginTop: '2rem',
            textAlign: 'left',
            flexWrap: 'wrap',
            gap: '3rem'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
             <span className="font-sans text-muted">© 2025 Fazal Ur Rehman</span>
          </div>
          
          <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap', paddingTop: '1rem', alignItems: 'flex-start' }}>
            
            {/* Twitter/X Block: Quote -> Arrow -> Link */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <span className="font-hand" style={{ fontSize: '1.4rem', maxWidth: '180px', textAlign: 'center', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                    Go here for seeing my X account and updates about me.
                </span>
                 <img 
                    src="/arrow.png" 
                    alt="Arrow" 
                    style={{ 
                        width: '40px', 
                        height: 'auto', 
                        filter: 'invert(1)', 
                        opacity: 0.9, 
                        transform: 'rotate(90deg)' // Pointing Down
                    }} 
                />
                <a 
                    href="https://x.com/_fazalurrehman0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-display" 
                    style={{ textDecoration: 'none', color: '#fff', fontSize: '1.4rem' }}
                >
                    Twitter / X
                </a>
            </div>

            {/* GitHub Block: Link -> Arrow -> Quote */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <a 
                    href="https://github.com/fazalurrehman" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-display" 
                    style={{ textDecoration: 'none', color: '#fff', fontSize: '1.4rem' }}
                >
                    GitHub
                </a>
                 <img 
                    src="/arrow1.png" 
                    alt="Arrow" 
                    style={{ 
                        width: '40px', 
                        height: 'auto', 
                        filter: 'invert(1)', 
                        opacity: 0.9, 
                         transform: 'rotate(90deg)' // Pointing Down
                    }} 
                />
                <span className="font-hand" style={{ fontSize: '1.4rem', maxWidth: '180px', textAlign: 'center', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                    Go here to see my latest coding updates.
                </span>
            </div>

            {/* LinkedIn Block: Link -> Arrow -> Quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-display" 
                    style={{ textDecoration: 'none', color: '#fff', fontSize: '1.4rem' }}
                >
                    LinkedIn
                </a>
                 <img 
                    src="/arrow.png" 
                    alt="Arrow" 
                    style={{ 
                        width: '40px', 
                        height: 'auto', 
                        filter: 'invert(2)', 
                        opacity: 0.6, 
                        transform: 'rotate(90deg)' // Pointing Down
                    }} 
                />
                 <span className="font-hand" style={{ fontSize: '1.4rem', maxWidth: '180px', textAlign: 'center', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                    Professional network.
                </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
