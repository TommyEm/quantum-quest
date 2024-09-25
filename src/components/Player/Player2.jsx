import { forwardRef } from "react";

export const Player2 = forwardRef(({ position = [1.75, 1.5, -2.5] }, ref) => {
  return (
    <mesh ref={ref} position={position} scale={0.15}>
      <sphereGeometry />
      <meshStandardMaterial />
    </mesh>
  );
});
