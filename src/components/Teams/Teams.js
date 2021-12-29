import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getTeam } from "../../api";
import { useSelector } from "react-redux";
import useFetchData from "../../hooks/useFetchData";

import TeamCard from "./TeamCard/TeamCard";

export default function Teams() {
  const user = useSelector((state) => state.user);

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
          <h1>Waiting on teams</h1>
        )}
      </Grid>
    </>
  );
}
