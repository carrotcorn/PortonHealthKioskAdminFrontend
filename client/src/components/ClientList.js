import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(time, name, doctor, status) {
  return { time, name, doctor, status };
}

const rows = [
  createData("11:30am", "Judy Dentch", "Dr.Baker"),
  createData("12:00pm", "Mike Judge", "Dr.Baker"),
  createData("12:30pm", "George Costanza", "Dr.Baker"),
  createData("12:30pm", "Cosmo Kramer", "Dr.Oz"),
  createData("1:00pm", "Mr.Pitt", "Dr.Oz"),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Doctor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.time}>
              <TableCell component='th' scope='row'>
                {row.time}
              </TableCell>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align='right'>{row.doctor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
