import { createUseStyles } from "react-jss";

// общие стили для страницы админки
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
  textarea: {
    resize: "none",
  },
  editor: {
    width: "100%",
    marginTop: "15px",
  },
  disabled: {
    backgroundColor: "#ccc",
    pointerEvents: "none",
    opacity: "0.5",
  },
  dFlex: {
    display: "flex",
  },
  flexColumn: {
    flexDirection: "column",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  mr15: {
    marginRight: "15px",
  },

  // стили для модального окна
  modalHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalContent: {
    margin: "15px 0",
  },
});

export default useUtilsStyles;
