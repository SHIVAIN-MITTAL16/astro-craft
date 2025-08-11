import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface Moon {
  id: string
  name: string
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  description: string
}

interface Planet {
  id: string
  name: string
  position: [number, number, number]
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  description: string
  funFact: string
  moons: Moon[]
  onClick?: () => void
}

function Moon3D({ moon, planetRadius }: { moon: Moon; planetRadius: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const orbitRef = useRef<THREE.Group>(null!)
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    // Rotate moon
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 2
    }
    
    // Orbit around planet
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * moon.orbitSpeed
    }
  })

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planetRadius + moon.orbitRadius, 0, 0]}
      >
        <sphereGeometry args={[moon.size, 16, 16]} />
        <meshStandardMaterial
          color={moon.color}
          emissive={moon.color}
          emissiveIntensity={0.1}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}

function Planet3D({ planet }: { planet: Planet }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const orbitRef = useRef<THREE.Group>(null!)
  const planetGroupRef = useRef<THREE.Group>(null!)
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    // Rotate planet
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5
    }
    
    // Orbit around center (sun)
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * planet.orbitSpeed
    }
  })

  return (
    <group ref={orbitRef}>
      <group ref={planetGroupRef} position={[planet.orbitRadius, 0, 0]}>
        {/* Planet */}
        <mesh
          ref={meshRef}
          onClick={planet.onClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            document.body.style.cursor = 'auto'
          }}
        >
          <sphereGeometry args={[planet.size, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.color}
            emissiveIntensity={0.2}
            roughness={0.7}
            metalness={0.3}
          />
          {/* Planet glow */}
          <mesh scale={1.2}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        </mesh>
        
        {/* Moons */}
        {planet.moons.map((moon) => (
          <Moon3D key={moon.id} moon={moon} planetRadius={planet.size} />
        ))}
      </group>
    </group>
  )
}

function Sun3D() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial
        color="#FDB813"
      />
      {/* Sun glow layers */}
      <mesh scale={1.3}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </mesh>
  )
}

interface Galaxy3DProps {
  planets: Planet[]
  onPlanetClick: (planetId: string) => void
}

export default function Galaxy3D({ planets, onPlanetClick }: Galaxy3DProps) {
  const planetsWithClick = useMemo(() => 
    planets.map(planet => ({
      ...planet,
      onClick: () => onPlanetClick(planet.id)
    }))
  , [planets, onPlanetClick])

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
        
        {/* Animated starfield */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        {/* Central Sun */}
        <Sun3D />
        
        {/* Planets */}
        {planetsWithClick.map((planet) => (
          <Planet3D key={planet.id} planet={planet} />
        ))}
        
        {/* Camera controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.3}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
    </div>
  )
}