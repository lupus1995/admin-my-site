import { DPI_WIDTH, VIEW_WIDTH, WIDTH } from "./constants";
import { calculateCharts } from "./helpers";
import { DATA_CANVASI } from "./interface";
import {
  computeBoundariesByYAxios,
  calculateYRatio,
  calculateXRatio,
  css,
} from "./utils";

const HEIGHT = 40;
const DPI_HEIGHT = HEIGHT * 2;

const setPosition = ({
  left,
  right,
  windowChart,
  arrowLeft,
  arrowRight,
}: {
  left: number;
  right: number;
  windowChart: HTMLDivElement;
  arrowLeft: HTMLDivElement;
  arrowRight: HTMLDivElement;
}) => {
  const minWidth = WIDTH * 0.05;
  const currentWidth = WIDTH - right - left;

  if (currentWidth < minWidth) {
    css({ element: windowChart, styles: { minWidth: `${minWidth}px` } });
    return;
  }

  if (left < 0) {
    css({ element: windowChart, styles: { left: 0 } });
    css({ element: arrowLeft, styles: { width: 0 } });
    return;
  }

  if (right < 0) {
    css({ element: windowChart, styles: { right: 0 } });
    css({ element: arrowRight, styles: { width: 0 } });

    return;
  }

  css({
    element: windowChart,
    styles: {
      width: `${currentWidth}px`,
      left: `${left}px`,
      right: `${right}px`,
    },
  });

  css({ element: arrowRight, styles: { width: `${right}px` } });
  css({ element: arrowLeft, styles: { width: `${left}px` } });
};

export const sliderChart = ({
  canvas,
  data,
  arrowLeft,
  arrowRight,
  windowChart,
}: {
  canvas: HTMLCanvasElement;
  data: DATA_CANVASI;
  arrowLeft: HTMLDivElement;
  arrowRight: HTMLDivElement;
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
  });
};
