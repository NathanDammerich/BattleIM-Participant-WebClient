import { Typography, Paper, Grid, Button } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addModal } from "../../actions/modals";
import { acceptInvite } from "../../actions/user";
import useStyles from "./styles";
import useFetchData from "../../hooks/useFetchData.js";
import { getTimeslotString } from "../../utils/datetime";

export default function InviteListItem({ teamID }) {
  const [team] = useFetchData(null, teamID, "team");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const classes = useStyles();

  const openQuiz = () => {
    const modal = {
      type: "Quiz",
      id: team.sport.quiz,
    };
    dispatch(addModal(modal));
  };

  const callAcceptInvite = () => {
    dispatch(acceptInvite(user._id, teamID));
  };

  const callOpenTeam = () => {
    const modal = {
      type: "Team",
      id: team._id,
    };
    dispatch(addModal(modal));
  };

  const callOpenLeague = () => {
    const modal = {
      type: "LeagueCard",
      id: team.league,
    };
    dispatch(addModal(modal));
  };

  if (!team) return null;
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.click}
            onClick={callOpenTeam}
          >
            {team.name}{" "}
            <span className={classes.primary}>from {team.captain.name}</span>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="body1"
            color="primary"
            className={classes.click}
            onClick={callOpenLeague}
          >
            {team.leagueName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="primary">
            {getTimeslotString(team.division.timeSlot)}
          </Typography>
        </Grid>
        {user.quizzesPassed.includes(team.sport.quiz) || !team.sport.quiz ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={callAcceptInvite}
            >
              Accept
            </Button>
          </Grid>
        ) : (
          <>
            <Grid item xs={6} align="right" className={classes.space}>
              <Button
                variant="contained"
                color="primary"
                onClick={openQuiz}
                className={classes.button}
              >
                Take Quiz
              </Button>
            </Grid>
            <Grid item xs={6} align="left" className={classes.space}>
              <Button
                variant="contained"
                color="primary"
                disabled
                className={classes.button}
              >
                Accept
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}
