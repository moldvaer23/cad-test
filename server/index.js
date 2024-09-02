const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

/* Middleware для парсинга JSON-запросов */
app.use(bodyParser.json());

/* Middleware для разрешения CORS */
app.use(cors());

/* Эндпоинт для обработки триангуляции коробки */
app.post("/triangulate", (req, res) => {
  const { length, width, height } = req.body;

  if (!length || !width || !height) {
    return res.status(400).json({ error: "Missing dimensions" });
  }

  /* Вершины параллелепипеда */
  const vertices = [
    /* Нижняя грань */
    { x: 0, y: 0, z: 0 },
    { x: length, y: 0, z: 0 },
    { x: length, y: width, z: 0 },
    { x: 0, y: width, z: 0 },

    /* Верхняя грань */
    { x: 0, y: 0, z: height },
    { x: length, y: 0, z: height },
    { x: length, y: width, z: height },
    { x: 0, y: width, z: height },
  ];

  /* Треугольники, представляющие каждую грань параллелепипеда */
  const triangles = [
    /* Нижняя грань */
    [vertices[0], vertices[1], vertices[2]],
    [vertices[0], vertices[2], vertices[3]],

    /* Верхняя грань */
    [vertices[4], vertices[5], vertices[6]],
    [vertices[4], vertices[6], vertices[7]],

    /* Передняя грань */
    [vertices[0], vertices[1], vertices[5]],
    [vertices[0], vertices[5], vertices[4]],

    /* Задняя грань */
    [vertices[3], vertices[2], vertices[6]],
    [vertices[3], vertices[6], vertices[7]],

    /* Левая грань */
    [vertices[0], vertices[3], vertices[7]],
    [vertices[0], vertices[7], vertices[4]],

    /* Правая грань */
    [vertices[1], vertices[2], vertices[6]],
    [vertices[1], vertices[6], vertices[5]],
  ];

  /* Преобразование треугольников в плоский массив вершин */
  const flattenedVertices = triangles.flatMap((triangle) =>
    triangle.map((vertex) => [vertex.x, vertex.y, vertex.z])
  );

  /* Возвращаем координаты треугольников */
  res.json({ vertices: flattenedVertices });
});

/* Запуск сервера */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
