import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { useDispatch } from "react-redux";

import useStyles from "./styles.js";
import { addModal } from "../../../../actions/modals.js";

export default function GamesList({ games, teamID }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openGame = (gameID) => {
    const modal = {
      type: "Game",
      id: gameID,
    };
    dispatch(addModal(modal));
  };

  for (let game of games) {
    const homeIsWinner = game?.results && game?.homeTeam?._id === game?.results?.winningTeam;
    if (game.homeTeam._id === teamID) {
      game.opponent = game.awayTeam;
      game.opponentScore = homeIsWinner ? game.results?.losingScore : game.results?.winningScore;
      game.userScore = game.results?.homeScore;
    } else {
      game.opponent = game.homeTeam;
      game.opponentScore = !homeIsWinner ? game.results?.losingScore : game.results?.winningScore;
      game.userScore = game.results?.awayScore;
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} align="left">
          <Typography variant="h6">Games</Typography>
          {games.map((game) => (
            <Grid
              item
              container
              className={
                !game.results
                  ? classes.upcoming
                  : teamID === game.results.winningTeam
                  ? classes.win
                  : classes.loss
              }
              xs={12}
              key={game._id}
              onClick={() => openGame(game._id)}
            >
              <Grid item xs={4}>
                <Typography variant="body2">
                  vs{" "}
                  <span className={classes.underline}>
                    {game.opponent.name}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">
                  {game.time} {game.day}
                </Typography>
              </Grid>
              {game.results ? (
                <Grid item xs={4} align="right">
                  <Typography variant="body2">
                    {game.results.winningTeam === teamID ? "W" : "L"} (
                    {game.userScore}-{game.opponentScore})
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={4} align="right">
                  <Typography variant="body2">{game.location}</Typography>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
