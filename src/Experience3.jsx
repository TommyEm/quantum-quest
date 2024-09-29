import { useRef, useState } from "react";
import * as THREE from "three";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
} from "@react-spring/three";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Player2 } from "./components/Player/Player2";

const points = [
  new THREE.Vector3(5, 1.5, -7),
  new THREE.Vector3(5, 1.5, -5.5),
  new THREE.Vector3(5, 0.5, -4),
  new THREE.Vector3(7, 0.5, -4), // First spot
  new THREE.Vector3(7, 0.5, -2),
  new THREE.Vector3(1, 0.5, -2),
  new THREE.Vector3(1, 0.5, -6),
  new THREE.Vector3(-2, 0.5, -6), // 2nd spot
];

export default function Experience() {
  const targetRef = useRef(null);
  const playerRef = useRef(null);
  const { debug, start } = useControls({
    debug: true,
    start: true,
  });
  const [springs, api] = useSpring(
    () => ({
      from: {
        position: [0, 0, 0],
      },
    }),
    []
  );

  const handleClick = async (e) => {
    if (playerRef.current) {
      api.start({
        from: {
          position: [0, 0, 0],
        },
        to: async (next, cancel) => {
          for (const point of points) {
            await next({ position: [point.x, point.y, point.z] });
          }
        },
      });
    }
  };

  return (
    <>
      <Perf position="top-left" />

      <animated.mesh
        ref={playerRef}
        scale={springs.scale}
        {...springs}
        onClick={handleClick}
      >
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </animated.mesh>

      {/* <Player2 ref={targetRef} position={[0, 0.01, 0]} /> */}

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
