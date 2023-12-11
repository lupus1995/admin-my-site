import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  messagesWrapper: {
    padding: 15,
    overflowY: "scroll",
    height: "calc(100% - 250px)",
  },

  messageWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  messageAuthor: {
    fontWeight: 500,
  },

  messageTime: {
    textAlign: "left",
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
});

export default useStyle;
