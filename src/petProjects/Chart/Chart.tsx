import React, { useEffect, useRef } from "react";

import { getChartData } from "./data";
import { chart } from "./libs/chart";
import { DATA_CANVASI } from "./libs/interface";
import useStyles from "./style";

const Chart = () => {
  const refCanvasChart: React.MutableRefObject<null | HTMLCanvasElement> =
    useRef(null);
  const refTooltip: React.MutableRefObject<null | HTMLDivElement> =
    useRef(null);
  const refCanvasSlider: React.MutableRefObject<null | HTMLCanvasElement> =
    useRef(null);

  const styles = useStyles();

  useEffect(() => {
    const test = chart({
      canvas: refCanvasChart.current,
      data: getChartData() as unknown as DATA_CANVASI,
      tooltipDomElement: refTooltip.current,
      refCanvasSlider: refCanvasSlider.current,
    });

    test.init();
  }, []);

  return (
    <main className={`${styles.main}`}>
      <div className={styles.tooltip} ref={refTooltip}></div>
      <div className={styles.canvasWrapper}>
        <canvas className={`${styles.canvas}`} ref={refCanvasChart} />
        <canvas ref={refCanvasSlider}></canvas>
      </div>
    </main>
  );
};

export default Chart;
