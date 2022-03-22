import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
  },
  header: {
    background: theme.palette.secondary.main,
    width: "100%",
  },
  noLeagues: {
    fontStyle: "italic",
  },
}));
