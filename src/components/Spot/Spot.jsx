import { forwardRef } from "react";

export const Spot = forwardRef((props, ref) => {
  return (
    <mesh
      ref={ref}
      rotation-x={-(Math.PI / 2)}
      scale={0.3}
      {...props}
      receiveShadow
    >
      <circleGeometry />
      <meshStandardMaterial color="white" />
    </mesh>
  );
});
