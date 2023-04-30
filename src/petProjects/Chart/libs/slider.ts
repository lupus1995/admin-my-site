import { DPI_WIDTH, VIEW_WIDTH, WIDTH } from "./constants";
import { calculateCharts } from "./helpers";
import { setPosition } from "./helpers.slider";
import { DATA_CANVASI } from "./interface";
import {
  computeBoundariesByYAxios,
  calculateYRatio,
  calculateXRatio,
} from "./utils";
import { initMouseEvent, getDelta } from "./utils.slider";

const HEIGHT = 40;
const DPI_HEIGHT = HEIGHT * 2;

export const sliderChart = ({
  canvas,
  data,
  arrowLeft,
  arrowRight,
  windowChart,
}: {
  canvas: HTMLCanvasElement;
  data: DATA_CANVASI;
  arrowLeft: HTMLButtonElement;
  arrowRight: HTMLButtonElement;
  windowChart: HTMLDivElement;
}) => {
  const { columns, types, colors } = data;
  const ctx = canvas.getContext("2d");
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;
  canvas.style.height = `${HEIGHT}px`;
  canvas.style.width = `${WIDTH}px`;

  const { minY, maxY } = computeBoundariesByYAxios({ columns, types });
  const yRatio = calculateYRatio({ minY, maxY, viewHeight: DPI_HEIGHT });
  const xRatio = calculateXRatio({
    countXCoords: data.columns[0].length,
    viewWidth: VIEW_WIDTH,
  });

  calculateCharts({
    columns,
    types,
    yRatio,
    xRatio,
    ctx,
    colors,
    hasCircle: false,
    dpiHeight: DPI_HEIGHT,
    padding: -5,
  });

  setPosition({
    left: 0,
    right: WIDTH - WIDTH * 0.3,
    windowChart,
    arrowLeft,
    arrowRight,
    width: WIDTH,
  });

  const mousedownWindowChart = (event: MouseEvent) => {
    const { startX, dimensions } = initMouseEvent({
      pageX: event.pageX,
      left: parseInt(windowChart.style.left),
      right: parseInt(windowChart.style.right),
      width: parseInt(windowChart.style.width),
    });

    document.onmousemove = (e: MouseEvent) => {
      const delta = getDelta({ startX, pageX: e.pageX });

      if (delta === 0) {
        return;
      }

      const left = dimensions.left - delta;
      const right = WIDTH - left - dimensions.width;

      setPosition({
        left,
        right,
        windowChart,
        arrowLeft,
        arrowRight,
        width: WIDTH,
      });
    };
  };

  const mouseDownArrowLeft = (event: MouseEvent) => {
    const { startX, dimensions } = initMouseEvent({
      pageX: event.pageX,
      left: parseInt(windowChart.style.left),
      right: parseInt(windowChart.style.right),
      width: parseInt(windowChart.style.width),
    });

    document.onmousemove = (e: MouseEvent) => {
      const delta = getDelta({ startX, pageX: e.pageX });

      if (delta === 0) {
        return;
      }

      const left = WIDTH - (dimensions.width + delta) - dimensions.right;
      const right = WIDTH - (dimensions.width + delta) - left;

      setPosition({
        left,
        right,
        windowChart,
        arrowLeft,
        arrowRight,
        width: WIDTH,
      });
    };
  };

  const mouseDownArrowRight = (event: MouseEvent) => {
    const { startX, dimensions } = initMouseEvent({
      pageX: event.pageX,
      left: parseInt(windowChart.style.left),
      right: parseInt(windowChart.style.right),
      width: parseInt(windowChart.style.width),
    });

    document.onmousemove = (e: MouseEvent) => {
      const delta = getDelta({ startX, pageX: e.pageX });

      if (delta === 0) {
        return;
      }

      const right = WIDTH - (dimensions.width - delta) - dimensions.left;

      setPosition({
        left: dimensions.left,
        right,
        windowChart,
        arrowLeft,
        arrowRight,
        width: WIDTH,
      });
    };
  };

  const mouseup = () => {
    document.onmousemove = null;
  };

  windowChart.addEventListener("mousedown", mousedownWindowChart);
  arrowLeft.addEventListener("mousedown", mouseDownArrowLeft);
  arrowRight.addEventListener("mousedown", mouseDownArrowRight);
  document.addEventListener("mouseup", mouseup);

  return {
    init: () => {
      calculateCharts({
        columns,
        types,
        yRatio,
        xRatio,
        ctx,
        colors,
        hasCircle: false,
        dpiHeight: DPI_HEIGHT,
        padding: -5,
      });

      setPosition({
        left: 0,
        right: WIDTH - WIDTH * 0.3,
        windowChart,
        arrowLeft,
        arrowRight,
        width: WIDTH,
      });
    },
    destroy: () => {
      windowChart.removeEventListener("mousedown", mousedownWindowChart);
      arrowLeft.removeEventListener("mousedown", mouseDownArrowLeft);
      arrowRight.removeEventListener("mousedown", mouseDownArrowRight);
      document.removeEventListener("mouseup", mouseup);
    },
  };
};
