import { createUseStyles } from "react-jss";

import { MediaQueryI } from "utils/mediaQuery";

const useStyles = createUseStyles({
  time: {
    textAlign: "right",
    marginTop: "auto",
  },
  previewLink: {
    outline: "none",
    textDecoration: "none",
    color: "#000",
  },
  previewTitle: {
    fontSize: "30px",
    marginBottom: "10px",
  },
  previewDescription: {
    fontSize: "18px",
    marginTop: "10px",
  },
  previewImage: {
    height: (props: MediaQueryI) => {
      const { is721, is1081 } = props.theme;

      if (is1081) {
        return "200px";
      }

      if (is721) {
        return "280px";
      }

      return "200px";
    },
    backgroundColor: "#333",
    borderRadius: "10px,",
    maxWidth: "100%",
  },
  articleContainer: {
    boxShadow: "0px 0px 3px #000",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    width: (props: MediaQueryI) => {
      const { is1081, isMin1600AndMax1920, isMin1367AndMax1600, is1921 } =
        props.theme;

      if (isMin1600AndMax1920 || is1921) {
        return "24%";
      }

      if (isMin1367AndMax1600) {
        return "26%";
      }

      if (is1081) {
        return "47.8%";
      }

      return "100%";
    },
    marginRight: (props: MediaQueryI) => {
      const { isMin1600AndMax1920, isMin1367AndMax1600, is1921 } = props.theme;

      if (is1921) {
        return "18px";
      }

      if (isMin1600AndMax1920) {
        return "1.3%";
      }

      if (isMin1367AndMax1600) {
        return "11%";
      }

      return "auto";
    },

    marginBottom: (props: MediaQueryI) => {
      const { is360 } = props.theme;

      if (is360) {
        return "30px";
      }

      return "";
    },

    "&:nth-child(5n)": {
      marginRight: (props: MediaQueryI) => {
        const { is1921 } = props.theme;

        if (is1921) {
          return "0px";
        }

        return "";
      },
    },
    "&:nth-child(4n)": {
      marginRight: (props: MediaQueryI) => {
        const { isMin1600AndMax1920 } = props.theme;

        if (isMin1600AndMax1920) {
          return "0px";
        }

        return "";
      },
    },
    "&:nth-child(3n)": {
      marginRight: (props: MediaQueryI) => {
        const { isMin1367AndMax1600 } = props.theme;

        if (isMin1367AndMax1600) {
          return "0px";
        }

        return "";
      },
    },
    "&:nth-child(2n)": {
      marginRight: (props: MediaQueryI) => {
        const { isMin721AndMax1080, isMin1081AndMax1366 } = props.theme;

        if (isMin721AndMax1080 || isMin1081AndMax1366) {
          return "0";
        }

        return "";
      },
    },

    "&:nth-last-child(-n + 1)": {
      marginBottom: (props: MediaQueryI) => {
        const { isMin721AndMax1080 } = props.theme;

        if (isMin721AndMax1080) {
          return "0";
        }

        return "";
      },
    },

    "&:nth-last-child(-n + 2)": {
      marginBottom: (props: MediaQueryI) => {
        const { isMin721AndMax1080 } = props.theme;

        if (isMin721AndMax1080) {
          return "30px";
        }

        return "";
      },
    },
  },

  articlesContainer: {
    display: "flex",
    textAlign: (props: MediaQueryI) => {
      const { is721, is1081 } = props.theme;

      if (is1081) {
        return "left";
      }

      if (is721) {
        return "center";
      }

      return "";
    },
    flexDirection: (props: MediaQueryI) => {
      const { is721 } = props.theme;
      if (is721) {
        return "row";
      }

      // для ширины 360px
      return "row";
    },
    flexWrap: "wrap",
  },

  articleLinkSkeleton: {
    height: "27px",
    width: "100%",
  },
});

export default useStyles;
