import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, MeshDistortMaterial, Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// 彩色粒子云
function ColorfulParticles() {
  const pointsRef = useRef()
  const particleCount = 2000
  const mousePosition = useRef(new THREE.Vector2(0, 0))

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // 创建螺旋分布的粒子
      const radius = Math.random() * 15
      const spinAngle = radius * 0.5
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius - 10

      // 彩虹色彩
      const colorAngle = (i / particleCount) * Math.PI * 2
      colors[i * 3] = Math.sin(colorAngle) * 0.5 + 0.5 // R
      colors[i * 3 + 1] = Math.sin(colorAngle + 2) * 0.5 + 0.5 // G
      colors[i * 3 + 2] = Math.sin(colorAngle + 4) * 0.5 + 0.5 // B
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      
      // 整体旋转
      pointsRef.current.rotation.y = time * 0.05
      
      // 粒子波动
      const positions = pointsRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const z = positions[i3 + 2]
        const distance = Math.sqrt(x * x + z * z)
        
        // 波浪效果
        positions[i3 + 1] += Math.sin(time + distance * 0.2) * 0.005
        
        // 鼠标影响
        const mouseDistance = Math.sqrt(
          Math.pow(x - mousePosition.current.x * 10, 2) + 
          Math.pow(z - mousePosition.current.y * 10, 2)
        )
        if (mouseDistance < 3) {
          positions[i3] += (x - mousePosition.current.x * 10) * 0.01
          positions[i3 + 2] += (z - mousePosition.current.y * 10) * 0.01
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// 流动的彩色球体
function FloatingOrbs() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-4, 2, -8]}>
          <MeshDistortMaterial
            color="#ff006e"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#ff006e"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
        <Sphere args={[0.7, 32, 32]} position={[4, -1, -6]}>
          <MeshDistortMaterial
            color="#8338ec"
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            emissive="#8338ec"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={2.5}>
        <Sphere args={[0.4, 32, 32]} position={[0, 3, -10]}>
          <MeshDistortMaterial
            color="#00f5ff"
            attach="material"
            distort={0.6}
            speed={2.5}
            roughness={0.2}
            metalness={0.8}
            emissive="#00f5ff"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.8}>
        <Sphere args={[0.35, 32, 32]} position={[-3, -2, -7]}>
          <MeshDistortMaterial
            color="#ffbe0b"
            attach="material"
            distort={0.3}
            speed={1.8}
            roughness={0.2}
            metalness={0.8}
            emissive="#ffbe0b"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={2.2}>
        <Sphere args={[0.6, 32, 32]} position={[3, 1, -9]}>
          <MeshDistortMaterial
            color="#06ffa5"
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#06ffa5"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>
    </group>
  )
}

// 几何线框
function WireframeShapes() {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime
      group.current.rotation.x = time * 0.1
      group.current.rotation.y = time * 0.15
    }
  })

  return (
    <group ref={group} position={[0, 0, -5]}>
      <mesh position={[-2, 1, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.15} />
      </mesh>

      <mesh position={[2, -1, 2]}>
        <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>

      <mesh position={[0, 2, 1]}>
        <dodecahedronGeometry args={[0.8]} />
        <meshBasicMaterial color="#f43f5e" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

// 动态渐变背景平面
function GradientPlane() {
  const meshRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color('#000000') },
      uColor2: { value: new THREE.Color('#1a0033') },
      uColor3: { value: new THREE.Color('#0a0033') },
      uColor4: { value: new THREE.Color('#ff006e') },
      uColor5: { value: new THREE.Color('#8338ec') },
      uColor6: { value: new THREE.Color('#3a86ff') },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (meshRef.current) {
        meshRef.current.material.uniforms.uMouse.value.x = e.clientX / window.innerWidth
        meshRef.current.material.uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uColor5;
    uniform vec3 uColor6;
    varying vec2 vUv;

    // 噪声函数
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;
      
      // 创建流动效果
      vec2 flowUv = uv + vec2(
        sin(uTime * 0.2 + uv.y * 3.0) * 0.1,
        cos(uTime * 0.15 + uv.x * 3.0) * 0.1
      );
      
      // 多层噪声
      float n1 = noise(flowUv * 3.0 + uTime * 0.1);
      float n2 = noise(flowUv * 6.0 - uTime * 0.15);
      float n3 = noise(flowUv * 12.0 + uTime * 0.2);
      
      // 鼠标影响
      vec2 mouseInfluence = uMouse - uv;
      float mouseDist = length(mouseInfluence);
      float mouseEffect = smoothstep(0.5, 0.0, mouseDist);
      
      // 多色渐变混合
      vec3 color = mix(uColor1, uColor2, uv.y);
      color = mix(color, uColor3, n1);
      color = mix(color, uColor4, smoothstep(0.3, 0.7, n2) * 0.3);
      color = mix(color, uColor5, smoothstep(0.4, 0.8, n3) * 0.2);
      color = mix(color, uColor6, mouseEffect * 0.4);
      
      // 添加发光效果
      float glow = smoothstep(0.8, 0.0, uv.y) * 0.5;
      color += vec3(glow * 0.2, glow * 0.1, glow * 0.3);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return (
    <mesh ref={meshRef} position={[0, 0, -12]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

// 鼠标跟随光晕
function MouseGlow() {
  const lightRef = useRef()
  const mousePosition = useRef(new THREE.Vector3(0, 0, 5))

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.lerp(mousePosition.current, 0.1)
    }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mousePosition.current.set(x * 5, y * 3, 5)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <pointLight
      ref={lightRef}
      color="#00f5ff"
      intensity={2}
      distance={8}
      decay={2}
    />
  )
}

export default function SpectacularBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
        <GradientPlane />
        <ColorfulParticles />
        <FloatingOrbs />
        <WireframeShapes />
        <MouseGlow />
        <ambientLight intensity={0.2} />
      </Canvas>

      {/* 额外的CSS渐变叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
      
      {/* 动态光晕叠加 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}
