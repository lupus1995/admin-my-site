import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  articlesContainer: {
    width: "1030px",
    display: "flex",
    justifyContent: "space-between",
  },

  articleItem: {
    maxWidth: "calc(50% - 15px)",
  },

  articleTumbnail: {
    maxWidth: "100%",
  },
});

export default useStyles;
