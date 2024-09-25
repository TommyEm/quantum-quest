import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience.jsx";

import "./style.css";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Leva />
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        className="r3f"
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-10, 10, 14],
        }}
      >
        <Experience />
      </Canvas>
    </KeyboardControls>
  </>
);
