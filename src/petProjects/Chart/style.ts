import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainWrapper: {
    minHeight: "100vh",
  },
  main: {
    padding: "15px",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  canvas: {
    border: "1px solid black",
    position: "relative",
  },
  canvasWrapper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "100px",
  },
  canvasContainer: {
    position: "relative",
    height: "40px",
    display: "flex",
  },
  arrowLeft: {
    height: "inherit",
    background: "rgba(0,0,0,.5)",
    // position: "relative",
    zIndex: 1,
  },
  arrowRight: {
    height: "inherit",
    background: "rgba(0,0,0,.5)",
    // position: "relative",
    zIndex: 1,
  },
  windowChart: {
    height: "inherit",
    // position: "relative",
    zIndex: 1,
  },
  canvasSlider: {
    position: "absolute",
    top: "0px",
  },
});

export default useStyles;
