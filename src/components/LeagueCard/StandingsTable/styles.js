import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "900",
    },
  },
  myTeam: {
    borderLeft: "5px solid red",
  },
  header: {
    background: theme.palette.secondary.main,

    maxHeight: "25px",
  },
  noLeagues: {
    fontStyle: "italic",
  },
  rowWrapper: {
    maxHeight: "40px",
  },
}));
