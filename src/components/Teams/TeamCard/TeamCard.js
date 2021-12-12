import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
  CardActions,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { getGame, getGames, getTeam } from "../../../api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useStyles from "./styles.js";
import basketball from "../../../images/basketball.jpg";
import GamesList from "./GamesList/GamesList";
import RosterList from "./RosterList/RosterList";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TeamCard({ teamFromParent, teamID, startExpanded }) {
  const [team, setTeam] = useState(null);

  const [expanded, setExpanded] = useState(startExpanded);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  useEffect(() => {
    if (teamFromParent) {
      setTeam(teamFromParent);
    } else {
      fetchTeam(teamID).then((team) => {
        setTeam(team.data);
      });
    }
  }, []);

  const fetchTeam = async (id) => {
    const team = await getTeam(id);
    return team;
  };

  if (!team) {
    return null;
  }
  return (
    <Card className={classes.card}>
      <CardHeader title={team.league} className={classes.header} />
      <Typography variant="subtitle1" className={classes.secondary}>
        {team.org.description}
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={basketball}
        alt="basketball"
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" className={classes.name}>
          {team.name} (1-1)
        </Typography>
        {!expanded ? (
          <>
            <Typography variant="subtitle1" align="left">
              Next Game: {team.games[0].time} {team.games[0].date}
            </Typography>
            <Typography variant="subtitle1" align="left">
              Location: {team.games[0].location}
            </Typography>{" "}
          </>
        ) : (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <GamesList games={team.games} />
            <RosterList roster={team.players} />
          </Collapse>
        )}
      </CardContent>
      {!startExpanded && (
        <ExpandMore
          expand={expanded}
          onClick={toggleDropdown}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      )}
    </Card>
  );
}
