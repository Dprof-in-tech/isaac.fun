'use client'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei'
import { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'

// Preload the model
useGLTF.preload('/models/zombie.glb')


const ThingHand = () => {
  const group = useRef(null)
  const { scene, animations } = useGLTF('/models/zombie.glb')
  const { actions } = useAnimations(animations, group)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (actions) {
      const animationKeys = Object.keys(actions)
      if (animationKeys.length > 0) {
        actions[animationKeys[0]]?.play()
      }
    }
  }, [actions])

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: THREE.Material) => {
              if ('color' in mat) {
                const material = mat as THREE.MeshStandardMaterial
                material.color.setHex(0x8B0000)
                material.emissive.setHex(0x000000)
                material.visible = true
                material.emissiveIntensity = 0.2
                material.roughness = 0.3
                material.metalness = 0.1
              }
            })
          } else {
            if ('color' in child.material) {
              const material = child.material as THREE.MeshStandardMaterial
              material.color.setHex(0x8B0000)
              material.emissive.setHex(0x000000)
              material.visible = true
              material.emissiveIntensity = 0.2
              material.roughness = 0.3
              material.metalness = 0.1
            }
          }
        }
      })
    }
  }, [scene])

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={isMobile ? 1.2 : 1.5} 
        position={isMobile ? [0, -0.8, 0] : [0, -1.2, 0]} 
      />
    </group>
  )
}


const ModelFallback = () => (
  <mesh position={[0, -1, 0]}>
    <boxGeometry args={[1, 2, 0.5]} />
    <meshStandardMaterial color="#8B0000" />
  </mesh>
)

export default function ThingIntro() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas 
      camera={{ 
        position: isMobile ? [0, 0, 3] : [0, 0, 5], 
        fov: isMobile ? 60 : 50, 
        zoom: isMobile ? 1.5 : 2 
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      performance={{ min: 0.5 }}
      gl={{ 
        antialias: false,
        alpha: false,
        powerPreference: "high-performance"
      }}
    >
      <color attach="background" args={['#020000']} />
      
      {/* Optimized lighting for mobile */}
      <ambientLight intensity={isMobile ? 1.5 : 1.2} color="#efefef" />
      <directionalLight 
        position={[2, 5, 3]} 
        intensity={isMobile ? 1.5 : 1.2}
        color="#DC143C"
      />
      
      <Suspense fallback={<ModelFallback />}>
        <ThingHand />
      </Suspense>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false}
        enableDamping={!isMobile}
      />
    </Canvas>
  )
}
