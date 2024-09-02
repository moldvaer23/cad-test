import { FC } from "react";
import { getVertices, getVerticesReq } from "src/services/slices/global";
import { useSelector } from "src/services/store";
import { SceneUI } from "../ui";
import { CircularProgress } from "@mui/material";

export const Scene: FC = () => {
  const vertices = useSelector(getVertices);
  const verticesReq = useSelector(getVerticesReq);

  console.log(vertices);

  if (verticesReq) return <CircularProgress size={100} />;

  return <SceneUI />;
};
