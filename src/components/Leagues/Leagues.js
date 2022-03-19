import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SportCard from "./SportCard/SportCard";
import { getOrg } from "../../api";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import LeagueTable from "./LeagueTable/LeagueTable";

import useStyles from "./styles.js";

export default function Leagues() {
  const classes = useStyles();
  const [org, setOrg] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchOrg(user.orgs[0]).then((org) => {
      setOrg(org.data);
    });
  }, []);

  const fetchOrg = async (id) => {
    const org = await getOrg(id);
    return org;
  };

  return (
    <Grid container spacing={3} className={classes.topSpace}>
      <Grid container item xs={12} sm={6}>
        {/* <Grid item xs={12} align="center">
          <Typography variant="h4" align="center">
            My Leagues
          </Typography>
        </Grid> */}
        <Grid item xs={12} align="center">
          <LeagueTable />
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" align="center">
            Join League
          </Typography>
        </Grid>
        {org &&
          org.sports.map((sport) => (
            <Grid item xs={12} sm={12} md={6} key={sport._id}>
              <SportCard sport={sport} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
