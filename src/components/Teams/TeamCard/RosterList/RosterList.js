import { Grid, Typography } from "@material-ui/core";
import React from "react";

export default function RosterList({ roster }) {
  console.log(roster);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" align="left">
          Roster
        </Typography>
      </Grid>
      {roster.map((player) => (
        <Grid item xs={12} align="left" key={player._id}>
          <Typography>
            {player.name} {player.name === "Nate Dammerich" && " - Captain"}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
