import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'

export default function Scene({ style, eventSource, eventPrefix, ...props }) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        ...style
      }}
      eventSource={eventSource}
      eventPrefix={eventPrefix}
      gl={{ antialias: true, alpha: true }}
      {...props}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  )
}
