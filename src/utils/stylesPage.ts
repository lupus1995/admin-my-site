import { createUseStyles } from "react-jss";

import { MediaQueryI } from "./mediaQuery";

// общие классы для страницы
const useStylesClasses = createUseStyles({
  container: {
    padding: (props: MediaQueryI) => {
      const {
        theme: { is360, is481 },
      } = props;

      if (is481) {
        return "0 30px";
      }

      if (is360) {
        return "0 15px";
      }
    },
  },
  wrapper: {
    maxWidth: "1920px",
    margin: "0 auto",
  },
  titleBlock: {
    fontSize: "35px",
    textAlign: "center",
    marginBottom: "30px",
    paddingTop: "100px",
  },
  block: {
    paddingBottom: () => {
      return "100px";
    },
  },
  blockBackground: {
    backgroundColor: "#f4f3f3",
  },
  dFlex: {
    display: "flex",
  },
});

// общие стили для тегов основной страницы
const useStylesTag = createUseStyles({
  "@global": {
    "*": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
    body: {
      fontSize: "16px",
      fontFamily: "Roboto",
      lineHeight: "1.5",
      fontWeight: "300",
      position: "relative",
    },

    button: {
      background: "none",
      border: "none",
      cursor: "pointer",
    },
  },
});

export { useStylesClasses, useStylesTag };
