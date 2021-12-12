import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import useUserInfo from "../../../hooks/useUserInfo.js";
import useFetchData from "../../../hooks/useFetchData.js";
import { Button, Card, Typography, Grid } from "@material-ui/core";
import { addModal } from "../../../actions/modals.js";
import useStyles from "./styles.js";

export default function League({ leagueFromParent, leagueID }) {
  const [league, setLeague] = useFetchData(
    leagueFromParent,
    leagueID,
    "league"
  );

  const user = useUserInfo();
  const dispatch = useDispatch();

  const attemptMakeTeam = (divisionID) => {
    if (user.sportQuizPassed.includes(league.sport._id)) {
      console.log("Quiz already passed");
      makeTeam(divisionID);
    } else {
      console.log("Quiz not passed");
      goToQuiz(league.sport.quiz);
    }
  };

  const goToQuiz = (quizID) => {
    const modal = {
      type: "Quiz",
      id: quizID,
    };
    dispatch(addModal(modal));
  };

  const makeTeam = () => {};

  const classes = useStyles();

  return (
    <>
      {league && (
        <Card raised className={classes.card}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" align="center">
                {`${league.description} ${league.sport.description}`}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <form action="https://www.ducksters.com/sports/basketballrules.php">
                <Button type="submit" variant="text">
                  <Typography variant="body1" color="primary">
                    Rules
                  </Typography>
                </Button>
              </form>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                align="left"
              >{`Registration: ${league.registrationOpen}-${league.registrationClose}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                align="left"
              >{`Season: ${league.seasonStart}-${league.seasonEnd}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                align="left"
              >{`Playoffs: ${league.playoffStart}-${league.playoffEnd}`}</Typography>
            </Grid>

            <Grid item xs={12} align="center">
              <Typography
                variant="h6"
                color="secondary"
                className={classes.divisionHeading}
              >
                Divisions
              </Typography>
            </Grid>
            {league.divisions.map((division) => (
              <Grid
                item
                xs={12}
                key={division._id}
                container
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Typography variant="body1" color="primary" align="left">
                    {division.timeSlot}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {league.status === "Full" ? (
                    <Typography variant="body1" color="secondary">
                      FULL
                    </Typography>
                  ) : (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => attemptMakeTeam(division._id)}
                    >
                      Create Team
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </>
  );
}
