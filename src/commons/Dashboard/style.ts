import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  pageWrapper: {
    backgroundColor: "#f5f5f9",
    height: "100%",
    display: "flex",
  },

  dashboard: {
    backgroundColor: "#fff",
    width: "260px",
    height: "100vh",
    marginRight: "30px",
  },

  dashboardLogo: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#566a7f",
  },

  dashboardLinkWrapper: {
    padding: "10px 16px",
    margin: "0 10px",
  },

  dashboardLink: {
    color: "#697a8d",
    fontWeight: 400,
    textDecoration: "none",
    fontSize: "16px",
  },

  dashboardLinkActive: {
    color: "#696cff",
    backgroundColor: "#e7e7ff",
    display: "block",
  },
});

export default useStyles;
