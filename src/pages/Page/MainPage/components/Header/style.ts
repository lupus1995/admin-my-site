import { createUseStyles } from "react-jss";

import { MediaQueryI } from "utils/mediaQuery";

const useStyles = createUseStyles({
  navigationWrapper: {
    position: "fixed",
    width: "100%",
    padding: (props: MediaQueryI) => {
      const {
        theme: { is360, is481 },
      } = props;
      if (is481) {
        return "15px 30px";
      }

      if (is360) {
        return "15px";
      }
    },
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  nav: {
    display: "flex",
    listStyle: "none",
  },

  navItem: {
    paddingRight: "15px",

    "&:last-child": {
      paddingRight: "0",
    },
  },

  navItemLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: (props: MediaQueryI) => {
      const {
        theme: { is360, is481 },
      } = props;
      if (is481) {
        return "22px";
      }

      if (is360) {
        return "15px";
      }
    },
  },
});

export default useStyles;
