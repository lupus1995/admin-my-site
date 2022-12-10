import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  input: {
    borderRadius: "6px",
    border: "1px solid #ccc",
    padding: "5px",
  },

  inputSubmit: {
    width: "200px",
    marginLeft: "auto",
  },

  label: {
    marginBottom: "15px",
  },

  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    marginBottom: "30px",
  },

  contacts: {
    width: "500px",
    margin: "0 auto",
  },

  inputHidden: {
    display: "none",
  },
});

export default useStyles;
