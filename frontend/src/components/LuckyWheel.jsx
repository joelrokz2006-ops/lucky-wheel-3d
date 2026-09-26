import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../utils/soundEffects';
import '../styles/LuckyWheel.css';

// Sectors definition matching backend
const SECTORS = [
  { index: 0, label: '0x', multiplier: 0, color: '#dc2626', textColor: '#ffffff' },
  { index: 1, label: '1x', multiplier: 1, color: '#0284c7', textColor: '#ffffff' },
  { index: 2, label: '0x', multiplier: 0, color: '#475569', textColor: '#ffffff' },
  { index: 3, label: '2x', multiplier: 2, color: '#059669', textColor: '#ffffff' },
  { index: 4, label: '0x', multiplier: 0, color: '#475569', textColor: '#ffffff' },
  { index: 5, label: '3x', multiplier: 3, color: '#7c3aed', textColor: '#ffffff' },
  { index: 6, label: '0x', multiplier: 0, color: '#475569', textColor: '#ffffff' },
  { index: 7, label: '10x', multiplier: 10, color: '#d97706', textColor: '#ffffff' } // JACKPOT
];

const SECTOR_ANGLE = (2 * Math.PI) / 8; // PI / 4 = 45 deg

// 3D Wheel Sector Slice
const WheelSlice = ({ sector, index }) => {
  const startAngle = index * SECTOR_ANGLE - SECTOR_ANGLE / 2;
  const midAngle = index * SECTOR_ANGLE;

  // Position for multiplier text
  const textRadius = 1.6;
  const textX = Math.cos(midAngle) * textRadius;
  const textY = Math.sin(midAngle) * textRadius;
  const textRotation = midAngle - Math.PI / 2;

  return (
    <group>
      {/* Sector Pie Geometry */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[
            2.5, // top radius
            2.5, // bottom radius
            0.3, // height / depth
            32,  // radial segments
            1,   // height segments
            false,
            startAngle,
            SECTOR_ANGLE
          ]}
        />
        <meshStandardMaterial
          color={sector.color}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>

      {/* Sector Multiplier Text */}
      <group position={[textX, textY, 0.18]} rotation={[0, 0, textRotation]}>
        <Text
          fontSize={0.36}
          fontWeight={900}
          color={sector.textColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#0f172a"
        >
          {sector.label}
        </Text>
      </group>
    </group>
  );
};

// 3D Rim Studs (Golden Pegs)
const RimPegs = () => {
  const pegs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      const angle = i * SECTOR_ANGLE + SECTOR_ANGLE / 2;
      const x = Math.cos(angle) * 2.45;
      const y = Math.sin(angle) * 2.45;
      items.push({ x, y, id: i });
    }
    return items;
  }, []);

  return (
    <group>
      {pegs.map((peg) => (
        <mesh key={peg.id} position={[peg.x, peg.y, 0.15]}>
          <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

// 3D Wheel Assembly
const Wheel = ({ targetSector, isSpinning, onSpinEnd, pointerRef }) => {
  const wheelGroupRef = useRef();
  const rotationRef = useRef(0);
  const spinStartTime = useRef(0);
  const startRotation = useRef(0);
  const targetRotation = useRef(0);
  const animating = useRef(false);
  const lastPegIndex = useRef(-1);

  // Trigger spin when isSpinning becomes true and targetSector is defined
  useEffect(() => {
    if (isSpinning && targetSector !== null && !animating.current) {
      animating.current = true;
      spinStartTime.current = performance.now();
      startRotation.current = rotationRef.current;

      // Calculate authoritative target angle
      // Top is at angle PI / 2.
      // Rotating clockwise means rotation decreases (negative direction).
      const baseTarget = Math.PI / 2 - targetSector * SECTOR_ANGLE;
      
      // Calculate how many full extra spins (e.g. 6 to 8 full loops)
      const fullSpins = 7 * (2 * Math.PI);
      
      // Compute delta to align exactly with baseTarget modulo 2*PI
      const currentNormalized = startRotation.current % (2 * Math.PI);
      let diff = baseTarget - currentNormalized;
      while (diff > 0) diff -= 2 * Math.PI; // Ensure clockwise spin

      targetRotation.current = startRotation.current - fullSpins + diff;
      soundManager.playSpinStart();
    }
  }, [isSpinning, targetSector]);

  useFrame((state, delta) => {
    if (animating.current) {
      const elapsed = (performance.now() - spinStartTime.current) / 1000;
      const duration = 4.8; // 4.8 seconds spin duration

      if (elapsed < duration) {
        // Quintic / Quartic ease-out curve for dramatic casino deceleration
        const t = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - t, 4.5);
        const currentRot = startRotation.current + (targetRotation.current - startRotation.current) * easeOut;
        rotationRef.current = currentRot;

        // Ticker sound calculation
        const pegPosition = Math.floor((-currentRot / SECTOR_ANGLE) + 0.5);
        if (pegPosition !== lastPegIndex.current) {
          lastPegIndex.current = pegPosition;
          soundManager.playTick();
          if (pointerRef.current) {
            pointerRef.current.rotation.z = 0.25; // Pointer kick/bounce
          }
        }
      } else {
        // Animation finished
        rotationRef.current = targetRotation.current;
        animating.current = false;
        if (onSpinEnd) {
          onSpinEnd();
        }
      }
    } else if (!isSpinning) {
      // Subtle idle breathing motion
      rotationRef.current += delta * 0.08;
    }

    if (wheelGroupRef.current) {
      wheelGroupRef.current.rotation.z = rotationRef.current;
    }

    // Pointer spring recovery
    if (pointerRef.current && pointerRef.current.rotation.z > 0) {
      pointerRef.current.rotation.z = THREE.MathUtils.lerp(pointerRef.current.rotation.z, 0, delta * 15);
    }
  });

  return (
    <group ref={wheelGroupRef}>
      {/* Outer Golden Border */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.55, 0.18, 24, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Inner Rim Groove */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[2.42, 2.52, 64]} />
        <meshStandardMaterial
          color="#1e1b4b"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Wheel Slices */}
      {SECTORS.map((sec, idx) => (
        <WheelSlice key={sec.index} sector={sec} index={idx} />
      ))}

      {/* Rim Pegs */}
      <RimPegs />

      {/* Center Golden Medallion */}
      <mesh position={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.65, 0.65, 0.22, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Center Gem Badge */}
      <mesh position={[0, 0, 0.32]}>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <group position={[0, 0, 0.38]}>
        <Text
          fontSize={0.28}
          fontWeight={900}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
        >
          ★
        </Text>
      </group>
    </group>
  );
};

// 3D Top Pointer with Neon/Metallic Shader
const Pointer = ({ pointerRef }) => {
  return (
    <group position={[0, 2.7, 0.35]}>
      {/* Pointer Pin Pivot */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Ticker Arrow */}
      <group ref={pointerRef}>
        <mesh position={[0, -0.22, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.22, 0.55, 32]} />
          <meshStandardMaterial
            color="#ef4444"
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
        <mesh position={[0, -0.1, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

// Main LuckyWheel Component
const LuckyWheel = ({ targetSector, isSpinning, onSpinEnd }) => {
  const pointerRef = useRef();

  return (
    <div className="wheel-canvas-wrapper">
      <div className="wheel-glow-backdrop"></div>
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 46 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lights Setup */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 8]} intensity={1.8} />
        <directionalLight position={[-5, -4, 4]} intensity={0.6} color="#818cf8" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#fef08a" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.5}
          penumbra={0.7}
          intensity={2}
          color="#ffffff"
        />

        {/* Ambient Sparkles */}
        <Sparkles
          count={40}
          scale={7}
          size={2.5}
          speed={0.4}
          opacity={0.6}
          color="#f59e0b"
        />

        <Float
          speed={1.5}
          rotationIntensity={0.08}
          floatIntensity={0.15}
          floatingRange={[-0.05, 0.05]}
        >
          <Wheel
            targetSector={targetSector}
            isSpinning={isSpinning}
            onSpinEnd={onSpinEnd}
            pointerRef={pointerRef}
          />
          <Pointer pointerRef={pointerRef} />
        </Float>
      </Canvas>
    </div>
  );
};

export default LuckyWheel;
