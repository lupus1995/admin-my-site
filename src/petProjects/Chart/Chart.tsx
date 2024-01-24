import React, { useEffect, useRef } from "react";

import { Footer } from "commons/Footer";
import { Header } from "pages/Page/components";
import useUtilsStyles from "utils/styles";

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

  const arrowRight: React.MutableRefObject<null | HTMLButtonElement> =
    useRef(null);
  const arrowLeft: React.MutableRefObject<null | HTMLButtonElement> =
    useRef(null);
  const windowChart: React.MutableRefObject<null | HTMLDivElement> =
    useRef(null);

  const styles = useStyles();
  const utilsStyles = useUtilsStyles();

  useEffect(() => {
    const test = chart({
      canvas: refCanvasChart.current,
      data: getChartData() as unknown as DATA_CANVASI,
      tooltipDomElement: refTooltip.current,
      refCanvasSlider: refCanvasSlider.current,
      arrowLeft: arrowLeft.current,
      arrowRight: arrowRight.current,
      windowChart: windowChart.current,
    });

    test.init();
  }, []);

  return (
    <div
      className={`${utilsStyles.dFlex} ${utilsStyles.flexColumn} ${styles.mainWrapper}`}
    >
      <Header />
      <main className={`${styles.main}`}>
        <div className={styles.tooltip} ref={refTooltip}></div>
        <div className={styles.canvasWrapper}>
          <p>Просмотр доступен исключительно с компьютера</p>
          <canvas className={`${styles.canvas}`} ref={refCanvasChart} />
          <div className={styles.canvasContainer}>
            <button
              data-element="arrow"
              data-type="left"
              className={styles.arrowLeft}
              ref={arrowLeft}
            ></button>
            <div
              data-element="window"
              data-type="window"
              className={styles.windowChart}
              ref={windowChart}
            ></div>
            <button
              data-element="arrow"
              data-type="right"
              className={styles.arrowRight}
              ref={arrowRight}
            ></button>
            <canvas
              className={styles.canvasSlider}
              ref={refCanvasSlider}
            ></canvas>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chart;
