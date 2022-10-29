import { createUseStyles } from "react-jss";

const useUtilsStyles = createUseStyles({
  input: {
    border: "1px solid #d9dee3",
    borderRadius: "5px",
    backgroundColor: "#fff",
    fontSize: "16px",
    outline: "none",
    padding: "7px 14px",
    width: "calc(100% - 30px)",
  },
  button: {
    color: "#fff",
    borderRadius: "5px",
    width: "100%",
    fontSize: "16px",
    textAlign: "center",
    backgroundColor: "#696cff",
    borderColor: "#696cff",
    padding: "7px 20px",
    border: "none",
  },
});

export default useUtilsStyles;
