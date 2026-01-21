import React, { useRef, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import Scene from './components/Scene';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Preloader from './components/Preloader';

function App() {
  const mainRef = useRef(null)
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Preloader onFinished={() => setLoading(false)} />

      {!loading && (
        <ReactLenis root>
          <div ref={mainRef} className="app-wrapper" style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg-color)', cursor: 'none' }}>
             {/* Global 3D Scene */}
            <Scene eventSource={mainRef} style={{ pointerEvents: 'none', zIndex: -1 }} />
            
            <Cursor />
            
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </ReactLenis>
      )}
    </>
  );
}

export default App;
