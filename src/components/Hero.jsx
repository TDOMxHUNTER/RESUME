import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { View } from '@react-three/drei';
import HeroScene from './3d/HeroScene';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="hero container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      
      {/* 3D View Portal */}
      <View className="hero-3d-view" style={{ position: 'absolute', top: 0, left: '-20%', width: '140%', height: '100%', zIndex: -1 }}>
        <HeroScene />
      </View>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ zIndex: 10, mixBlendMode: 'difference', color: '#F0F0F0' }}
      >
        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <motion.p variants={item} className="text-label" style={{ color: 'var(--accent-gold)' }}>
                Portfolio &copy; 2025
            </motion.p>
        </div>
        
        <div style={{ overflow: 'hidden' }}>
            <motion.h1 variants={item} className="font-display text-huge" style={{ lineHeight: 0.85, fontWeight: 400 }}>
                DIGITAL
            </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
             <motion.h1 variants={item} className="font-display text-huge" style={{ lineHeight: 0.85, fontWeight: 400, paddingLeft: '4rem' }}>
                ALCHEMY
            </motion.h1>
        </div>
        
        <div style={{ overflow: 'hidden' }}>
            <motion.p variants={item} className="font-sans text-muted" style={{ maxWidth: '400px', fontSize: '1.2rem', marginLeft: 'auto', marginRight: '4rem', textAlign: 'right' }}>
            Mer Engineer. Part Artist. <br/>
            Precision engineered experiences.
            </motion.p>
        </div>
      </motion.div>

      {/* Decorative Corners */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', width: '20px', height: '20px', borderTop: '1px solid var(--text-muted)', borderLeft: '1px solid var(--text-muted)' }} />
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '20px', height: '20px', borderTop: '1px solid var(--text-muted)', borderRight: '1px solid var(--text-muted)' }} />
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', width: '20px', height: '20px', borderBottom: '1px solid var(--text-muted)', borderLeft: '1px solid var(--text-muted)' }} />
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '20px', height: '20px', borderBottom: '1px solid var(--text-muted)', borderRight: '1px solid var(--text-muted)' }} />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '3rem', left: '50%', x: '-50%' }}
      >
         <span className="text-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
