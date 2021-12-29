import { Card, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { removePlayer } from "../../actions/teams";

export default function EditRoster({ team }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [players, setPlayers] = useState(team.players);

  const callRemovePlayer = (player) => {
    setPlayers(
      players.filter(
        (playerFromTeam) => String(playerFromTeam._id) !== String(player._id)
      )
    );
    console.log(players);
    //dispatch(removePlayer(team._id, player._id));
  };

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            {team.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Roster
          </Typography>
        </Grid>
        {players.map((player) => (
          <>
            <Grid item xs={6}>
              <Typography variant="body1" align="left">
                {player.name}
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <CancelOutlinedIcon
                className={classes.icon}
                onClick={() => callRemovePlayer(player)}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </Card>
  );
}
