import { TooltipI } from "./interface";
import { css } from "./utils";

const clear = ({ element }: { element: HTMLDivElement }) =>
  (element.innerHTML = "");

const template = (data: { title: string }) => {
  return `<div>${data.title}</div>`;
};

export const tooltipSettings = ({ element }: { element: HTMLDivElement }) => {
  return {
    show: ({ left, top, dataTooltip }: TooltipI) => {
      const { width, height } = element.getBoundingClientRect();
      clear({ element });
      css({
        element,
        styles: {
          display: "block",
          top: `${top - height}px`,
          left: `${left + width / 2}px`,
        },
      });
      element.insertAdjacentHTML("afterbegin", template(dataTooltip));
    },
    // @ts-ignore
    hide: () => css({ element: el, styles: { display: "none" } }),
  };
};
