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
    width: "100%",
  },
  titleBlock: {
    fontSize: "35px",
    textAlign: "center",
    marginBottom: "30px",
  },
  block: {
    paddingBottom: () => {
      return "100px";
    },
    paddingTop: () => {
      return "100px";
    },
  },
  blockBackground: {
    backgroundColor: "#f4f3f3",
  },
  dFlex: {
    display: "flex",
  },
  button: {
    color: "#fff",
    borderRadius: "5px",
    width: "auto",
    fontSize: "16px",
    textAlign: "center",
    backgroundColor: "#696cff",
    borderColor: "#696cff",
    padding: "7px 20px",
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
  },
  textCenter: {
    textAlign: "center",
  },
});

// общие стили для тегов основной страницы
const stylesTag = createUseStyles({
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

const useStyleSkeleton = createUseStyles({
  skeleton: {
    backgroundColor: "#ccc",
  },

  titleBlockSkeleton: {
    height: "52px",
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  skeletonLine: {
    height: "20px",
    marginBottom: "10px",
  },
});

export { useStylesClasses, stylesTag, useStyleSkeleton };
