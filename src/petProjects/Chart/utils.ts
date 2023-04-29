// файл содержит в себе чистые функции, которые ни от чего не зависят

import { format } from "date-fns";

import { TYPE_LINE } from "./constants";
import { AxisXI, ProxyI, TooltipI } from "./interface";

// название оси ординат или абсцисс
// координаты представлены собой массив
// в массиве первым объектом является название координат, остальные значения - это координаты графика
// по названию координат можно определить их цвет на графике
export const getName = ({ column }: { column: Array<string | number> }) =>
  column[0].toString();

// получение определенного цвета в объекта
// ключами в объекте служат названия оси ординат (ось у)
export const getColor = ({
  colors,
  name,
}: {
  name: string;
  colors: { [name: string]: string };
}) => colors[name];

// определяем является график осью ординат
export const isTypeLine = ({
  types,
  name,
}: {
  types: { [type: string]: string };
  name: string;
}) => types[name] === TYPE_LINE;

// расчет дельты для масштабирования графика по оси y
export const calculateYRatio = ({
  minY,
  maxY,
  viewHeight,
}: {
  maxY: number;
  minY: number;
  viewHeight: number;
}) => {
  return viewHeight / (maxY - minY);
};

// расчет дельты для масштабирования графика по оси x
export const calculateXRatio = ({
  countXCoords,
  viewWidth,
}: {
  countXCoords: number;
  viewWidth: number;
}) => {
  return viewWidth / (countXCoords - 2);
};

// очистка отрисованной области
export const clear = ({
  ctx,
  dpiWidth,
  dpiHeight,
}: {
  ctx: CanvasRenderingContext2D;
  dpiWidth: number;
  dpiHeight: number;
}) => {
  ctx.clearRect(0, 0, dpiWidth, dpiHeight);
};

// расчет координат для одного графика
export const calculateCoordsForOneChart = ({
  col,
  xRatio,
  yRatio,
  dpiHeight,
  padding,
}: {
  col: (string | number)[];
  xRatio: number;
  yRatio: number;
  dpiHeight: number;
  padding: number;
}): [number, number][] => {
  return col
    .filter((y) => typeof y === "number")
    .map((y: number, index) => {
      return [
        Math.floor(index * xRatio),
        Math.floor(dpiHeight - padding - y * yRatio),
      ];
    });
};

// расчет графика и его отрисовка для канваса
export const calculateGraph = ({
  ctx,
  coords,
  options: { color },
}: {
  ctx: CanvasRenderingContext2D;
  coords: [number, number][];
  options: {
    color: string;
  };
}) => {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;
  for (const [x, y] of coords) {
    ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.closePath();
};

// расчет пограничного значения по оси x
export const isOver = ({
  mouse,
  x,
  length,
  dpiWidth,
}: {
  mouse: AxisXI;
  x: number;
  length: number;
  dpiWidth: number;
}) => {
  if (!mouse) {
    return false;
  }

  const width = dpiWidth / length;
  return Math.abs(x - mouse.x) < width / 2;
};

// расчет максимальной и минимальной точки по абсцисе y
export const computeBoundariesByYAxios = ({
  columns,
  types,
}: {
  columns: [Array<string | number>];
  types: { [type: string]: string };
}): { minY: number; maxY: number } => {
  let minY: number, maxY: number;

  columns.forEach((col) => {
    if (types[col[0]] !== "line") {
      return;
    }

    if (typeof minY !== "number") minY = Number(col[1]);
    if (typeof maxY !== "number") maxY = Number(col[1]);

    if (minY > Number(col[1])) {
      minY = Number(col[1]);
    }

    if (maxY < Number(col[1])) {
      maxY = Number(col[1]);
    }

    for (let i = 2; i < col.length; i++) {
      if (minY > Number(col[i])) {
        minY = Number(col[i]);
      }

      if (maxY < Number(col[i])) {
        maxY = Number(col[i]);
      }
    }
  });

  return { minY, maxY };
};

// отрисовка кружочка для координат
export const circle = ({
  ctx,
  coord: [x, y],
  color,
  circleRadius,
}: {
  ctx: CanvasRenderingContext2D;
  color: string;
  coord: [x: number, y: number];
  circleRadius: number;
}) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = "#fff";
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

// создание y абсцисы
export const createYAxis = ({
  ctx,
  maxY,
  minY,
  viewHeight,
  rowsCount,
  padding,
  dpiWidth,
}: {
  ctx: CanvasRenderingContext2D;
  maxY: number;
  minY: number;
  viewHeight: number;
  rowsCount: number;
  padding: number;
  dpiWidth: number;
}) => {
  const step = viewHeight / rowsCount;
  const textStep = (maxY - minY) / rowsCount;

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#bbb";
  ctx.font = "normal 20px Roboto";
  ctx.fillStyle = "#96a2aa";
  for (let i = 1; i <= rowsCount; i++) {
    const y = step * i;
    const text = Math.round(maxY - textStep * i);
    ctx.fillText(text.toString(), 0, y + padding - 10);
    ctx.moveTo(0, y + padding);
    ctx.lineTo(dpiWidth, y + padding);
  }
  ctx.stroke();
  ctx.closePath();
};

// создание x ординат
export const createXAxis = ({
  ctx,
  data,
  xRatio,
  proxy,
  dpiHeight,
  dpiWidth,
  padding,
}: {
  ctx: CanvasRenderingContext2D;
  data: (number | string)[];
  xRatio: number;
  proxy: ProxyI;
  dpiHeight: number;
  dpiWidth: number;
  padding: number;
}) => {
  const colsCount = 6;
  const step = Math.round(data.length / colsCount);
  ctx.beginPath();
  for (let i = 1; i < data.length; i++) {
    const x = i * xRatio;
    if ((i - 1) % step === 0) {
      const text = format(new Date(data[i]), "MMM d");
      ctx.fillText(text.toString(), x, dpiHeight - 10);
    }

    if (
      isOver({
        mouse: proxy.mouse,
        x,
        length: data.length,
        dpiWidth,
      })
    ) {
      ctx.save();
      ctx.moveTo(x, padding / 2);
      ctx.lineTo(x, dpiHeight - padding);
      ctx.restore();

      // tooltip.show({
      //   left: proxy.mouse.tooltip.left,
      //   top: proxy.mouse.tooltip.top,
      //   dataTooltip: { title: format(new Date(data[i]), "MMM d") },
      // });
    }
  }
  ctx.stroke();
  ctx.closePath();
};

export const css = ({
  element,
  // @ts-ignore
  styles = {},
}: {
  element: HTMLElement;
  styles?: object;
}) => {
  Object.assign(element.style, styles);
};
