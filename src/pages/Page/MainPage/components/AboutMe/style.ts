import { createUseStyles } from "react-jss";

import { MediaQueryI } from "utils/mediaQuery";
const useStyles = createUseStyles({
  aboutMe: {
    display: "flex",
    flexDirection: (props: MediaQueryI) => {
      const {
        theme: { is1081 },
      } = props;

      if (is1081) {
        return "initial";
      }

      return "column";
    },
  },

  aboutMePhoto: {
    width: (props: MediaQueryI) => {
      const {
        theme: { is1081 },
      } = props;
      if (is1081) {
        return "calc(50% - 15px)";
      }

      return "100%";
    },
    marginRight: "30px",

    "& img": {
      maxWidth: "100%",
    },
  },

  aboutMeArticle: {
    width: (props: MediaQueryI) => {
      const {
        theme: { is1081 },
      } = props;

      if (is1081) {
        return "50%";
      }

      return "100%";
    },
    fontSize: "18px",
    "& p": {
      marginBottom: "15px",
    },
  },
});

export default useStyles;
