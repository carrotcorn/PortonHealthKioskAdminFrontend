import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, address) {
  return { name, address };
}

const rows = [
  createData("Saint Stephens Family Clinic", "142 Lancaster Ave."),
  createData("Payton Manning Memorial", "888 Football Hwy."),
  createData("Mike's Dental", "9347 Lotion Rd."),
  createData("Mickey's Physio", "666 Hell Crst."),
  createData("Witch Doctor's Chiropractic", "$$$ Money Ave."),
];

export default function ClinicList() {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Clinic Name</TableCell>
              <TableCell align='right'>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button variant='contained' color='primary' href='./AddClinic.js'>
        Add Clinic
      </Button> */}
    </div>
  );
}
