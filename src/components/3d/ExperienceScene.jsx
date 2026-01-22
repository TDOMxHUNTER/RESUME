import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SmokeShaderMaterial = {
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

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
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
      
      // Slow moving noise for "Liquid" feel
      float t = uTime * 0.2;
      
      // Domain warping
      float noise1 = snoise(uv * 3.0 + t);
      float noise2 = snoise(uv * 3.0 - t + noise1);
      
      // Create smoke patterns
      float pattern = snoise(uv * 2.0 + vec2(noise2));
      
      // Soften
      float smoke = smoothstep(0.3, 0.8, pattern);
      
      // Mix Black background with Gold color based on smoke density
      vec3 finalColor = mix(vec3(0.0), uColor, smoke * 0.4); // 0.4 opacity for subtlety
      
      // Vignette to fade edges
      float dist = distance(uv, vec2(0.5));
      finalColor *= smoothstep(0.8, 0.2, dist);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const LiquidSmoke = () => {
    const materialRef = useRef();
    const { viewport } = useThree(); // Get screen dimensions
    
    // Convert shader object to Material
    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#C5A059') }
        },
        vertexShader: SmokeShaderMaterial.vertexShader,
        fragmentShader: SmokeShaderMaterial.fragmentShader,
    }), []);

    useFrame((state) => {
        if(materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial 
                ref={materialRef} 
                args={[shaderArgs]} 
                transparent={true}
            />
        </mesh>
    );
};

const ExperienceScene = () => {
  return (
    <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: -1,
        borderRadius: '40px', // Round all 4 corners
        overflow: 'hidden' // Clip the canvas to the border radius
    }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <LiquidSmoke />
      </Canvas>
    </div>
  );
};

export default ExperienceScene;
