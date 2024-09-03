import { FC, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { DEFAULT_PARAMETERS_FIGURE } from "src/config";
import { useDispatch, useSelector } from "src/services/store";
import {
  getVertices,
  getVerticesReq,
  getVerticesReqError,
  postTriangulateThunk,
} from "src/services/slices/global";

import { SceneUI } from "../ui";

export const Scene: FC = () => {
  const vertices = useSelector(getVertices);
  const verticesReq = useSelector(getVerticesReq);
  const verticesReqError = useSelector(getVerticesReqError);

  const dispatch = useDispatch();

  /* При первом открытии страницы делаем запрос на получение вершин */
  useEffect(() => {
    if (!vertices) {
      dispatch(postTriangulateThunk(DEFAULT_PARAMETERS_FIGURE));
    }
  }, []);

  /* Если делается запрос на получение вершин показываем прелоадер */
  if (verticesReq) return <CircularProgress size={100} />;

  /* Если данных о вершинах нету и получена ошибка выводим сообщение*/
  if (!vertices || verticesReqError)
    return <>Данных о вершинах коробки нету :(</>;

  return <SceneUI vertices={vertices} />;
};
