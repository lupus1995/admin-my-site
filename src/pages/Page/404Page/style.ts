import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  page404Wrapper: {
    marginTop: "auto",
    textAlign: "center",

    "@global": {
      p: {
        marginBottom: "15px",
      },
    },
  },
});

export default useStyles;
