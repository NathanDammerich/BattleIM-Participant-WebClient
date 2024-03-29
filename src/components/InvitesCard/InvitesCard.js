import React, { useEffect } from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { removeModal } from "../../actions/modals.js";
import useStyles from "./styles";
import InviteListItem from "../InviteListItem/InviteListItem";

export default function InvitesCard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      if (user.invites.length === 0) {
        dispatch(removeModal());
      }
    }
  }, [user, dispatch]);

  return (
    <Card raised className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.header}>
            Team Invites
          </Typography>
        </Grid>
        {user.invites.map((invite) => (
          <Grid item xs={12}>
            <InviteListItem teamID={invite} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
