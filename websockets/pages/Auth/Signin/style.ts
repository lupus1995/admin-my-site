import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputPassword: {
    "& input[type=password]": {
      width: "100%",
    },
  },
});

export default useStyles;
