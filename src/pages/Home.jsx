import React, { useRef } from 'react';
import Scene from '../components/Scene';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Home = () => {
  const mainRef = useRef(null)

  return (
    <div ref={mainRef} className="app-wrapper" style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg-color)' }}>
        {/* Global 3D Scene */}
        <Scene eventSource={mainRef} style={{ pointerEvents: 'none', zIndex: -1 }} />
        
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
    </div>
  );
};

export default Home;
