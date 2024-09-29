import { useRef, useState } from "react";
import { isEqual } from "lodash";
import * as THREE from "three";
import {
  MotionPathControls,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Floor } from "./Floor";
import { Player } from "./components/Player/Player";
import { Player2 } from "./components/Player/Player2";
import { Motion } from "./components/Motion/Motion";

const points = [
  new THREE.Vector3(5, 1.5, -7), // Spot 0
  new THREE.Vector3(5, 1.5, -5.5),
  new THREE.Vector3(5, 0.5, -4),
  new THREE.Vector3(7, 0.5, -4), // Spot 1
  new THREE.Vector3(7, 0.5, -2),
  new THREE.Vector3(1, 0.5, -2),
  new THREE.Vector3(1, 0.5, -6),
  new THREE.Vector3(-2, 0.5, -6), // Spot 2
  new THREE.Vector3(-2, 0.5, -3),
  new THREE.Vector3(-5, 0.5, -3),
  new THREE.Vector3(-5, 0.5, -1), // Spot 3
  new THREE.Vector3(-1.5, 0.5, -1),
  new THREE.Vector3(-1.5, 0.5, 0), // Spot 4
  new THREE.Vector3(0, 0.5, 0),
  new THREE.Vector3(0, 0.5, 1),
  new THREE.Vector3(2.5, 0.5, 1),
  new THREE.Vector3(2.5, 0.5, 3.5), // Spot 5
  new THREE.Vector3(2.5, 0.5, 5),
  new THREE.Vector3(-0.5, 0.5, 5),
  new THREE.Vector3(-0.5, 0.5, 2.5),
  new THREE.Vector3(-2, 0.5, 2.5),
  new THREE.Vector3(-2, 0.5, 4), // Spot 6
  new THREE.Vector3(-5.5, 0.5, 4),
  new THREE.Vector3(-6.5, 1.5, 4),
  new THREE.Vector3(-7.5, 0.5, 4),
  new THREE.Vector3(-7.5, 0.5, 2),
  new THREE.Vector3(-7.5, -4, -9), // Exit
];

const getPointIndex = (points, pointPosition) => {
  return points
    .map((point, i) =>
      point.x === pointPosition.x && point.z === pointPosition.z ? i : -1
    )
    .find((i) => i >= 0 || 0);
};

export default function Experience() {
  const playerRef = useRef(null);
  const [path, setPath] = useState([points[0]]);
  const { keyboardControl, cameraFullControl, debug, start } = useControls({
    cameraFullControl: true,
    debug: false,
    keyboardControl: false,
    start: false,
  });

  const [springs, api] = useSpring(
    () => ({
      from: {
        position: [2.5, 0.5, 3.5],
      },
    }),
    []
  );

  const handleClick = (e) => {
    e.stopPropagation();

    const playerPosition = playerRef.current?.position;
    const spotPosition = e.object.position;
    const startPointIndex = getPointIndex(points, playerPosition);
    const endPointIndex = getPointIndex(points, spotPosition);

    const isGoingForward = startPointIndex < endPointIndex;
    const orderedPoints = isGoingForward ? points : points.reverse();

    const startOrderedPointIndex = getPointIndex(orderedPoints, playerPosition);
    const endOrderedPointIndex = getPointIndex(orderedPoints, spotPosition);

    const pointsToMove = orderedPoints.slice(
      startOrderedPointIndex,
      endOrderedPointIndex + 1
    );

    api.start({
      from: {
        position: [playerPosition.x, playerPosition.y, playerPosition.z],
      },
      to: async (next, cancel) => {
        for (const point of pointsToMove) {
          await next({ position: [point.x, point.y, point.z] });
        }
      },
    });
  };

  return (
    <>
      <Perf position="top-left" />

      {cameraFullControl && <OrbitControls />}

      <PresentationControls
        global
        // rotation={[0.13, 0.1, 0]}
        polar={[-0.2, 1]}
        // azimuth={[-1, 0.75]}
        // config={{ mass: 2, tension: 400 }}
        // snap={{ mass: 4, tension: 400 }}
      >
        <directionalLight
          castShadow
          position={[1, 2, 3]}
          intensity={4.5}
          shadow-normalBias={0.04}
        />
        <ambientLight intensity={1.5} />

        <Physics debug={debug}>
          {keyboardControl ? (
            <Player ref={playerRef} />
          ) : (
            <animated.mesh
              ref={playerRef}
              scale={0.15}
              {...springs}
              onClick={handleClick}
            >
              <sphereGeometry />
              <meshStandardMaterial color="purple" />
            </animated.mesh>
          )}

          <Floor onClick={handleClick} />
        </Physics>
      </PresentationControls>
    </>
  );
}
