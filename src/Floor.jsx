import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Spot } from "./components/Spot/Spot";

export const Floor = (props) => {
  const { nodes, materials } = useGLTF("/floor-1.glb");

  const handleSpotClick = () => {
    console.log("CLICK");
  };

  return (
    <group {...props} scale={0.35} dispose={null}>
      <Spot position={[7, 0.1, -4]} onClick={handleSpotClick} />

      <Spot position={[-2, 0.1, -6]} onClick={handleSpotClick} />

      <Spot position={[-5, 0.1, -1]} onClick={handleSpotClick} />

      <Spot position={[-1.5, 0.1, 0]} onClick={handleSpotClick} />

      <Spot position={[2.5, 0.1, 3.5]} onClick={handleSpotClick} />

      <Spot position={[-2, 0.1, 4]} onClick={handleSpotClick} />

      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[0.6, 0.313, -1]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[0.6, 0.3, -1]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[3.6, 0.3, 9.003]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[-3.4, 0.3, 8.003]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
          position={[-2.401, 0.7, -0.002]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          position={[1.989, 0.313, -1.01]}
          scale={0.224}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={nodes.Cylinder001.material}
          position={[2.989, 0.313, -1.01]}
          scale={0.224}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arch.geometry}
          material={nodes.Arch.material}
          position={[-0.7, 2.413, -5.91]}
          scale={[1.5, 0.675, 1.5]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={nodes.Cube005.material}
          position={[-7.4, 0.3, -2]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arc001.geometry}
          material={nodes.Arc001.material}
          position={[4.989, 1.063, -3.01]}
          scale={[3, 1.058, 3]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arc.geometry}
          material={nodes.Arc.material}
          position={[1.389, 1.063, 3.993]}
          scale={[3, 1.058, 3]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Jump_Gate.geometry}
          material={nodes.Jump_Gate.material}
          position={[-4.711, 1.513, 4.003]}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus.geometry}
          material={nodes.Torus.material}
          position={[1.489, -1.487, 6.993]}
          scale={2}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus001.geometry}
          material={nodes.Torus001.material}
          position={[-2.611, -3.487, -8.01]}
          scale={2}
        >
          <meshStandardMaterial flatShading color={"#3b5d61"} />
        </mesh>
      </RigidBody>
    </group>
  );
};

useGLTF.preload("/floor-1b.glb");
