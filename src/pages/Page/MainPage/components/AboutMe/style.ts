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
      height: "100%",
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

  aboutMeBlockSkeleton: {
    height: (props: MediaQueryI) => {
      const {
        theme: { is360, is721, is1081, is1367, is1601, is1921 },
      } = props;

      if (is1921) {
        return "489px";
      }

      if (is1601) {
        return "420px";
      }

      if (is1367) {
        return "357px";
      }

      if (is1081) {
        return "275px";
      }

      if (is721) {
        return "370px";
      }

      if (is360) {
        return "254px";
      }

      return "auto";
    },
  },
});

export default useStyles;
