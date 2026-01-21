import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const MovingCloud = ({ startPos, endPos, delay, color, scale }) => {
  const ref = useRef();
  
  // Time-based animation
  useFrame((state) => {
    if (!ref.current) return;
    
    // Animation Progress
    const t = state.clock.getElapsedTime();
    const duration = 8.0; 
    const progress = Math.min(t / duration, 1);
    
    // Custom Ease Out
    const ease = 1 - Math.pow(1 - progress, 3); 

    ref.current.position.x = THREE.MathUtils.lerp(startPos[0], endPos[0], ease);
    ref.current.position.y = THREE.MathUtils.lerp(startPos[1], endPos[1], ease);
    ref.current.position.z = THREE.MathUtils.lerp(startPos[2], endPos[2], ease);
  });

  return (
    <Cloud 
        ref={ref} 
        position={startPos} 
        seed={Math.random()} 
        bounds={[4, 1, 1]} 
        volume={10} // Reduced for performance
        color={color} 
        scale={scale} 
        opacity={0.75}
        segments={8} // drastically reduced from 20 to 8 minimize draw calls/vertices
    />
  );
};

function CloudExplosion() {
    // Optimized Configuration: Fewer clouds, strategically placed
    const clouds = [
        // Top
        { start: [0, 0, -5], end: [0, 9, -5], color: "#505050", scale: 5 }, 
        // Bottom
        { start: [0, 0, -5], end: [0, -9, -5], color: "#404040", scale: 5 },
        // Left
        { start: [0, 0, -5], end: [-14, 0, -5], color: "#606060", scale: 5 },
        // Right
        { start: [0, 0, -5], end: [14, 0, -5], color: "#606060", scale: 5 },
        // Corners (Essential for framing)
        { start: [0, 0, -5], end: [-12, 8, -5], color: "#303030", scale: 4.5 },
        { start: [0, 0, -5], end: [12, 8, -5], color: "#505050", scale: 4.5 },
        { start: [0, 0, -5], end: [-12, -8, -5], color: "#404040", scale: 4.5 },
        { start: [0, 0, -5], end: [12, -8, -5], color: "#303030", scale: 4.5 },
    ];

    useFrame((state, delta) => {
        state.camera.rotation.z += delta * 0.03;
    });

    return (
        <Clouds material={THREE.MeshBasicMaterial} limit={200}> {/* Reduced limit */}
            {clouds.map((props, i) => (
                <MovingCloud key={i} startPos={props.start} endPos={props.end} color={props.color} scale={props.scale} />
            ))}
        </Clouds>
    );
}

const Preloader = ({ onFinished }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(onFinished, 1500); 
    }, 4500); 
    return () => clearTimeout(timer);
  }, [onFinished]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 1.0 } 
    },
    exit: { opacity: 0 }
  };

  const letter = {
    hidden: { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
    show: { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 1, ease: "easeOut" }
    }
  };

  const text = "Entering the Alchemy of Code";

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            backgroundColor: '#050505',
          }}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}> {/* Cap DPR */}
             <CloudExplosion />
             <ambientLight intensity={1} />
          </Canvas>
          
          <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                textAlign: 'center',
                zIndex: 10,
                mixBlendMode: 'difference' 
            }}>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    {text.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letter}
                            style={{
                                display: 'inline-block',
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                                color: '#fff',
                                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                                fontStyle: 'italic',
                                margin: char === " " ? '0 0.5rem' : '0 1px'
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
