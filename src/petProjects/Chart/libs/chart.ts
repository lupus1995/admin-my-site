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
  arrowLeft: HTMLButtonElement;
  arrowRight: HTMLButtonElement;
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

  const paint = ({ proxy }: { proxy: ProxyI }) => {
    return () => {
      clear({ ctx, dpiWidth: DPI_WIDTH, dpiHeight: DPI_HEIGHT });
      const length = columns[0].length;
      const leftIndex = Math.round((length * proxy.pos[0]) / 100);
      const rightIndex = Math.round((length * proxy.pos[1]) / 100);

      const filteredColumns = columns.map((col) => {
        const result = col.slice(leftIndex, rightIndex);

        if (typeof result[0] !== "string") {
          result.unshift(col[0]);
        }

        return result;
      });

      const { minY, maxY } = computeBoundariesByYAxios({
        columns: filteredColumns,
        types,
      });
      const yRatio = calculateYRatio({ minY, maxY, viewHeight: VIEW_HEIGHT });
      const xRatio = calculateXRatio({
        countXCoords: filteredColumns[0].length,
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
        data: filteredColumns[0],
        xRatio,
        proxy,
        dpiHeight: DPI_HEIGHT,
        dpiWidth: DPI_WIDTH,
        padding: PADDING,
      });
      calculateCharts({
        columns: filteredColumns,
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
        columns: filteredColumns,
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

  slider.subscibe({
    fn: (pos: [number, number]) => {
      proxy.pos = pos;
    },
  });

  const mousemove = ({ clientX, clientY }: MouseEvent) => {
    const { left, top } = canvas.getBoundingClientRect();
    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        left: clientX - left,
        top: clientY - top + 200,
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
    init: () => {
      paint({ proxy })();
      slider.init();
    },
    destroy: () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", mousemove);
      canvas.removeEventListener("mouseleave", mouseleave);
      slider.destroy();
    },
  };
};
