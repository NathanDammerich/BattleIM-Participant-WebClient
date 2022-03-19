import { Box, TextField, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SportCard from "./SportCard/SportCard";
import { getOrg } from "../../api";
import useStyles from "./styles";

const sportUniqueSearchString = (sport = {}) => (`${sport.description}_${sport.leagues.map(l => l.description).join('_')}`.toUpperCase())

export default function Leagues() {
  const [org, setOrg] = useState(null);
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const filteredSports = React.useMemo(() => 
    org?.sports?.filter(s => sportUniqueSearchString(s).includes(search.toUpperCase())) ?? [],
  [org?.sports, search]);

  const handleSearchUpdate = (e) => setSearch(e.target.value);

  useEffect(() => {
    fetchOrg("617f480dfec82da4aec5705c").then((org) => {
      setOrg(org.data);
    });
  }, []);

  const fetchOrg = async (id) => {
    const org = await getOrg(id);
    return org;
  };

  return (
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
              <SportCard sport={sport} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
