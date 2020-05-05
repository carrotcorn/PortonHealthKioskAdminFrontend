import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { differenceInYears } from "date-fns";
import { 
  getClinicByOwner,
  getAppointmentsByClinic
} from "../utilities/API";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AppointmentList() {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const { user }  = useContext(UserContext);
  const { register, handleSubmit } = useForm();

  async function fetchAppointments() {
    try {
      const clinic = await getClinicByOwner(user._id);
      const appointmentsData = await getAppointmentsByClinic(clinic._id);
      console.log(appointmentsData);
      setAppointments(appointmentsData);
    }
    catch(e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []); 

  const filterAppointments = (appointmentTime) => {
    const MINUTES = 60000;
    const at = new Date(appointmentTime);
    const rangeLow = new Date(at.getTime()-15*MINUTES);
    let newAppointments = appointments.filter(
      appointment => new Date(appointment.time.start) > rangeLow
    );
    const rangeHigh = new Date(at.getTime()+15*MINUTES);
    newAppointments = newAppointments.filter(
      appointment => new Date(appointment.time.start) < rangeHigh
    );
    console.log(newAppointments);
    setAppointments(newAppointments);
  };

  const onSubmit = async ({ appointmentTime }) => {
    filterAppointments(appointmentTime);
  };

  const sortByTime = () => {
    const newAppointments = []
    .concat(appointments)
    .sort((a,b)=>{
      var timeA = a.time.start; 
      var timeB = b.time.start; 
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
    
      // names must be equal
      return 0;        
    });

    setAppointments(newAppointments);
  };

  const sortByLastName = () => {
    const newAppointments = []
      .concat(appointments)
      .sort((a,b)=>{
        var nameA = a.patientId.familyName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.patientId.familyName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;        
      });

    setAppointments(newAppointments);
  };

  return (
    <>
    <form 
      className={classes.container} 
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <TextField
        inputRef={register({ required: true })}      
        id="appointmentTime"
        name="appointmentTime"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2020-05-04T22:45"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Search
      </Button>

      <span>&nbsp;</span>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={()=>fetchAppointments()}
      >
        Reset
      </Button>

    </form>
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell><a href="#" onClick={()=>sortByTime()}>Start Time</a></TableCell>
            <TableCell align='right'>End time</TableCell>
            <TableCell align='right'><a href="#" onClick={()=>sortByLastName()}>Lastname</a></TableCell>
            <TableCell align='right'>Firstname</TableCell>
            <TableCell align='right'>Age</TableCell>
            <TableCell align='right'>Phone No.</TableCell>
            <TableCell align='right'>Checkin Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments &&
            appointments.map((row) => {
              return (
                //this return in necessary  TO ADD INFORMATION IN A CHILD JSON, DO ROW."OBJECT"."CHILDOBJECT"
                <TableRow key={row._id}>
                  <TableCell component='th' scope='row'>
                    {format(new Date(row.time.start), "P p")}
                  </TableCell>
                  <TableCell align='right'>
                    {format(new Date(row.time.end), "p")}
                  </TableCell>
                  <TableCell align='right'>
                    {row.patientId.familyName}
                  </TableCell>
                  <TableCell align='right'>{row.patientId.givenName}</TableCell>
                  <TableCell align='right'>
                    {differenceInYears(
                      new Date(),
                      new Date(row.patientId.birthday)
                    )}
                  </TableCell>
                  <TableCell align='right'>{row.patientId.phone}</TableCell>
                  <TableCell align='right'>
                    {row.checkedIn ? "Checked-In" : "Not Checked-In"}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
