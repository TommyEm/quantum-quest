import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MotionPathControls, useMotion } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Player2 } from "./components/Player/Player2";
import { Motion } from "./components/Motion/Motion";

function Loop({ factor = 0.2 }) {
  const motion = useMotion();
  useFrame((state, delta) => {
    return (motion.current += Math.min(0.1, delta) * factor);
  });
}

export const Circle = ({ centerX = 0, centerY = 0, radius = 5 }) => {
  return [
    [
      new THREE.Vector3(centerX + radius, centerY, 0),
      new THREE.Vector3(centerX + radius, centerY, radius),
      new THREE.Vector3(centerX - radius, centerY, radius),
      new THREE.Vector3(centerX - radius, centerY, 0),
    ],
    [
      new THREE.Vector3(centerX - radius, centerY, 0),
      new THREE.Vector3(centerX - radius, centerY, -radius),
      new THREE.Vector3(centerX + radius, centerY, -radius),
      new THREE.Vector3(centerX + radius, centerY, 0),
    ],
  ].map(([v0, v1, v2, v3], index) => (
    <cubicBezierCurve3 key={index} v0={v0} v1={v1} v2={v2} v3={v3} />
  ));
};

export default function Experience() {
  const targetRef = useRef(null);
  const playerRef = useRef(null);
  const { debug, start } = useControls({
    debug: true,
    start: true,
  });

  const points = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 0, y: 2 },
  ];

  return (
    <>
      <Perf position="top-left" />

      <MotionPathControls
        offset={-1}
        object={playerRef}
        // focus={targetRef}
        damping={1}
        // focusDamping={0.15}
        loop
        debug
        duration={3}
        maxSpeed={30}
        autoStart={start}
      >
        <Circle />
        <Loop />
      </MotionPathControls>

      <mesh ref={playerRef}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <Player2 ref={targetRef} position={[0, 0.01, 0]} />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />
    </>
  );
}
