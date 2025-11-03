import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 极光着色器
const AuroraShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uColor1: { value: new THREE.Color("#000000") }, // 纯黑
    uColor2: { value: new THREE.Color("#006666") }, // 深青绿
    uColor3: { value: new THREE.Color("#00cccc") }, // 中青色
    uColor4: { value: new THREE.Color("#00ffdd") }, // 明亮青色
    uColor5: { value: new THREE.Color("#66ffff") }, // 淡青色
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
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uColor5;
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

    // 分形布朗运动
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv;
      
      // 创建垂直流动效果
      float timeFlow = uTime * 0.05;
      vec2 flowUv = uv;
      
      // 均匀分布的极光效果
      float bottomGradient = smoothstep(0.8, 0.0, uv.y);
      float bottomIntense = smoothstep(0.5, 0.0, uv.y);
      
      // 多层极光带
      float aurora1 = fbm(vec2(uv.x * 3.0 + timeFlow, uv.y * 2.0 - timeFlow * 0.5));
      float aurora2 = fbm(vec2(uv.x * 2.0 - timeFlow * 0.7, uv.y * 3.0 + timeFlow));
      float aurora3 = fbm(vec2(uv.x * 4.0 + timeFlow * 1.2, uv.y * 1.5 - timeFlow * 0.3));
      
      // 波浪形极光
      float wave1 = sin(uv.x * 6.0 + timeFlow * 2.0 + uv.y * 3.0) * 0.5 + 0.5;
      float wave2 = sin(uv.x * 4.0 - timeFlow * 1.5 + uv.y * 4.0) * 0.5 + 0.5;
      float wave3 = cos(uv.x * 8.0 + timeFlow * 3.0 + uv.y * 2.0) * 0.5 + 0.5;
      
      // 组合极光效果
      float auroraPattern = aurora1 * 0.5 + aurora2 * 0.4 + aurora3 * 0.4;
      auroraPattern += wave1 * 0.3 + wave2 * 0.25 + wave3 * 0.25;
      
      // 减少底部强化，让效果更均匀
      auroraPattern *= (1.0 + bottomGradient * 0.8 + bottomIntense * 0.3);
      
      // 鼠标交互 - 创建光晕
      vec2 mouseInfluence = uMouse - uv;
      float mouseDist = length(mouseInfluence);
      float mouseGlow = smoothstep(0.8, 0.0, mouseDist) * 0.5;
      auroraPattern += mouseGlow;
      
      // 颜色混合 - 从深色到亮色
      vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.3, auroraPattern));
      color = mix(color, uColor3, smoothstep(0.3, 0.6, auroraPattern));
      color = mix(color, uColor4, smoothstep(0.6, 0.8, auroraPattern));
      color = mix(color, uColor5, smoothstep(0.8, 1.0, auroraPattern));
      
      // 添加闪烁的星点
      float stars = step(0.99, noise(uv * 80.0 + timeFlow * 0.5));
      color += vec3(stars) * 1.2;
      
      // 整体渐变 - 更均匀的亮度分布
      float verticalGradient = smoothstep(1.0, 0.0, uv.y);
      color *= (0.4 + verticalGradient * 0.6);
      
      // 减少底部提亮
      color += vec3(bottomIntense * 0.05);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

// 极光平面组件
function AuroraMesh() {
  const meshRef = useRef();
  const mousePosition = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color("#000000") },
      uColor2: { value: new THREE.Color("#006666") },
      uColor3: { value: new THREE.Color("#00cccc") },
      uColor4: { value: new THREE.Color("#00ffdd") },
      uColor5: { value: new THREE.Color("#66ffff") },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;

      // 平滑鼠标移动
      meshRef.current.material.uniforms.uMouse.value.x +=
        (mousePosition.current.x -
          meshRef.current.material.uniforms.uMouse.value.x) *
        0.05;
      meshRef.current.material.uniforms.uMouse.value.y +=
        (mousePosition.current.y -
          meshRef.current.material.uniforms.uMouse.value.y) *
        0.05;
    }
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: event.clientX / window.innerWidth,
        y: 1.0 - event.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 256, 256]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={AuroraShader.vertexShader}
        fragmentShader={AuroraShader.fragmentShader}
      />
    </mesh>
  );
}

// 3D极光带
function Aurora3DBands() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.8 - 3.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3, -3]}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[0, i * 0.4, -i * 0.3]}
          rotation={[Math.PI * 0.15, 0, 0]}
        >
          <planeGeometry args={[15, 1.2, 64, 1]} />
          <meshBasicMaterial
            color={`hsl(${175 + i * 8}, 85%, ${60 + i * 3}%)`}
            transparent
            opacity={0.25 - i * 0.025}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// 漂浮的极光粒子
function AuroraParticles() {
  const pointsRef = useRef();
  const particleCount = 1200; // 增加粒子数量

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = Math.random() * 12 - 10; // 更集中在底部
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 5;

      // 青绿色调 - 更亮
      const hue = 170 + Math.random() * 30; // 170-200度
      const saturation = 0.8 + Math.random() * 0.2;
      const lightness = 0.6 + Math.random() * 0.4; // 提高亮度

      const color = new THREE.Color(
        `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // 横向漂移
        positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.005;

        // 向上漂浮
        positions[i3 + 1] += 0.01;

        // 循环
        if (positions[i3 + 1] > 5) {
          positions[i3 + 1] = -8;
        }

        // 边界循环
        if (positions[i3] > 10) positions[i3] = -10;
        if (positions[i3] < -10) positions[i3] = 10;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

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
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
        }}
      >
        <color attach="background" args={["#002222"]} />
        <AuroraParticles />
      </Canvas>

      {/* CSS极光叠加层 - 移除底部蓝色方块 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 顶部淡化 */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
    </div>
  );
}
