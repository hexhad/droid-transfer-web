"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The phone Droid Transfer talks to, floating in 3D. Its screen is an illustrated
 * home screen drawn on a canvas. It leans toward the pointer, glows while a file
 * hovers over it, and gives a small bump each time a file lands.
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

/** An illustrated Android home screen: wallpaper, clock, a grid of app tiles and a search bar. */
function useHomeScreen() {
  return useMemo(() => {
    const w = 744;
    const h = 1608;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    // Wallpaper: deep green with two soft light pools.
    ctx.fillStyle = "#0d1a14";
    ctx.fillRect(0, 0, w, h);
    const pool = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(13,26,20,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };
    pool(w * 0.15, h * 0.18, w * 0.95, "rgba(92,204,143,0.55)");
    pool(w * 0.95, h * 0.62, w * 0.8, "rgba(47,120,165,0.45)");
    pool(w * 0.4, h * 1.0, w * 0.7, "rgba(92,204,143,0.25)");

    const font = (size: number, weight = 500) => `${weight} ${size}px -apple-system, "SF Pro Text", "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.92)";

    // Status bar
    ctx.font = font(26, 600);
    ctx.fillText("12:30", 44, 62);
    ctx.fillRect(w - 92, 42, 40, 22);
    ctx.fillRect(w - 50, 48, 5, 10);

    // Clock and date
    ctx.font = font(150, 300);
    ctx.fillText("12:30", 52, 330);
    ctx.font = font(32, 500);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("Saturday, 10 October", 58, 390);

    // App tiles: two rows of four, then the dock.
    const colors = ["#5ccc8f", "#f2b84b", "#5aa9f0", "#ef6f6c", "#a78bfa", "#2fa56b", "#f08f5a", "#62c6d6"];
    const tile = 120;
    const gap = (w - 4 * tile) / 5;
    const drawTile = (col: number, y: number, color: string) => {
      const x = gap + col * (tile + gap);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, tile, tile, 34);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.roundRect(x + 38, y + 38, tile - 76, tile - 76, 10);
      ctx.fill();
    };
    for (let i = 0; i < 8; i++) drawTile(i % 4, 860 + Math.floor(i / 4) * 190, colors[i]);
    for (let i = 0; i < 4; i++) drawTile(i, 1250, ["#eef2ef", "#5aa9f0", "#5ccc8f", "#f2b84b"][i]);

    // Search bar and gesture handle
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.roundRect(44, 1440, w - 88, 92, 46);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 90, h - 26, 180, 8, 4);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
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

  const screen = useHomeScreen();
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
