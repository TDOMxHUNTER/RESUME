import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- SHADER CODE ---
const CursorSmokeMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#C5A059') }, // Gold
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    // Fast noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.8; 
      
      float noise1 = snoise(uv * 2.0 + t);
      float noise2 = snoise(uv * 2.0 - t + noise1);
      float pattern = snoise(uv * 1.5 + vec2(noise2));
      
      float smoke = smoothstep(0.2, 0.9, pattern);
      
      float dist = distance(uv, vec2(0.5));
      float alpha = 1.0 - smoothstep(0.4, 0.5, dist); 

      // High visibility smoke
      vec3 finalColor = mix(vec3(0.0), uColor, smoke * 2.0); 
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

const CursorLiquid = () => {
    const materialRef = useRef();
    useFrame((state) => {
        if(materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    });
    const shaderArgs = useMemo(() => ({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#C5A059') } },
        vertexShader: CursorSmokeMaterial.vertexShader,
        fragmentShader: CursorSmokeMaterial.fragmentShader,
        transparent: true
    }), []);
    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial ref={materialRef} args={[shaderArgs]} transparent={true} />
        </mesh>
    );
};

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth "Lazy Follow" Physics (No Bounce)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // Reverted to 16px (Center of 32px)
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Strict Check: Only Links or Buttons
      const isLinkOrButton = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button');

      if (isLinkOrButton) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px', // Reverted to 32px
        height: '32px',
        border: '1px solid var(--accent-gold)', // Reverted to var
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        overflow: 'hidden',
      }}
      animate={{
        scale: isHovered ? 1.5 : 1, // Strict 1.5x scale
        backgroundColor: isHovered ? 'var(--accent-gold)' : 'rgba(0,0,0,0)', // Reverted to var
      }}
    >
        <Canvas 
            frameloop="always" 
            dpr={[1, 1.5]} 
            camera={{ position: [0, 0, 1], zoom: 1 }}
            gl={{ alpha: true, preserveDrawingBuffer: false }}
            style={{ pointerEvents: 'none' }} // FIX: Canvas was blocking mouse events!
        >
            <CursorLiquid />
        </Canvas>
    </motion.div>
  );
};

export default Cursor;
