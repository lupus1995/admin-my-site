import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  messageWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  messageAuthor: {
    fontWeight: 500,
  },
  messageWrapperItem: {
    marginBottom: 10,
  },

  messageContainerItem: {
    padding: 10,
    border: "1px solid #e9ecef",
    display: "inline-flex",
    borderRadius: 20,
  },

  messageContainerItemBC: {
    backgroundColor: "#ccc",
  },

  messageTime: {
    textAlign: "left",
  },
});

export default useStyles;
