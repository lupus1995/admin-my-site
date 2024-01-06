import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  formWrapper: {
    height: "auto",
    width: "100%",
    padding: "15px",
    borderTop: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "space-between",
  },

  textAreaWrapper: {
    width: "1372px",
    height: "120px",
    maxWidth: "100%",
  },

  formButton: {
    display: "flex",
    marginTop: "auto",
  },
});

export default useStyles;
