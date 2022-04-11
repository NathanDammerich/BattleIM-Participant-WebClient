import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  click: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold",
    },
  },
  primary: {
    color: theme.palette.primary.main,
  },
}));
