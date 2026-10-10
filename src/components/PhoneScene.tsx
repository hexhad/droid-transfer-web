"use client";
/* eslint-disable react-hooks/immutability -- three.js objects (materials, refs) are
   mutated per frame in useFrame. That is how React Three Fiber keeps animation out
   of React renders, so these rules don't apply here. */

import { RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The phone Droid Transfer talks to, floating in 3D. Its screen is a real Android
 * home screen. It leans toward the pointer, glows while a file hovers over it, and
 * gives a small bump each time a file lands.
 */

const PHONE_W = 2.0;
const PHONE_H = 4.16;
const PHONE_D = 0.2;
const SCREEN_W = 1.86;
const SCREEN_H = 4.02;

export type PhoneSceneProps = {
  reducedMotion: boolean;
  /** Increments each time a file lands on the phone. */
  arrivals: number;
  /** True while a dragged file is over the phone. */
  targeted: boolean;
};

export default function PhoneScene(props: PhoneSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      resize={{ scroll: false, debounce: 0 }}
      camera={{ position: [0, 0, 9.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 5, 6]} intensity={1.6} />
      <directionalLight position={[4, -3, 3]} intensity={0.6} color="#a6f0c8" />
      <Suspense fallback={null}>
        <Phone {...props} />
      </Suspense>
    </Canvas>
  );
}

/** White rounded rect on black: used as the screen's alpha map so its corners follow the body. */
function useRoundedMask() {
  return useMemo(() => {
    const w = 372;
    const h = 804;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, 44);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);
}

/** Soft green halo behind the phone, faded in while a file is over it. */
function useGlow() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(92,204,143,0.9)");
    g.addColorStop(0.45, "rgba(92,204,143,0.35)");
    g.addColorStop(1, "rgba(92,204,143,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

function Phone({ reducedMotion, arrivals, targeted }: PhoneSceneProps) {
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const bump = useRef(0);
  const seen = useRef(arrivals);

  const screen = useTexture("/shots/phone-screen.png");
  screen.colorSpace = THREE.SRGBColorSpace;
  screen.anisotropy = 8;
  const mask = useRoundedMask();
  const halo = useGlow();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    if (arrivals !== seen.current) {
      seen.current = arrivals;
      bump.current = 1;
    }
    bump.current = Math.max(0, bump.current - dt * 2.4);

    // Lean toward the pointer, with damping so it feels weighted rather than glued to the mouse.
    const lean = reducedMotion ? 0 : 1;
    const targetY = -0.32 + state.pointer.x * 0.35 * lean;
    const targetX = 0.08 - state.pointer.y * 0.18 * lean;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3.5, dt);
    g.position.y = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    g.scale.setScalar(1 + Math.sin(bump.current * Math.PI) * 0.035 * lean);

    if (glow.current) {
      const target = targeted ? 0.75 : bump.current * 0.6;
      glow.current.opacity = THREE.MathUtils.damp(glow.current.opacity, target, 9, dt);
    }
  });

  const metal = (
    <meshPhysicalMaterial color="#1a1d1c" metalness={0.6} roughness={0.3} clearcoat={1} clearcoatRoughness={0.25} />
  );

  return (
    <group ref={group} rotation={[0.08, -0.32, 0]}>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[PHONE_W * 2.6, PHONE_H * 1.6]} />
        <meshBasicMaterial ref={glow} map={halo} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>

      <RoundedBox args={[PHONE_W, PHONE_H, PHONE_D]} radius={0.24} smoothness={8}>
        {metal}
      </RoundedBox>

      <mesh position={[0, 0, PHONE_D / 2 + 0.002]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={screen} alphaMap={mask} transparent toneMapped={false} />
      </mesh>

      {/* Punch-hole camera */}
      <mesh position={[0, SCREEN_H / 2 - 0.12, PHONE_D / 2 + 0.004]}>
        <circleGeometry args={[0.045, 32]} />
        <meshBasicMaterial color="#030303" />
      </mesh>

      {/* Power and volume keys */}
      <mesh position={[PHONE_W / 2 + 0.012, 0.95, 0]}>
        <boxGeometry args={[0.03, 0.34, 0.07]} />
        {metal}
      </mesh>
      <mesh position={[PHONE_W / 2 + 0.012, 0.3, 0]}>
        <boxGeometry args={[0.03, 0.62, 0.07]} />
        {metal}
      </mesh>
    </group>
  );
}
