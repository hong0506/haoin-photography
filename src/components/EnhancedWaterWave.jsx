import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Vector2, Vector3, Color } from 'three'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei'

// 增强的水波着色器 - 更动态的效果
const EnhancedWaveShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uResolution: { value: new Vector2(1, 1) },
    uColor1: { value: new THREE.Color('#0a0a0a') },
    uColor2: { value: new THREE.Color('#0f766e') },
    uColor3: { value: new THREE.Color('#14b8a6') },
    uColor4: { value: new THREE.Color('#2dd4bf') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // 添加波动的顶点位移
      vec3 pos = position;
      float wave = sin(position.x * 3.0 + uTime * 0.5) * 0.02;
      wave += cos(position.y * 3.0 + uTime * 0.3) * 0.02;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    varying vec2 vUv;
    varying vec3 vPosition;

    // 改进的噪声函数
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

    // FBM 分形布朗运动
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouseInfluence = uMouse - uv;
      float dist = length(mouseInfluence);
      
      // 多层水波效果
      float wave1 = sin(uv.x * 12.0 + uTime * 0.8) * cos(uv.y * 12.0 + uTime * 0.6);
      float wave2 = sin(uv.x * 18.0 - uTime * 1.2) * cos(uv.y * 15.0 - uTime * 0.9);
      float wave3 = sin(dist * 25.0 - uTime * 3.0) * 0.5;
      
      // 流动效果
      vec2 flowUv = uv + vec2(sin(uTime * 0.3), cos(uTime * 0.2)) * 0.1;
      float flow = fbm(flowUv * 3.0 + uTime * 0.2);
      
      // 噪声层
      float n1 = noise(uv * 8.0 + uTime * 0.15);
      float n2 = fbm(uv * 4.0 - uTime * 0.1);
      
      // 组合所有效果
      float pattern = (wave1 + wave2 + wave3 * 0.5 + flow * 0.6 + n1 * 0.3 + n2 * 0.4) * 0.2;
      
      // 鼠标交互 - 更强的涟漪效果
      float mouseWave = smoothstep(0.4, 0.0, dist) * sin(dist * 40.0 - uTime * 4.0);
      pattern += mouseWave * 0.8;
      
      // 多色彩混合
      vec3 color = mix(uColor1, uColor2, pattern + 0.5);
      color = mix(color, uColor3, smoothstep(-0.3, 0.3, pattern));
      color = mix(color, uColor4, smoothstep(0.2, 0.6, pattern) * 0.3);
      
      // 添加渐变和光晕
      float gradient = 1.0 - (uv.y * 0.4);
      color *= gradient;
      
      // 添加闪烁的星点效果
      float stars = smoothstep(0.98, 1.0, noise(uv * 50.0 + uTime * 0.5));
      color += vec3(stars) * 0.3;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
}

// 粒子场景
function ParticleField() {
  const pointsRef = useRef()
  const particleCount = 1000

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      const positions = pointsRef.current.geometry.attributes.position.array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        // 波动效果
        positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.001
        positions[i3] += Math.cos(time + positions[i3 + 1]) * 0.0005
        
        // 循环边界
        if (positions[i3 + 1] > 5) positions[i3 + 1] = -5
        if (positions[i3] > 5) positions[i3] = -5
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2dd4bf"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// 漂浮的几何体
function FloatingGeometry() {
  const meshRef = useRef()
  const torusRef = useRef()
  const sphereRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.15
      torusRef.current.rotation.z = time * 0.25
      torusRef.current.position.y = Math.cos(time * 0.6) * 0.3
    }

    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(time * 0.3) * 2
      sphereRef.current.position.y = Math.cos(time * 0.4) * 0.5
    }
  })

  return (
    <group>
      {/* 八面体 */}
      <mesh ref={meshRef} position={[-3, 0, -2]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#14b8a6" wireframe transparent opacity={0.3} />
      </mesh>

      {/* 圆环 */}
      <mesh ref={torusRef} position={[3, 0, -1]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.25} />
      </mesh>

      {/* 球体 */}
      <mesh ref={sphereRef} position={[0, 2, -3]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#0d9488" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// 增强的水波网格
function EnhancedWaveMesh() {
  const meshRef = useRef()
  const mousePosition = useRef({ x: 0.5, y: 0.5 })
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
      uColor1: { value: new THREE.Color('#0a0a0a') },
      uColor2: { value: new THREE.Color('#0f766e') },
      uColor3: { value: new THREE.Color('#14b8a6') },
      uColor4: { value: new THREE.Color('#2dd4bf') },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
      
      meshRef.current.material.uniforms.uMouse.value.x += 
        (mousePosition.current.x - meshRef.current.material.uniforms.uMouse.value.x) * 0.05
      meshRef.current.material.uniforms.uMouse.value.y += 
        (mousePosition.current.y - meshRef.current.material.uniforms.uMouse.value.y) * 0.05
    }
  })

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: event.clientX / window.innerWidth,
        y: 1.0 - event.clientY / window.innerHeight,
      }
    }

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mousePosition.current = {
          x: event.touches[0].clientX / window.innerWidth,
          y: 1.0 - event.touches[0].clientY / window.innerHeight,
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 256, 256]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={EnhancedWaveShader.vertexShader}
        fragmentShader={EnhancedWaveShader.fragmentShader}
      />
    </mesh>
  )
}

export default function EnhancedWaterWave() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <EnhancedWaveMesh />
        <ParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
