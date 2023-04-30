import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    padding: "15px",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  canvas: {
    border: "1px solid black",
    position: "relative",
  },
  canvasWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  canvasContainer: {
    position: "relative",
    height: "40px",
    display: "flex",
  },
  arrowLeft: {
    height: "inherit",
    background: "rgba(0,0,0,.5)",
    zIndex: 1,
  },
  arrowRight: {
    height: "inherit",
    background: "rgba(0,0,0,.5)",
    zIndex: 1,
  },
  windowChart: {
    height: "inherit",
  },
  canvasSlider: {
    position: "absolute",
    top: "0px",
  },
});

export default useStyles;
