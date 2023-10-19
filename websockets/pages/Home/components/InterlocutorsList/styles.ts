import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  interlocutorsList: {
    width: "400px",
  },

  interlocutorItem: {
    display: "flex",
    cursor: "pointer",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },

  interlocutorAvatar: {
    marginRight: "15px",
  },

  interlocutorsDate: {
    textAlign: "right",
    fontWeight: "inherit",
    marginTop: "5px",
  },
  interlocutorInfo: {
    textAlign: "left",
    width: "100%",
  },

  interlocutorButton: {
    width: "100%",
  },
});

export default useStyles;
