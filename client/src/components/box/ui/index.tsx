import { FC, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSelector } from "src/services/store";
import { getTheme } from "src/services/slices/global";

interface BoxProps {
  vertices: number[][];
}

export const Box: FC<BoxProps> = ({ vertices }) => {
  const theme = useSelector(getTheme);
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // Преобразуем плоский массив вершин для BufferGeometry
    const flatVertices = vertices.flat();

    // Создаем BufferGeometry вручную
    const geometry = new THREE.BufferGeometry();
    const verticesArray = new Float32Array(flatVertices);

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(verticesArray, 3)
    );

    geometry.computeVertexNormals();
    setGeometry(geometry);
  }, [vertices]);

  return (
    geometry && (
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={theme === "light" ? "#ffa954" : "white"}
          roughness={0.7}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  );
};
