"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef } from "react";

function ArtworkCard({
  url,
  position,
  rotation,
  scale,
  aspect = 1,
  speed = 1.2,
  rotationIntensity = 0.35,
  floatIntensity = 1.0,
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
  aspect?: number;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}) {
  const texture = useLoader(THREE.TextureLoader, url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[aspect, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
      </mesh>
    </Float>
  );
}

function Dust({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
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
          {/* Cypher Wallpaper (16:9 widescreen artwork) */}
          <ArtworkCard
            url="/cypher-wallpaper.jpg"
            aspect={1.79}
            position={[3.8, -0.6, -2.4]}
            rotation={[0.04, -0.32, 0.06]}
            scale={1.8}
            speed={1.1}
          />

          {/* Cypher Scene Artwork on left */}
          <ArtworkCard
            url="/cypher-scene.jpg"
            aspect={1.33}
            position={[-3.3, 0.6, -1.6]}
            rotation={[0, 0.28, -0.1]}
            scale={1.65}
            speed={1.2}
          />

          {/* Background Wallpaper Depth Card */}
          <ArtworkCard
            url="/cypher-wallpaper.jpg"
            aspect={1.79}
            position={[-1.6, -1.8, -2.4]}
            rotation={[0.08, 0.18, -0.12]}
            scale={1.35}
            speed={0.9}
          />

          {/* Full Art Sticker Card (Depth) */}
          <ArtworkCard
            url="/cypher-sticker.jpg"
            aspect={1.0}
            position={[0.5, 1.7, -2.7]}
            rotation={[0.06, 0, 0.14]}
            scale={1.05}
            speed={1.0}
          />
        </Suspense>
        <Dust />
      </Rig>
    </Canvas>
  );
}
