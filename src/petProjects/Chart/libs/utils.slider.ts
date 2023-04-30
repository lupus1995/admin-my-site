export const noop = () => {};

// расчет дельты
export const getDelta = ({
  startX,
  pageX,
}: {
  startX: number;
  pageX: number;
}) => startX - pageX;

// инициализация данный для событий мыши
export const initMouseEvent = ({
  pageX,
  left,
  right,
  width,
}: {
  pageX: number;
  left: number;
  right: number;
  width: number;
}) => {
  const startX = pageX;
  const dimensions = {
    left,
    right,
    width,
  };

  return { startX, dimensions };
};
