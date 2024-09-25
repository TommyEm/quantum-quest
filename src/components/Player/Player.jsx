import { forwardRef, Fragment, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier";

export const Player = forwardRef((props, ref) => {
  const playerRef = useRef(null);
  const { rapier, world } = useRapier();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const jump = () => {
    // Get the origin of the ball
    const origin = playerRef?.current?.translation();
    // Move origin from center to slightly below the surface of the ball
    origin.y -= 0.1;

    // Create a raycaster
    const rayDirection = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, rayDirection);
    // Detect collision between the ray and the floor
    const hit = world.castRay(
      ray,
      10,
      true // Consider mesh as solid for better collision detection, otherwise it will only detect collision with upper and lower mesh faces
    );
    console.log(hit);

    // If close enough to the floor, jump
    if (hit.timeOfImpact < 3.15) {
      playerRef?.current?.applyImpulse({ x: 0, y: 0.05, z: 0 });
    }
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    return () => unsubscribeJump(); // Cleanup, otherwise subscriptions will be multiplied on hot-reload
  }, [jump]);

  useFrame((_state, delta) => {
    const { forward, backward, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.05 * delta; // delta is used to get the same speed whatever the computer
    const torqueStrength = 0.002 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    playerRef.current?.applyImpulse(impulse);
    playerRef.current?.applyTorqueImpulse(torque);
  });

  return (
    <Fragment>
      <RigidBody
        ref={playerRef}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh ref={ref} position={[1.75, 1.5, -2.5]} scale={0.15}>
          <sphereGeometry />
          {/* <icosahedronGeometry /> */}
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </Fragment>
  );
});
