import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Resume from './pages/Resume';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Preloader onFinished={() => setLoading(false)} />

      {!loading && (
        <ReactLenis root>
          <div className="app-wrapper" style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg-color)', cursor: 'none' }}>
             
            <Cursor />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/the-alchemist" element={<Resume />} />
            </Routes>

          </div>
        </ReactLenis>
      )}
    </>
  );
}

export default App;
