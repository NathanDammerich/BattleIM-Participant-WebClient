import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    padding: "10px 10px",
  },
  icon: {
    "&:hover": {
      color: theme.palette.secondary.main,
      transition: "250ms",
    },
  },
}));
