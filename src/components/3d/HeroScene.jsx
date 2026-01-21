import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const LiquidShape = ({ position, scale, color, delay = 0 }) => {
  const materialRef = useRef();
  const meshRef = useRef();
  // Internal state for smooth entry
  const [currentScale, setCurrentScale] = useState(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (materialRef.current) {
        materialRef.current.time = t * 0.5;
    }

    // Smooth entry animation (Lerp scale from 0 to target)
    // Simple delayed entry logic
    if (t > delay) {
        if (currentScale < 1) {
            const speed = 1.5;
            const newScale = THREE.MathUtils.lerp(currentScale, 1, delta * speed);
            setCurrentScale(newScale);
            if (meshRef.current) {
                // Apply the interpolated scale factor to the base scale
                // base scale is passed as prop 'scale', which can be number or array.
                // Assuming uniform scale for simplicity or handle scalar
                const s = typeof scale === 'number' ? scale : scale[0]; 
                meshRef.current.scale.setScalar(s * newScale);
            }
        }
    } else {
        if (meshRef.current) meshRef.current.scale.setScalar(0);
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron ref={meshRef} args={[1, 15]} scale={0}> 
            <MeshTransmissionMaterial
                ref={materialRef}
                backside
                samples={4}
                thickness={0.5}
                roughness={0}
                transmission={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                background={new THREE.Color('#121212')}
                color={new THREE.Color(color)}
                chromaticAberration={0.1}
                anisotropy={1}
                distortion={0.8}
                distortionScale={0.5}
                temporalDistortion={0.1}
                resolution={512}
            />
        </Icosahedron>
      </Float>
    </group>
  );
};

const HeroScene = () => {
  return (
    <>
      <Environment preset="city" />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#C5A059" />
      <ambientLight intensity={0.5} />
      
      {/* Main Liquid Element - Enters after 0.5s */}
      <LiquidShape position={[4, 0, 0]} scale={2.2} color="#C5A059" delay={0.5} />

      {/* Secondary Distant Element - Enters after 0.8s */}
      <LiquidShape position={[-6, -3, -5]} scale={1.5} color="#8A703E" delay={0.8} />
    </>
  );
};

export default HeroScene;
