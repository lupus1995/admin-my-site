import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  chatWrapper: {
    display: "flex",
    margin: "15px",
    height: "calc(100vh - 30px)",
    overflow: "hidden",
    borderBottom: "1px #e9ecef solid",
    borderLeft: "1px #e9ecef solid",
  },
});

export default useStyles;
