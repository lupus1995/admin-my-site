import { createUseStyles } from "react-jss";

import { MediaQueryI } from "utils/mediaQuery";

const useStyles = createUseStyles({
  navigationWrapper: {
    position: "fixed",
    width: "100%",
    zIndex: 1,
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
    alignItems: "baseline",
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
        theme: { is360, is481, is721 },
      } = props;

      if (is721) {
        return "22px";
      }

      if (is481) {
        return "15px";
      }

      if (is360) {
        return "12px";
      }
    },
  },

  buttonSeparator: {
    margin: "0 10px",
    color: "#fff",
  },

  activeButton: {
    textDecoration: "underline",
  },
});

export default useStyles;
