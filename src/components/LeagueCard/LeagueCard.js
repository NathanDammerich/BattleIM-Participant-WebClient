import { Card, Typography, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

import { addModal } from "../../actions/modals";
import useStyles from "./styles.js";
import useFetchData from "../../hooks/useFetchData";
import { getMonthDayString } from "../../utils/datetime";
import StandingsTable from "./StandingsTable/StandingsTable";
import LeagueDatesTable from "./LeagueDatesTable/LeagueDatesTable";

export default function LeagueCard({ leagueFromParent, leagueID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [league] = useFetchData(leagueFromParent, leagueID, "league");

  const callOpenTeam = (teamID) => {
    const modal = {
      type: "Team",
      id: teamID,
    };
    dispatch(addModal(modal));
  };

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <Grid container spacing={1} className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" align="center">
                {`${league.description} ${league.sport.description}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <a
                href={league.sport.rules}
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                <Typography variant="body1" color="primary">
                  Rules
                </Typography>
              </a>
            </Grid>
            <Grid spacing={3} container item xs={12}>
              <Grid item xs={12} sm={6}>
                <LeagueDatesTable league={league} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StandingsTable teams={league?.teams} />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
