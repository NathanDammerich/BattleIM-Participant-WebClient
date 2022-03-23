import { Grid, Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import useStyles from "./styles.js";
import TeamCard from "./TeamCard/TeamCard";

export default function Teams() {
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={4}>
        {user.teams.length > 0 ? (
          user.teams.length !== 1 ? (
            user.teams.map((team) => (
              <Grid key={team} item xs={12} md={6} align="center">
                <TeamCard
                  align="center"
                  teamFromParent={null}
                  teamID={team}
                  startExpanded={false}
                />
              </Grid>
            ))
          ) : (
            <Grid key={user.teams[0]} item xs={12} align="center">
              <TeamCard
                align="center"
                teamFromParent={null}
                teamID={user.teams[0]}
                startExpanded={false}
              />
            </Grid>
          )
        ) : (
          <Grid item xs={12} align="center">
            <Box className={classes.emptyState}>
              <Typography variant="h4">
                Uh oh! Time to join another team!
              </Typography>
              <Typography variant="caption">Start in the League tab</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
