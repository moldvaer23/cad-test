import axiosInstance from "src/services/axios";
import { TParametersFigure } from "src/types";

export const apiPostTriangulate = async (parameters: TParametersFigure) => {
  try {
    const response = await axiosInstance.post("/triangulate", parameters);

    return response.data; // Возвращаем данные из запроса
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error; // Пробрасываем ошибку, чтобы обработать её дальше
  }
};
