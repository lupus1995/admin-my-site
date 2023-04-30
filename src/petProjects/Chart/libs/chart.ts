import {
  HEIGHT,
  WIDTH,
  DPI_HEIGHT,
  DPI_WIDTH,
  VIEW_HEIGHT,
  VIEW_WIDTH,
  ROWS_COUNT,
  PADDING,
} from "./constants";
import { calculateCharts, calculateTooltip } from "./helpers";
import { DATA_CANVASI, ProxyI } from "./interface";
import { sliderChart } from "./slider";
import { tooltipSettings } from "./tooltip";
import {
  computeBoundariesByYAxios,
  calculateYRatio,
  calculateXRatio,
  createYAxis,
  createXAxis,
  clear,
} from "./utils";

export const chart = ({
  canvas,
  data,
  tooltipDomElement,
  refCanvasSlider,
  arrowLeft,
  arrowRight,
  windowChart,
}: {
  canvas: HTMLCanvasElement;
  data: DATA_CANVASI;
  tooltipDomElement: HTMLDivElement;
  refCanvasSlider: HTMLCanvasElement;
  arrowLeft: HTMLDivElement;
  arrowRight: HTMLDivElement;
  windowChart: HTMLDivElement;
}) => {
  const { columns, types, colors } = data;
  const tooltip = tooltipSettings({ element: tooltipDomElement });
  const slider = sliderChart({
    canvas: refCanvasSlider,
    data,
    arrowLeft,
    arrowRight,
    windowChart,
  });
  let raf: number;
  const ctx = canvas.getContext("2d");
  canvas.style.height = `${HEIGHT}px`;
  canvas.style.width = `${WIDTH}px`;
  canvas.height = DPI_HEIGHT;
  canvas.width = DPI_WIDTH;

  // console.log("columns", columns);
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
      calculateCharts({
        columns,
        types,
        yRatio,
        xRatio,
        ctx,
        colors,
        proxy,
        hasCircle: true,
        dpiHeight: DPI_HEIGHT,
        padding: PADDING,
      });
      calculateTooltip({
        columns,
        types,
        tooltip,
        proxy,
        colors,
        xRatio,
      });
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
    tooltip.hide();
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
