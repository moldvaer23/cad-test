import { FC } from "react";
import { getVertices } from "src/services/slices/global";
import { useSelector } from "src/services/store";

export const Scene: FC = () => {
  const vertices = useSelector(getVertices);

  console.log(vertices);

  return <div>Сцена</div>;
};
