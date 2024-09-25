import { useRef } from "react";
import {
  MotionPathControls,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { bezier } from "@leva-ui/plugin-bezier";
import { Perf } from "r3f-perf";
import { Floor } from "./Floor";
import { Player } from "./components/Player/Player";
import { Player2 } from "./components/Player/Player2";
import { Motion } from "./components/Motion/Motion";

export default function Experience() {
  const playerRef = useRef(null);
  const { autoPlay, cameraFullControl, debug, start } = useControls({
    autoPlay: false,
    cameraFullControl: false,
    debug: true,
    start: true,
  });

  const points = [
    { x: 5, y: -7, z: 1.5 },
    { x: 5, y: -5.5, z: 1.5 },
    { x: 5, y: -4, z: 0.5 },
    { x: 7, y: -4, z: 0.5 },
  ];

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
          {autoPlay ? (
            <Player ref={playerRef} />
          ) : (
            <>
              <MotionPathControls
                offset={1}
                object={playerRef}
                damping={0}
                debug
                duration={0.5}
                maxSpeed={100}
                autoStart={start}
              >
                {points.reduce((acc, { x, y, z }, i) => {
                  const endPoint = points[i + 1];
                  if (endPoint) {
                    return [
                      ...acc,
                      <cubicBezierCurve3
                        key={`point-${i}`}
                        v0={[x, z, y]}
                        v1={[x, z, y]}
                        v2={[endPoint.x, endPoint.z, endPoint.y]}
                        v3={[endPoint.x, endPoint.z, endPoint.y]}
                      />,
                    ];
                  }
                  return acc;
                }, [])}

                <Motion />
              </MotionPathControls>

              <Player2 ref={playerRef} />
            </>
          )}

          <Floor />
        </Physics>
      </PresentationControls>
    </>
  );
}
