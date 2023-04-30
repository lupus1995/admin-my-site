import { css } from "./utils";

// устанавливаю позицию для диапозона, который будет отрисован в основном канвасе
export const setPosition = ({
  left,
  right,
  windowChart,
  arrowLeft,
  arrowRight,
  width,
}: {
  left: number;
  right: number;
  width: number;
  windowChart: HTMLDivElement;
  arrowLeft: HTMLButtonElement;
  arrowRight: HTMLButtonElement;
}) => {
  const minWidth = width * 0.05;
  const currentWidth = width - right - left;

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
