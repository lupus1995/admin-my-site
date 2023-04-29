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
});

export default useStyles;
