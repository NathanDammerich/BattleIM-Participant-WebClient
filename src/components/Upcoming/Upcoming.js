import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import GameCard from "./GameCard/GameCard";
import useStyles from "./styles";

const Upcoming = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const games = [];
  for (let team of user.teams) {
    for (let game of team.games) {
      let updatedGame = game;
      updatedGame.homeTeam = team;
      games.push(updatedGame);
    }
  }

  return (
    <>
      {user && (
        <Grid container>
          <Grid item xs={12} align="center">
            <Typography variant="h4">Upcoming Games</Typography>
          </Grid>
          {games.map((game) => (
            <Grid key={game._id} item xs={12} align="center">
              <GameCard align="center" gameFromParent={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Upcoming;
