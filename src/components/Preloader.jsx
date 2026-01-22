import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Procedural Audio Generation
const playCinematicSwell = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        
        // Master Gain (Volume Control) - BOOSTED
        const master = ctx.createGain();
        master.gain.setValueAtTime(0, now);
        master.gain.linearRampToValueAtTime(0.8, now + 0.5); // Boosted to 0.8
        master.gain.exponentialRampToValueAtTime(0.001, now + 3.5); 
        master.connect(ctx.destination);

        // 1. Low Drone (Bass)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(60, now);
        osc1.frequency.linearRampToValueAtTime(40, now + 4); 
        osc1.connect(master);
        osc1.start(now);
        osc1.stop(now + 4);

        // 2. Ethereal Highs (Triangle) - REMOVED (Caused Siren Effect)
        // Replaced with a second subtle Sine for harmony (Chord)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(90, now); // Perfect 5th harmonic
        // Constant pitch, no slide (prevents siren effect)
        const gain2 = ctx.createGain();
        gain2.gain.value = 0.1; 
        osc2.connect(gain2);
        gain2.connect(master);
        osc2.start(now);
        osc2.stop(now + 4);
        
        // 3. Wind/Whoosh (Noise)
        const bufferSize = ctx.sampleRate * 4; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(4000, now + 2); 
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, now); // Boosted from 0.08
        
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(master);
        noise.start(now);
        noise.stop(now + 4);

    } catch (e) {
        console.warn("Audio generation failed:", e);
    }
};

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
        volume={10} 
        color={color} 
        scale={scale} 
        opacity={0.75}
        segments={8} 
    />
  );
};

function CloudExplosion() {
    // Optimized Configuration
    const clouds = [
        // Top
        { start: [0, 0, -5], end: [0, 9, -5], color: "#505050", scale: 5 }, 
        // Bottom
        { start: [0, 0, -5], end: [0, -9, -5], color: "#404040", scale: 5 },
        // Left
        { start: [0, 0, -5], end: [-14, 0, -5], color: "#606060", scale: 5 },
        // Right
        { start: [0, 0, -5], end: [14, 0, -5], color: "#606060", scale: 5 },
        // Corners 
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
    // Attempt to play sound
    const handleInteraction = () => {
        playCinematicSwell();
        // Remove listener to play only once
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
    };

    // Try playing immediately (might be blocked by browser)
    playCinematicSwell();
    
    // Fallback: Play on first interaction if blocked
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(onFinished, 1500); 
    }, 4500); 
    
    return () => {
        clearTimeout(timer);
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
    };
  }, [onFinished]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      // FASTER TIMING HERE
      transition: { staggerChildren: 0.03, delayChildren: 0.5 } 
    },
    exit: { opacity: 0 }
  };

  const letter = {
    hidden: { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
    show: { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut" } // Slightly faster letter reveal
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
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}> 
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
