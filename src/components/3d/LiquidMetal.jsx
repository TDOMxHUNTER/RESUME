import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const LiquidMetal = () => {
  const materialRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.time = t;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Icosahedron args={[1.5, 10]} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={4}
          thickness={0.2}
          roughness={0}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          background={new THREE.Color('#121212')}
          color={new THREE.Color('#C5A059')}
          chromaticAberration={0.4}
          anisotropy={1}
          distortion={1}
          distortionScale={0.5}
          temporalDistortion={0.2}
        />
      </Icosahedron>
      
      {/* Secondary accent shapes */}
      <Icosahedron args={[0.5, 0]} position={[-2, 1, -1]}>
         <meshStandardMaterial color="#8A703E" wireframe />
      </Icosahedron>
    </Float>
  );
};

export default LiquidMetal;
