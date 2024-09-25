export const Spot = (props) => {
  return (
    <mesh {...props} rotation-x={-(Math.PI / 2)} scale={0.3} receiveShadow>
      <circleGeometry />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};
