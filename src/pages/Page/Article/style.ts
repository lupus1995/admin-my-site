import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  articleWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  previewTitle: {
    fontSize: "30px",
    marginBottom: "10px",
    textAlign: "center",
  },

  articleImageContainer: {
    textAlign: "center",
  },
  articleImage: {
    maxHeight: "400px",
    maxWidth: "100%",
  },
  articlePublishedDate: {
    textAlign: "right",
    margin: "10px 0",
  },
  articleText: {
    "@global": {
      strong: {
        display: "block",
        margin: "20px 0",
        fontWeight: "600",
      },

      ul: {
        listStyle: "initial",
        margin: "20px 0",
        paddingLeft: "15px",
      },

      ol: {
        listStyle: "conic-gradient",
        margin: "20px 0",
        paddingLeft: "15px",
      },

      img: {
        marginTop: "20px",
        maxWidth: "100%",
        textAlign: "center",
      },
    },
  },
});

export default useStyle;
