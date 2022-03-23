import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import useFetchData from "../../../hooks/useFetchData.js";
import useStyles from "./styles.js";
import { addModal } from "../../../actions/modals.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LeagueTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [teams, setTeams] = useFetchData(null, user.teams, "teams");
  const [rows, setRows] = React.useState([]);

  function createData(team) {
    return {
      leagueName: team.leagueName,
      leagueID: team.league,
      teamName: team.name,
      teamID: team._id,
    };
  }

  React.useEffect(() => {
    if (!teams) return;
    for (let i = 0; i < teams.length; i++) {
      console.log(i);
      const row = createData(teams[i]);
      setRows((rows) => [...rows, row]);
    }
  }, [teams]);

  const callOpenLeague = (leagueID) => {
    console.log(leagueID);
    const modal = {
      type: "LeagueCard",
      id: leagueID,
    };
    dispatch(addModal(modal));
  };

  const callOpenTeam = (teamID) => {
    const modal = {
      type: "Team",
      id: teamID,
    };
    dispatch(addModal(modal));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow className={classes.header}>
            <StyledTableCell
              style={{ border: "none" }}
              className={classes.header}
            >
              <Typography variant="h6">My Leagues</Typography>
            </StyledTableCell>
            <StyledTableCell
              style={{ border: "none" }}
              className={classes.header}
            >
              &nbsp;
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.noLeagues}
              >
                <Typography variant="caption text">
                  No active leagues
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">&nbsp;</StyledTableCell>
            </StyledTableRow>
          ) : (
            <>
              {rows.map((row) => (
                <StyledTableRow key={row.leagueName}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.link}
                    onClick={() => callOpenLeague(row.leagueID)}
                  >
                    {row.leagueName}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    className={classes.link}
                    onClick={() => callOpenTeam(row.teamID)}
                  >
                    {row.teamName}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
