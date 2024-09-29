import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Leva } from "leva";
import Experience from "./Experience";
import { Globals } from "@react-spring/shared";

Globals.assign({
  frameLoop: "demand",
});

import "./style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
        frameloop="demand"
      >
        <Experience />
      </Canvas>
    </KeyboardControls>
  </StrictMode>
);
