import { Box, TextField, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SportCard from "./SportCard/SportCard";
import { getOrg } from "../../api";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import LeagueTable from "./LeagueTable/LeagueTable";
import JoinLeagueTable from "./JoinLeagueTable/JoinLeagueTable";

import useStyles from "./styles.js";

const sportUniqueSearchString = (sport = {}) =>
  `${sport.description}_${sport.leagues
    .map((l) => l.description)
    .join("_")}`.toUpperCase();

export default function Leagues() {
  const classes = useStyles();
  const [org, setOrg] = useState(null);
  const user = useSelector((state) => state.user);
  const [search, setSearch] = React.useState("");
  const filteredSports = React.useMemo(
    () =>
      org?.sports?.filter((s) =>
        sportUniqueSearchString(s).includes(search.toUpperCase())
      ) ?? [],
    [org?.sports, search]
  );

  const handleSearchUpdate = (e) => setSearch(e.target.value);

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
    <Grid container spacing={6} className={classes.topSpace}>
      <Grid container item xs={12} sm={6}>
        <Grid item xs={12}>
          <LeagueTable />
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <JoinLeagueTable />
      </Grid>
    </Grid>
  );
}
