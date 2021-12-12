import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getTeam } from "../../api";
import useFetchData from "../../hooks/useFetchData";

import TeamCard from "./TeamCard/TeamCard";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeam("617dd51c0519805a727e331b").then((team) => {
      setTeams([...teams, team.data]);
    });
  }, []);

  const fetchTeam = async (id) => {
    const team = await getTeam(id);
    return team;
  };

  return (
    <Grid container>
      <Grid item xs={12} align="center">
        <Typography variant="h4">Your Teams</Typography>
      </Grid>
      {teams ? (
        teams.map((team) => (
          <Grid key={team._id} item xs={12} align="center">
            <TeamCard
              align="center"
              teamFromParent={team}
              startExpanded={false}
            />
          </Grid>
        ))
      ) : (
        <h1>Waiting on teams</h1>
      )}
    </Grid>
  );
}
