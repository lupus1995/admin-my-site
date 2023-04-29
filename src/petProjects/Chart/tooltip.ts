import { DataTooltipI, TooltipI } from "./interface";
import { css } from "./utils";

const clear = ({ element }: { element: HTMLDivElement }) =>
  (element.innerHTML = "");

const template = (data: DataTooltipI) => {
  const title = `<div style="text-align: center; font-weight: bold;">${data.title}</div>`;
  const spans = data.dates.map((date) => {
    return `
    <div style="color: ${date.color}; padding: 10px; font-weight: bold;">
      <div>${date.value}</div>
      <div>#${date.name}</div>
    </div>`;
  });
  return `${title} <div style="display: flex;">${spans
    .map((span) => span)
    .join("")}</div>`;
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
