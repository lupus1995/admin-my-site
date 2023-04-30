import React, { useEffect, useRef } from "react";

import { getChartData } from "./data";
import { chart } from "./libs/chart";
import { DATA_CANVASI } from "./libs/interface";
import useStyles from "./style";

const Chart = () => {
  const refCanvas: React.MutableRefObject<null | HTMLCanvasElement> =
    useRef(null);
  const refTooltip: React.MutableRefObject<null | HTMLDivElement> =
    useRef(null);
  const styles = useStyles();

  useEffect(() => {
    const test = chart({
      canvas: refCanvas.current,
      data: getChartData() as unknown as DATA_CANVASI,
      tooltipDomElement: refTooltip.current,
    });

    test.init();
  }, []);

  return (
    <main className={`${styles.main}`}>
      <div className={styles.tooltip} ref={refTooltip}></div>
      <canvas className={`${styles.canvas}`} id="chart" ref={refCanvas} />
    </main>
  );
};

export default Chart;
