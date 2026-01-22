import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';

const FloatingShape = ({ position, rotation, scale, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
        meshRef.current.rotation.x = Math.cos(t / 4) / 2;
        meshRef.current.rotation.y = Math.sin(t / 4) / 2;
        meshRef.current.position.y = position[1] + Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial 
           backside
           samples={4}
           thickness={0.5}
           roughness={0.15}
           clearcoat={1}
           clearcoatRoughness={0.1}
           transmission={1}
           background={color} 
           color={color}
           chromaticAberration={0.2}
           anisotropy={1}
        />
      </mesh>
    </group>
  );
};

const SkillsScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        
        {/* Centered Main Spiral - Increased Scale */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <FloatingShape position={[0, 0, 0]} rotation={[0, 0, 0]} scale={3} color="#C5A059" />
        </Float>
      </Canvas>
    </div>
  );
};

export default SkillsScene;
