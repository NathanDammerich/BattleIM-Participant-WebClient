import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import useFetchData from "../../hooks/useFetchData";
import GameCard from "./GameCard/GameCard";

const Upcoming = () => {
  const user = useSelector((state) => state.user);
  const [games] = useFetchData(null, user.teams, "upcomingGames");

  return (
    <>
      {games && (
        <Grid container>
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
