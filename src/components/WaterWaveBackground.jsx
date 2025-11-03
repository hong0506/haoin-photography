import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Vector2 } from 'three'
import * as THREE from 'three'

// 水波着色器
const WaveShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uResolution: { value: new Vector2(1, 1) },
    uColor1: { value: new THREE.Color('#0a0a0a') },
    uColor2: { value: new THREE.Color('#0f766e') },
    uColor3: { value: new THREE.Color('#14b8a6') },
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
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
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
      vec2 mouseInfluence = uMouse - uv;
      float dist = length(mouseInfluence);
      
      // 创建多层水波
      float wave1 = sin(uv.x * 10.0 + uTime * 0.5) * cos(uv.y * 10.0 + uTime * 0.3);
      float wave2 = sin(uv.x * 15.0 - uTime * 0.7) * cos(uv.y * 12.0 - uTime * 0.4);
      float wave3 = sin(dist * 20.0 - uTime * 2.0) * 0.5;
      
      // 噪声层
      float n = noise(uv * 5.0 + uTime * 0.1);
      
      // 组合波形
      float pattern = (wave1 + wave2 + wave3 * 0.5 + n * 0.3) * 0.25;
      
      // 鼠标扰动
      float mouseWave = smoothstep(0.3, 0.0, dist) * sin(dist * 30.0 - uTime * 3.0);
      pattern += mouseWave * 0.5;
      
      // 颜色混合
      vec3 color = mix(uColor1, uColor2, pattern + 0.5);
      color = mix(color, uColor3, smoothstep(-0.2, 0.2, pattern));
      
      // 添加渐变
      float gradient = 1.0 - (uv.y * 0.3);
      color *= gradient;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
}

function WaveMesh() {
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
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
      
      // 平滑过渡到目标鼠标位置
      meshRef.current.material.uniforms.uMouse.value.x += 
        (mousePosition.current.x - meshRef.current.material.uniforms.uMouse.value.x) * 0.05
      meshRef.current.material.uniforms.uMouse.value.y += 
        (mousePosition.current.y - meshRef.current.material.uniforms.uMouse.value.y) * 0.05
    }
  })

  // 监听鼠标移动
  React.useEffect(() => {
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
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={WaveShader.vertexShader}
        fragmentShader={WaveShader.fragmentShader}
      />
    </mesh>
  )
}

export default function WaterWaveBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
      >
        <WaveMesh />
      </Canvas>
    </div>
  )
}
