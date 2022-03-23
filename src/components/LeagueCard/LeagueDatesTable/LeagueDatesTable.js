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

import { getMonthDayString } from "../../../utils/datetime";
import useFetchData from "../../../hooks/useFetchData.js";
import useStyles from "./styles.js";
import { addModal } from "../../../actions/modals.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxHeight: "20px",
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

export default function LeagueDatesTable({ league }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow className={classes.header}>
            <StyledTableCell
              style={{ border: "none" }}
              className={classes.header}
            >
              <Typography variant="h6">Timeline</Typography>
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
          <StyledTableRow>
            <StyledTableCell
              component="th"
              scope="row"
              className={classes.noLeagues}
            >
              <Typography variant="caption text">{`Registration: ${getMonthDayString(
                league.registrationOpen
              )} - ${getMonthDayString(league.registrationClose)}`}</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">&nbsp;</StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell
              component="th"
              scope="row"
              className={classes.noLeagues}
            >
              <Typography variant="caption text">{`Season: ${getMonthDayString(
                league.seasonStart
              )} - ${getMonthDayString(league.seasonEnd)}`}</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">&nbsp;</StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell
              component="th"
              scope="row"
              className={classes.noLeagues}
            >
              <Typography variant="caption text">{`Playoffs: ${getMonthDayString(
                league.playoffStart
              )} - ${getMonthDayString(league.playoffEnd)}`}</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">&nbsp;</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
