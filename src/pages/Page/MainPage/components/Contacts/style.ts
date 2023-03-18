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
    maxWidth: "500px",
    margin: "0 auto",
  },

  inputHidden: {
    display: "none",
  },

  iconContainer: {
    display: "flex",
    alignItems: "baseline",
  },

  iconLinkItem: {
    marginRight: "10px",
    cursor: "pointer",
    width: "24px",
    height: "24px",
  },
});

export default useStyles;
