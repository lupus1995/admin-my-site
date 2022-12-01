import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  aboutMe: {
    display: "flex",
    marginRight: "15px",
  },

  aboutMePhoto: {
    width: "calc(50% - 15px)",
    marginRight: "30px",

    "& img": {
      maxWidth: "100%",
    },
  },

  aboutMeArticle: {
    width: "50%",
    fontSize: "18px",
    "& p": {
      marginBottom: "15px",
    },
  },
});

export default useStyles;
