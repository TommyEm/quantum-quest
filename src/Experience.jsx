import { PresentationControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Floor } from "./Floor";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

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

        <Physics debug>
          <RigidBody colliders="ball">
            <mesh position={[1.75, 1.5, -2.5]} scale={0.15}>
              <sphereGeometry />
              <meshStandardMaterial />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed">
            <Floor />
          </RigidBody>
        </Physics>
      </PresentationControls>
    </>
  );
}
