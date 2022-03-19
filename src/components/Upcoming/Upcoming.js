import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import useFetchData from "../../hooks/useFetchData";
import GameCard from "./GameCard/GameCard";
import useStyles from "./styles";

const Upcoming = () => {
  const user = useSelector((state) => state.user);
  const [games] = useFetchData(null, user.teams, "upcomingGames");
  const classes = useStyles();

  return (
    <>
      {!!games?.length && (
        <Grid container>
          {games.map((game) => (
            <Grid key={game._id} item xs={12} align="center">
              <GameCard align="center" gameFromParent={game} />
            </Grid>
          ))}
        </Grid>
      )}
      {!games?.length && (
        <Box className={classes.emptyState}>
          <Typography variant="h4" >
            Uh oh! Time to join another team!
          </Typography>
          <Typography variant="caption">
            Start in the League tab
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Upcoming;
