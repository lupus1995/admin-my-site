import { createUseStyles } from "react-jss";

import { MediaQueryI } from "utils/mediaQuery";

const useStyles = createUseStyles({
  aboutMe: {
    display: "flex",
    marginRight: "15px",
    textIndent: "15px",
  },

  aboutMePhoto: {
    width: "calc(50% - 15px)",
    marginRight: "15px",
  },

  aboutMeArticle: {
    width: "50%",
    fontSize: "18px",

    "& p": {
      marginBottom: "15px",
    },
  },

  articlesContainer: {
    display: "flex",
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

  articleContainer: {
    width: (props: MediaQueryI) => {
      const { is1367, is1921, is1081, is721, is360 } = props.theme;

      if (is1921) {
        return "15%";
      }

      if (is1367) {
        return "21%";
      }

      if (is1081) {
        return "29%";
      }

      if (is721) {
        return "47%";
      }

      if (is360) {
        return "100%";
      }
    },
    marginRight: (props: MediaQueryI) => {
      const { is1367, is1921, is1081, is360 } = props.theme;

      if (is1921) {
        return "6.25%";
      }

      if (is1367) {
        return "5.3%";
      }

      if (is1081) {
        return "6.5%";
      }

      if (is360) {
        return "100%";
      }
    },

    margin: (props: MediaQueryI) => {
      const { is721 } = props.theme;

      if (is721) {
        return "0 6% 30px 0";
      }
    },

    marginBottom: (props: MediaQueryI) => {
      const { is360 } = props.theme;

      if (is360) {
        return "30px";
      }
    },

    "& :nth-child(5n)": {
      marginRight: (props: MediaQueryI) => {
        const { is1921 } = props.theme;

        if (is1921) {
          return 0;
        }
      },
    },
    "& :nth-child(4n)": {
      marginRight: (props: MediaQueryI) => {
        const { isMin1367AndMax1920 } = props.theme;

        if (isMin1367AndMax1920) {
          return 0;
        }
      },
    },
    "&: nth-child(3n)": {
      marginRight: (props: MediaQueryI) => {
        const { isMin1081AndMax1366 } = props.theme;

        if (isMin1081AndMax1366) {
          return 0;
        }
      },
    },
    "&: nth-child(2n)": {
      marginRight: (props: MediaQueryI) => {
        const { isMin721AndMax1080 } = props.theme;

        if (isMin721AndMax1080) {
          return "0";
        }
      },
    },

    "&:nth-last-child(-n + 1)": {
      marginBottom: (props: MediaQueryI) => {
        const { isMin721AndMax1080 } = props.theme;

        if (isMin721AndMax1080) {
          return "0";
        }
      },
    },

    "&:nth-last-child(-n + 2)": {
      marginBottom: (props: MediaQueryI) => {
        const { isMin721AndMax1080 } = props.theme;

        if (isMin721AndMax1080) {
          return "0";
        }
      },
    },
  },

  previewImage: {
    height: "200px",
    backgroundColor: "#333",
    borderRadius: "10px,",
  },

  previewTitle: {
    fontSize: "30px",
  },

  previewDescription: {
    fontSize: "18px",
  },
});

export default useStyles;
