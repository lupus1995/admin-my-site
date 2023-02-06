import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modalHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalContent: {
    margin: "15px 0",
  },
});

export default useStyles;
