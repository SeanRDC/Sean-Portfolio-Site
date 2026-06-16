import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore, usePointerStore } from "../utils/store";
import { designConfig } from "../data/config";

// --- GLSL SHADER LOGIC ---
const PodiumShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uVelocity: 0,
    uNdcPointer: new THREE.Vector2(0, 0),
    uFluidIntensity: designConfig.hero.shader.fluidIntensity,
    uNoiseIntensity: designConfig.hero.shader.noiseIntensity,
    uBarrelIntensity: designConfig.hero.shader.barrelIntensity,
    uColor: designConfig.hero.shader.colorBeige,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform float uVelocity;
    uniform vec2 uNdcPointer;
    uniform float uFluidIntensity;
    uniform float uNoiseIntensity;
    uniform float uBarrelIntensity;
    uniform vec3 uColor;
    varying vec2 vUv;

    vec2 barrelPincushion(vec2 uv, float strength) {
      vec2 st = uv - 0.5;
      float radius = 1.0 + strength * dot(st, st);
      return 0.5 + radius * st;
    }

    float sdCircle(vec2 p, float r) {
      return length(p) - r;
    }

    void main() {
      vec2 distortedUv = barrelPincushion(vUv, uProgress * uBarrelIntensity);
      vec2 mouseOffset = uNdcPointer * uFluidIntensity * (1.0 - uProgress);
      distortedUv += mouseOffset * 0.05;

      vec2 centeredUv = vUv - 0.5;
      float circleMask = sdCircle(centeredUv, 0.45 + (uProgress * 0.5));
      float smoothAlpha = 1.0 - smoothstep(-0.02, 0.02, circleMask);

      vec3 finalColor = mix(vec3(0.0), uColor, smoothAlpha);
      gl_FragColor = vec4(finalColor, smoothAlpha);
    }
  `,
);

// Register it natively to Three/Fiber
extend({ PodiumShaderMaterial });

function ShaderMesh() {
  const shaderRef = useRef<any>(null);
  const { size } = useThree();

  const scrollProgress = useScrollStore((state) => state.progress);
  const scrollVelocity = useScrollStore((state) => state.velocity);
  const ndcX = usePointerStore((state) => state.ndcX);
  const ndcY = usePointerStore((state) => state.ndcY);

  useFrame((state) => {
    if (!shaderRef.current) return;
    shaderRef.current.uTime = state.clock.getElapsedTime();
    shaderRef.current.uProgress = THREE.MathUtils.lerp(
      shaderRef.current.uProgress,
      scrollProgress,
      0.1,
    );
    shaderRef.current.uVelocity = THREE.MathUtils.lerp(
      shaderRef.current.uVelocity,
      scrollVelocity,
      0.08,
    );
    shaderRef.current.uNdcPointer.set(ndcX, ndcY);
  });

  return (
    <mesh scale={[size.width, size.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* THIS WAS THE TYPO: It must match the exact camelCased name of the extended material */}
      {/* @ts-ignore */}
      <podiumShaderMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-white pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderMesh />
      </Canvas>
    </div>
  );
}
