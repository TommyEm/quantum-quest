import { useFrame } from "@react-three/fiber";
import { useMotion } from "@react-three/drei";

export const Motion = () => {
  const motion = useMotion();

  useFrame((_state, delta) => {
    motion.current += delta;
  });
};
