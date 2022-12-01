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
    paddingBottom: "100px",

    // "& > :nth-child(2n+1)": {
    //   backgroundColor: "#f4f3f3",
    // },
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
    a: {
      textDecoration: "none",
      color: "#000",
      fontSize: "22px",
    },
    body: {
      fontSize: "16px",
      fontFamily: "Roboto",
      lineHeight: "1.5",
      fontWeight: "300",
      position: "relative",
    },
  },
});

export { useStylesClasses, useStylesTag };
