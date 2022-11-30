import { createUseStyles } from "react-jss";

import { MediaQueryI } from "utils/mediaQuery";

const useStyles = createUseStyles({
  firstBlock: {
    width: "100%",
    height: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "#fff",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundColor: "#333",
  },

  title: {
    width: "100%",
    display: "block",
    fontSize: (props: MediaQueryI) => {
      const {
        theme: { is360, is481, is721 },
      } = props;

      if (is721) return "48px";
      if (is481) return "36px";
      if (is360) return "25px";
    },
  },

  subtitle: {
    width: "100%",
    display: "block",
    fontSize: (props: MediaQueryI) => {
      const {
        theme: { is360, is481, is721 },
      } = props;

      if (is721) return "30px";
      if (is481) return "18px";
      if (is360) return "14px";
    },
  },
});

export default useStyles;
