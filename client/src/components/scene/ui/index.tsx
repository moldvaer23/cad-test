import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { Box } from "src/components/box";
import { OrbitControls } from "@react-three/drei";
import { TVertices } from "src/types";

type TProps = {
  vertices: TVertices;
};

export const SceneUI: FC<TProps> = ({ vertices }) => (
  <Canvas shadows camera={{ position: [50, 50, 50], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <hemisphereLight
      groundColor={0x444444} // Цвет света снизу
      intensity={0.6}
    />
    <Box vertices={vertices} />
    <axesHelper args={[30]} />
    <OrbitControls />
  </Canvas>
);
