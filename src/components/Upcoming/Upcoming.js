import React from "react";
import { Box, Grid, Typography, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";

import useFetchData from "../../hooks/useFetchData";
import GameCard from "./GameCard/GameCard";
import useStyles from "./styles";

const gameUniqueSearchString = (game = {}) =>
  `${game.league}_${game.homeTeam?.name}_${game.awayTeam?.name}_${game.location}`.toUpperCase();

const Upcoming = () => {
  const user = useSelector((state) => state.user);
  const [games] = useFetchData(null, user.teams, "upcomingGames");
  const classes = useStyles();
  const [search, setSearch] = React.useState("");

  const filteredGames = React.useMemo(
    () =>
      games?.filter((g) =>
        gameUniqueSearchString(g).includes(search.toUpperCase())
      ),
    [games, search]
  );
  const handleSearchUpdate = (e) => setSearch(e.target.value);

  return (
    <>
      <Box className={classes.pageTopBar}>
        <TextField onChange={handleSearchUpdate} placeholder="Search..." />
      </Box>
      {games && (
        <Grid container>
          {filteredGames.map((game) => (
            <Grid key={game._id} item xs={12} align="center">
              <GameCard align="center" gameFromParent={game} />
            </Grid>
          ))}
        </Grid>
      )}
      {!games?.length && (
        <Box className={classes.emptyState}>
          <Typography variant="h4">
            Uh oh! Time to join another team!
          </Typography>
          <Typography variant="caption">Start in the Leagues tab</Typography>
        </Box>
      )}
    </>
  );
};

export default Upcoming;
