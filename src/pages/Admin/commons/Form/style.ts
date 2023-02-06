import { createUseStyles } from "react-jss";

import { FORM_POSITION_TYPE } from "./types";

const useStyles = createUseStyles({
  form: {
    border: "0 solid #d9dee3",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    padding: "24px",
  },
  formCenter: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  formWrapper: {
    backgroundColor: "#f5f5f9",
    alignItems: (props: { alignItems: FORM_POSITION_TYPE }) => {
      switch (props.alignItems) {
        case "baceline": {
          return "baseline";
        }

        case "center": {
          return "center";
        }

        default: {
          return "initial";
        }
      }
    },
    color: "#566a7f",
  },
});

export default useStyles;
