"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { Mesh, Group } from "three";

function FloatingGeometry() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      visible
      args={[1, 100, 200]}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? "#8b5cf6" : "#6366f1"}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function ParticleField() {
  const { viewport } = useThree();
  const particlesRef = useRef<Group>(null);

  // Deterministic positions — Math.random() in render causes remount jitter
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
        const seed = i * 1.618;
        return {
          key: i,
          position: [
            (Math.sin(seed) * 0.5) * viewport.width * 2,
            (Math.cos(seed * 1.3) * 0.5) * viewport.height * 2,
            Math.sin(seed * 0.7) * 5,
          ] as [number, number, number],
        };
      }),
    [viewport.width, viewport.height]
  );

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p) => (
        <mesh key={p.key} position={p.position}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
        </mesh>
      ))}
    </group>
  );
}

export function ThreeScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} angle={0.3} intensity={1} />

        <FloatingGeometry />
        <ParticleField />
      </Canvas>
    </div>
  );
}

/** Fixed orb layout — avoids SSR/client hydration mismatch from window/Math.random */
const FLOATING_ORBS = [
  { left: "12%", top: "18%", duration: 14, delay: 0 },
  { left: "78%", top: "22%", duration: 18, delay: 0.4 },
  { left: "24%", top: "68%", duration: 16, delay: 0.8 },
  { left: "64%", top: "72%", duration: 20, delay: 0.2 },
  { left: "48%", top: "12%", duration: 15, delay: 1.1 },
  { left: "88%", top: "48%", duration: 17, delay: 0.6 },
] as const;

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      {FLOATING_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute h-4 w-4 rounded-full bg-primary/30 blur-sm"
          style={{ left: orb.left, top: orb.top }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
