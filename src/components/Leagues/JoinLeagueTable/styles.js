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
    border: "none",
    borderWidth: "0",
    border: "0",
  },
  sportRow: {
    background: theme.palette.primary.main,
    width: "100%",
    color: "white",
  },
  leagueRow: {
    background: theme.palette.grey,
  },
  button: {
    color: theme.palette.secondary.main,
  },
  leagueName: {
    paddingLeft: theme.spacing(3),
  },
  sportName: {
    color: "white",
  },
  smallButton: {
    fontSize: "0.65rem",
    padding: "2px 6px",
  },
  noLeagues: {
    fontStyle: "italic",
  },
}));
