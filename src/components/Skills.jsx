import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = ["React", "Three.js", "Framer Motion", "WebGL", "TypeScript", "Node.js", "Design Systems", "UI/UX"];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="skills" style={{ padding: '100px 0', overflow: 'hidden', cursor: 'pointer' }}>
      <div 
        style={{ display: 'flex', gap: '2rem' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "loop" }}
          style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', animationPlayState: isHovered ? 'paused' : 'running' }}
          className={isHovered ? 'paused' : ''}
        >
          {[...skills, ...skills, ...skills, ...skills].map((skill, i) => (
            <motion.span 
              key={i} 
              className="font-display" 
              initial={{ color: 'transparent', WebkitTextStroke: '1px var(--accent-gold)', opacity: 0.5 }}
              whileHover={{ 
                scale: 1.1, 
                color: 'var(--accent-gold)', 
                opacity: 1,
                WebkitTextStroke: '0px transparent'
              }}
              transition={{ duration: 0.3 }}
              style={{ 
                fontSize: '8vw', 
                display: 'inline-block'
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
       <style>{`
        .paused {
            animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
};

export default Skills;
