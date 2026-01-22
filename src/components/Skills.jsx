import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsScene from './3d/SkillsScene';

const Skills = () => {
  const skills = ["React", "Three.js", "Framer Motion", "WebGL", "TypeScript", "Node.js", "Design Systems", "UI/UX"];
  const [isHovered, setIsHovered] = useState(false);
  
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <section id="skills" style={{ position: 'relative', padding: '150px 0', overflow: 'hidden', cursor: 'grab' }}>
      
      {/* 3D Background */}
      <SkillsScene />

      <div 
        style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '2rem' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 30, 
            ease: "linear",
            repeatType: "loop" 
          }}
          style={{ 
            display: 'flex', 
            gap: '4rem', 
            whiteSpace: 'nowrap', 
            animationPlayState: isHovered ? 'paused' : 'running',
            width: 'fit-content' 
          }}
          className={isHovered ? 'paused' : ''}
        >
          {duplicatedSkills.map((skill, i) => (
            <motion.span 
              key={i} 
              className="font-display" 
              initial={{ color: 'transparent', WebkitTextStroke: '1px #C5A059', opacity: 1 }}
              whileHover={{ 
                scale: 1.1, 
                color: 'var(--accent-gold)', 
                opacity: 1,
                WebkitTextStroke: '0px transparent'
              }}
              transition={{ duration: 0.3 }}
              style={{ 
                fontSize: '8vw', 
                display: 'inline-block',
                mixBlendMode: 'difference', // The Magic: Gold - Black = Gold. Gold - Gold = Black.
                backdropFilter: isHovered ? 'blur(2px)' : 'none'
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
