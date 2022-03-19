import { Box, TextField, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SportCard from "./SportCard/SportCard";
import { getOrg } from "../../api";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import LeagueTable from "./LeagueTable/LeagueTable";

import useStyles from "./styles.js";
=======
import useStyles from "./styles";

const sportUniqueSearchString = (sport = {}) => (`${sport.description}_${sport.leagues.map(l => l.description).join('_')}`.toUpperCase())
>>>>>>> main

export default function Leagues() {
  const classes = useStyles();
  const [org, setOrg] = useState(null);
<<<<<<< HEAD
  const user = useSelector((state) => state.user);
=======
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const filteredSports = React.useMemo(() => 
    org?.sports?.filter(s => sportUniqueSearchString(s).includes(search.toUpperCase())) ?? [],
  [org?.sports, search]);

  const handleSearchUpdate = (e) => setSearch(e.target.value);
>>>>>>> main

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
<<<<<<< HEAD
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
=======
    <>
      <Box className={classes.pageTopBar}>
        <TextField
          onChange={handleSearchUpdate}
          placeholder="Search..."
        />
      </Box>
      <Grid container spacing={3}>
        {org &&
          filteredSports.map((sport) => (
            <Grid item xs={12} sm={6} md={4} key={sport._id}>
>>>>>>> main
              <SportCard sport={sport} />
            </Grid>
          ))}
      </Grid>
<<<<<<< HEAD
    </Grid>
=======
    </>
>>>>>>> main
  );
}
