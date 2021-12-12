import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useSessionModal from "../../../../hooks/useSessionModal.js";
import { useDispatch } from "react-redux";

import Modal from "../../../Modal/Modal.js";
import GameCard from "../../../Upcoming/GameCard/GameCard.js";
import useStyles from "./styles.js";
import { addModal } from "../../../../actions/modals.js";

export default function GamesList({ games }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openGame = (gameID) => {
    const modal = {
      type: "Game",
      id: gameID,
    };
    dispatch(addModal(modal));
  };

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
                  : game.results.homeScore > game.results.awayScore
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
                  {game.time} {game.date}
                </Typography>
              </Grid>
              {game.results ? (
                <Grid item xs={4} align="right">
                  <Typography variant="body2">
                    {game.results.homeScore > game.results.awayScore
                      ? "W"
                      : "L"}{" "}
                    ({game.results.homeScore}-{game.results.awayScore})
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
