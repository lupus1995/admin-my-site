import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  thumbnail: {
    maxWidth: "100%",
    height: "auto",
  },

  item: {
    maxWidth: "calc(50% - 15px)",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 3px #000",

    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
});

export default useStyles;
