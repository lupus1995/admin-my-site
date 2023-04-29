export interface DATA_CANVASI {
  colors: {
    [color: string]: string;
  };
  columns: [Array<string | number>];
  names: {
    [name: string]: string;
  };
  types: {
    [type: string]: string;
  };
}

export interface ProxyI {
  mouse: AxisXI;
}

export interface AxisXI {
  x: number;
  tooltip: {
    left: number;
    top: number;
  };
}

export interface DataTooltipI {
  title: string;
  dates: {
    color: string;
    value: string;
    name: string;
  }[];
}

export interface TooltipI {
  left: number;
  top: number;
  dataTooltip: DataTooltipI;
}
