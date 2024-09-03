import { FC } from "react";
import { TVertices } from "src/types";
import { Box } from "src/components/box";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type TProps = {
  vertices: TVertices;
};

export const SceneUI: FC<TProps> = ({ vertices }) => (
  <Canvas shadows camera={{ position: [50, 50, 50], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <hemisphereLight groundColor={0x444444} intensity={0.6} />
    <Box vertices={vertices} />
    <axesHelper args={[30]} />
    <OrbitControls />
  </Canvas>
);
