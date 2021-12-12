import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import ShieldIcon from "@mui/icons-material/Shield";

import TeamCard from "../../Teams/TeamCard/TeamCard";
import Modal from "../../Modal/Modal";
import useStyles from "./styles";
import { getGame, getTeam } from "../../../api";
import { useDispatch } from "react-redux";
import { addModal } from "../../../actions/modals";

export default function GameCard({ gameFromParent, gameID }) {
  const classes = useStyles();
  const [game, setGame] = useState(null);

  const dispatch = useDispatch();

  const openTeam = (teamID) => {
    const modal = {
      type: "Team",
      id: teamID,
    };
    dispatch(addModal(modal));
  };

  useEffect(() => {
    if (gameFromParent) {
      setGame(gameFromParent);
    } else {
      fetchGame(gameID).then((game) => {
        setGame(game.data);
        console.log(game.data);
      });
    }
  }, []);

  const fetchGame = async (id) => {
    const game = await getGame(id);
    return game;
  };

  if (!game) {
    return null;
  }
  return (
    <>
      <Card className={classes.card} raised>
        <Grid container>
          <Grid item xs={12} container className={classes.marginTop}>
            <Grid item xs={12} sm={5}>
              <Typography
                color="primary"
                variant="h4"
                className={classes.clickable}
                onClick={() => openTeam(game.homeTeam._id)}
              >
                {game.homeTeam.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography color="secondary" variant="h4">
                vs
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.centerThenLeft}>
              <Typography
                color="primary"
                variant="h4"
                className={classes.clickable}
                onClick={() => openTeam(game.opponent._id)}
              >
                {game.opponent.name}
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} container>
            <Grid item xs={6}>
              <Typography
                color="primary"
                variant="body1"
                align="left"
              >{`${game.time} ${game.date}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="primary" variant="body1" align="right">
                {game.location}
              </Typography>
            </Grid>
          </Grid> */}

          <Grid item xs={12} container className={classes.marginBottom}>
            <Grid item container direction="column" xs={12} sm={6} md={3}>
              <Container>
                <Typography
                  color="primary"
                  variant="body1"
                  className={classes.bold}
                >
                  Date
                </Typography>
                <Typography color="primary" variant="body1">
                  {game.date}
                </Typography>
              </Container>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6} md={3}>
              <Container>
                <Typography
                  color="primary"
                  variant="body1"
                  className={classes.bold}
                >
                  Time
                </Typography>
                <Typography color="primary" variant="body1">
                  {game.time}
                </Typography>
              </Container>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6} md={3}>
              <Container>
                <Typography
                  color="primary"
                  variant="body1"
                  className={classes.bold}
                >
                  Location
                </Typography>
                <Typography color="primary" variant="body1">
                  {game.location}
                </Typography>
              </Container>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6} md={3}>
              <Container>
                <Typography
                  color="primary"
                  variant="body1"
                  className={classes.bold}
                >
                  League
                </Typography>
                <Typography color="primary" variant="body1">
                  {game.league}
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
