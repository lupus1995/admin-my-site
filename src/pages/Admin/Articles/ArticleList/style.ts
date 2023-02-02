import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  articlesContainer: {
    width: "1030px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  articleItem: {
    maxWidth: "calc(50% - 15px)",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 3px #000",

    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },

  articleTumbnail: {
    maxWidth: "100%",
  },
});

export default useStyles;
