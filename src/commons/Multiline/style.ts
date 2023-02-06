import { createUseStyles } from "react-jss";

import { MultilineStyleI } from "./interface";

const useStyles = createUseStyles({
  multilineEllipsis: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": (props: MultilineStyleI) => {
      const {
        theme: { numberLine },
      } = props;

      return numberLine || 3;
    },
    "white-space": "pre-wrap",
  },
});

export default useStyles;
