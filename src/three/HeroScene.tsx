"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef } from "react";

function StickerCard({
  url,
  position,
  rotation,
  scale,
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
}) {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={1.1}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
      </mesh>
    </Float>
  );
}

function Dust({ count = 130 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={0xefa14c} transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.22, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.14, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Rig>
        <Suspense fallback={null}>
          <StickerCard url="/cypher-sticker.jpg" position={[-3.1, 0.6, -1.2]} rotation={[0, 0.3, -0.12]} scale={1.6} />
          <StickerCard url="/cypher-scene.jpg" position={[3.1, -0.5, -1.6]} rotation={[0, -0.3, 0.08]} scale={[2.3, 1.72, 1]} />
          <StickerCard url="/cypher-sticker.jpg" position={[0.4, 1.5, -2.5]} rotation={[0.1, 0, 0.18]} scale={0.95} />
          <StickerCard url="/cypher-scene.jpg" position={[-1.5, -1.5, -2.1]} rotation={[0, 0.15, -0.14]} scale={[1.1, 0.82, 1]} />
        </Suspense>
        <Dust />
      </Rig>
    </Canvas>
  );
}
