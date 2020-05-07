import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import { 
  getClinics,
  getClinic,  
  getUser,
  changeUserStatus,
  getClinicByOwner
} from "../utilities/API";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClinicList() {
  const classes = useStyles();
  const [state, setState] = useState([]);  
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const clinicsData = await getClinics();
        var clinicStatusList = [];

        clinicsData.forEach( async (clinic) => {
            const user = await getUser(clinic.ownerId);
            clinic.disabled = user.disabled;
            setState({ ...state, [clinic._id]: clinic.disabled });            
        });

        setClinics(clinicsData);
      } catch (e) {
        console.log(e.message);
      }
    }
    
    fetchClinics();
  }, []); 

  const handleChange = async (event, disabled) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    try {
      const clinic = await getClinic(event.target.name);
      const user = await getUser(clinic.ownerId);
      changeUserStatus(user._id, !disabled);  
    }
    catch (e) {
      console.log(e.message);
    }
  };

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
              <TableCell>Enable/Disable</TableCell>
              <TableCell>Clinic Name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Street Address</TableCell>
              <TableCell align='right'>city</TableCell>
              <TableCell align='right'>Postal Code</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clinics &&
              clinics.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Switch
                        checked={state[row._id]||false} 
                        onChange={(event) => {
                          handleChange(event, row.disabled);
                        }}
                        name={row._id}
                      />
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.phone}</TableCell>
                    <TableCell align='right'>{row.address.street}</TableCell>
                    <TableCell align='right'>{row.address.city}</TableCell>
                    <TableCell align='right'>{row.address.postcode}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant='contained' color='primary' href='./addclinic'>
        Add Clinic
      </Button>
    </div>
  );
}