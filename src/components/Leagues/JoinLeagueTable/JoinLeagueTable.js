import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import useFetchData from "../../../hooks/useFetchData.js";
import useStyles from "./styles.js";
import { addModal } from "../../../actions/modals.js";
import { API } from "../../../api/index.js";

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

export default function JoinLeagueTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [org, setOrg] = useFetchData(null, user.orgs[0], "org");
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (!org) return;
    for (let sport of org.sports) {
      const sportRow = {
        sportRow: true,
        name: sport.description,
        id: sport._id,
      };
      setRows((rows) => [...rows, sportRow]);
      let hasOpenLeagues = false;
      for (let league of sport.leagues) {
        const open = new Date(league.registrationOpen);
        const close = new Date(league.registrationClose);
        const now = new Date();
        if (now > open && now < close) {
          hasOpenLeagues = true;
          const leagueRow = {
            sportRow: false,
            name: league.description,
            id: league._id,
          };
          setRows((rows) => [...rows, leagueRow]);
        }
      }
      if (!hasOpenLeagues) {
        setRows((rows) => rows.filter((row) => row !== sportRow));
      }
    }
  }, [org]);

  const callOpenLeague = (leagueID) => {
    console.log(leagueID);
    const modal = {
      type: "League",
      id: leagueID,
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
              <Typography variant="h6">Registration</Typography>
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
              <StyledTableCell component="th" scope="row">
                <Typography
                  variant="caption text"
                  className={classes.noLeagues}
                >
                  No leagues open for registration
                </Typography>
              </StyledTableCell>
              <StyledTableCell
                component="th"
                scope="row"
                className={classes.leagueRow}
                align="right"
              >
                &nbsp;
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            <>
              {rows.map((row) => (
                <>
                  {row.sportRow ? (
                    <TableRow key={row.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.sportRow}
                        style={{ border: "none" }}
                      >
                        <Typography
                          variant="body2"
                          className={classes.sportName}
                        >
                          {row.name}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.sportRow}
                        style={{ border: "none" }}
                      >
                        <Typography className={classes.sportName}>
                          &nbsp;
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.leagueRow}
                      >
                        <Typography
                          variant="caption text"
                          className={classes.leagueName}
                        >
                          {row.name}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.leagueRow}
                        align="right"
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          style={{
                            color: "#d90429",
                            borderColor: "#d90429",
                            fontSize: "0.65rem",
                          }}
                          className={classes.smallButton}
                          onClick={() => callOpenLeague(row.id)}
                        >
                          Join
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
