import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import API from '../API/Backend';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AppointmentList() {
  const classes = useStyles();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getAppointments() {
      try {
        var response = await API.get('/user/current');
        if (response.success) { 
          const user = response.result;
          console.log(user);
          response = await API.get('/clinic/find', { ownerId: user._id});
          if (response.success) {
            const clinic = response.result;
            console.log(clinic);
            response = await API.get('/appointment/find', { clinicId: clinic._id});
            setAppointments(response.result);
          }
        }
        else {
          console.log(response.status);
        }
      }
      catch (error) {
          console.log(error.response);
      }
    }
  
    getAppointments();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Start Time</TableCell>
            <TableCell align='right'>Checked-In</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments &&
            appointments.map((row) => {
              return (
                //this return in necessary
                <TableRow key={row.startTime}>
                  <TableCell >{row.time.start}</TableCell>
                  <TableCell align='right'>{row.checkedIn ? "Checked-In" : "Not Checked-In"}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
