import { useFrame } from "@react-three/fiber";
import { useMotion } from "@react-three/drei";

export const Motion = () => {
  const motion = useMotion();
  //   console.log(motion);

  useFrame((_state, delta) => {
    // motion.current += delta;
    motion.current = 0.99;
  });
};
