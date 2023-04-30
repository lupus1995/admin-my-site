import { DPI_WIDTH, VIEW_WIDTH, WIDTH } from "./constants";
import { calculateCharts } from "./helpers";
import { DATA_CANVASI } from "./interface";
import {
  computeBoundariesByYAxios,
  calculateYRatio,
  calculateXRatio,
} from "./utils";

const HEIGHT = 40;
const DPI_HEIGHT = HEIGHT * 2;

export const sliderChart = ({
  canvas,
  data,
}: {
  canvas: HTMLCanvasElement;
  data: DATA_CANVASI;
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
};
