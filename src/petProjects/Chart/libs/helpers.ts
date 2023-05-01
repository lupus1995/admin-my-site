// файл содержит в себе грязные функции

import { format } from "date-fns";

import { DPI_WIDTH, CIRCLE_RADIUS } from "./constants";
import { ProxyI, TooltipI } from "./interface";
import {
  getName,
  getColor,
  isTypeLine,
  calculateCoordsForOneChart,
  calculateGraph,
  isOver,
  circle,
  isTypeX,
} from "./utils";

// расчет и отрисовка графика
export const calculateCharts = ({
  columns,
  colors,
  types,
  yRatio,
  xRatio,
  ctx,
  proxy,
  hasCircle,
  dpiHeight,
  padding,
}: {
  columns: (string | number)[][];
  colors: {
    [color: string]: string;
  };
  types: { [type: string]: string };
  yRatio: number;
  xRatio: number;
  ctx: CanvasRenderingContext2D;
  proxy?: ProxyI;
  hasCircle: boolean;
  dpiHeight: number;
  padding: number;
}) => {
  columns.forEach((col) => {
    const name = getName({ column: col });
    const color = getColor({ colors, name });

    if (isTypeLine({ types, name })) {
      const coords: [number, number][] = calculateCoordsForOneChart({
        col,
        xRatio,
        yRatio,
        dpiHeight,
        padding,
      });

      calculateGraph({ ctx, coords, options: { color } });

      if (!hasCircle || !proxy) {
        return;
      }

      coords.forEach(([x, y]) => {
        if (
          isOver({
            mouse: proxy.mouse,
            x,
            length: coords.length,
            dpiWidth: DPI_WIDTH,
          })
        ) {
          circle({ ctx, coord: [x, y], color, circleRadius: CIRCLE_RADIUS });
        }
      });
    }
  });
};

// отрисовка тултипа на графике
export const calculateTooltip = ({
  columns,
  types,
  colors,
  tooltip,
  proxy,
  xRatio,
}: {
  colors: {
    [color: string]: string;
  };
  columns: (string | number)[][];
  types: { [type: string]: string };
  proxy: ProxyI;
  tooltip: {
    show: ({ left, top, dataTooltip }: TooltipI) => void;
    hide: () => void;
  };
  xRatio: number;
}) => {
  const xCoordinates = columns
    .find((col) => {
      const name = getName({ column: col });

      return isTypeX({ types, name });
    })
    .filter((coordinates) => typeof coordinates === "number");

  const yCoordinatesList = columns
    .filter((col) => {
      const name = getName({ column: col });

      return isTypeLine({ types, name });
    })
    .map((col) => {
      return col.filter((coordinates) => typeof coordinates === "number");
    });

  xCoordinates.forEach((item, index) => {
    if (
      proxy.mouse &&
      isOver({
        mouse: proxy.mouse,
        x: index * xRatio,
        length: xCoordinates.length,
        dpiWidth: DPI_WIDTH,
      })
    ) {
      const data = yCoordinatesList.map(
        (yCoordinatesItem, indexYCoordinates) => {
          const name = columns[indexYCoordinates + 1][0] as string;
          return {
            name,
            color: getColor({
              colors,
              name,
            }),
            value: yCoordinatesItem[index].toString(),
          };
        }
      );

      tooltip.show({
        left: proxy.mouse.tooltip.left,
        top: proxy.mouse.tooltip.top,
        dataTooltip: {
          title: format(new Date(xCoordinates[index]), "MMM d"),
          dates: data,
        },
      });
    }
  });
};
