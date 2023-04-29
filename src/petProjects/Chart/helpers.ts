import {
  CIRCLE_RADIUS,
  DPI_HEIGHT,
  DPI_WIDTH,
  HEIGHT,
  PADDING,
  ROWS_COUNT,
  VIEW_HEIGHT,
  VIEW_WIDTH,
  WIDTH,
} from "./constants";
import { DATA_CANVASI, ProxyI } from "./interface";
import { tooltipSettings } from "./tooltip";
import {
  calculateCoordsForOneChart,
  calculateGraph,
  calculateXRatio,
  calculateYRatio,
  circle,
  clear,
  computeBoundariesByYAxios,
  createXAxis,
  createYAxis,
  getColor,
  getName,
  isOver,
  isTypeLine,
} from "./utils";

// расчет и отрисовка графика
const calculateCharts = ({
  columns,
  colors,
  types,
  yRatio,
  xRatio,
  ctx,
  proxy,
}: {
  columns: [Array<string | number>];
  colors: {
    [color: string]: string;
  };
  types: { [type: string]: string };
  yRatio: number;
  xRatio: number;
  ctx: CanvasRenderingContext2D;
  proxy: ProxyI;
}) => {
  columns.forEach((col) => {
    const name = getName({ column: col });
    const color = getColor({ colors, name });

    if (isTypeLine({ types, name })) {
      const coords: [number, number][] = calculateCoordsForOneChart({
        col,
        xRatio,
        yRatio,
        dpiHeight: DPI_HEIGHT,
        padding: PADDING,
      });

      calculateGraph({ ctx, coords, options: { color } });

      for (const [x, y] of coords) {
        if (
          isOver({
            mouse: proxy.mouse,
            x,
            length: coords.length,
            dpiWidth: DPI_WIDTH,
          })
        ) {
          circle({ ctx, coord: [x, y], color, circleRadius: CIRCLE_RADIUS });
          break;
        }
      }
    }
  });
};

export const chart = ({
  canvas,
  data,
  tooltipDomElement,
}: {
  canvas: HTMLCanvasElement;
  data: DATA_CANVASI;
  tooltipDomElement: HTMLDivElement;
}) => {
  const { columns, types, colors } = data;
  const tooltip = tooltipSettings({ element: tooltipDomElement });
  let raf: number;
  const ctx = canvas.getContext("2d");
  canvas.style.height = `${HEIGHT}px`;
  canvas.style.width = `${WIDTH}px`;
  canvas.height = DPI_HEIGHT;
  canvas.width = DPI_WIDTH;

  // console.log('columns', columns);
  // console.log('types', types);
  // console.log('colors', colors);

  const paint = ({ proxy }: { proxy: ProxyI }) => {
    return () => {
      clear({ ctx, dpiWidth: DPI_WIDTH, dpiHeight: DPI_HEIGHT });
      const { minY, maxY } = computeBoundariesByYAxios({ columns, types });
      const yRatio = calculateYRatio({ minY, maxY, viewHeight: VIEW_HEIGHT });
      const xRatio = calculateXRatio({
        countXCoords: data.columns[0].length,
        viewWidth: VIEW_WIDTH,
      });
      createYAxis({
        ctx,
        minY,
        maxY,
        viewHeight: VIEW_HEIGHT,
        rowsCount: ROWS_COUNT,
        padding: PADDING,
        dpiWidth: DPI_WIDTH,
      });
      createXAxis({
        ctx,
        data: columns[0],
        xRatio,
        proxy,
        dpiHeight: DPI_HEIGHT,
        dpiWidth: DPI_WIDTH,
        padding: PADDING,
      });
      calculateCharts({ columns, types, yRatio, xRatio, ctx, colors, proxy });
    };
  };

  const proxy = new Proxy(
    {},
    {
      set(...args) {
        const result = Reflect.set(...args);
        raf = requestAnimationFrame(paint({ proxy: args[0] as ProxyI }));
        return result;
      },
    }
  ) as unknown as ProxyI;

  const mousemove = ({ clientX, clientY }: MouseEvent) => {
    const { left, top } = canvas.getBoundingClientRect();
    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        left: clientX - left,
        top: clientY - top,
      },
    };
  };

  const mouseleave = () => {
    proxy.mouse = null;
  };

  canvas.addEventListener("mousemove", mousemove);
  canvas.addEventListener("mouseleave", mouseleave);

  return {
    init: () => paint({ proxy })(),
    destroy: () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", mousemove);
      canvas.removeEventListener("mouseleave", mouseleave);
    },
  };
};
