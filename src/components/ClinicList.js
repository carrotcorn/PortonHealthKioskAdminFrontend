/* global Backend */
import React, { useState, useEffect, setState } from "react";
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
import API from '../API/Backend';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClinicList() {
  const classes = useStyles();

  const [listClinic, setClinic] = useState([]);
  const [state, setState] = useState({
    // toggle: false,
  });

  async function getClinics() {
    const BASE_URL = "http://localhost:7001";

    const backend = new Backend(BASE_URL);
    try {
      const result = await backend.get("/public/clinic/find");
      if (result.success) {
        setClinic(result);
        console.log("Clinics:", result);
      } else {
        window.alert(result.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const disableClinic = (clinicId, event) => {
    setState({
      ...state,
      // all activated buttons within object, "..." keeps the previous states within the object,
      // so it doesnt rewrite the object evert time
      // [clinicId]: event.target.value,
      [clinicId]: event.target.checked,
    });
    console.log("P00p");
  };

  console.log(state);

  function disableClinic() {}

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
            {listClinic.result &&
              listClinic.result.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell padding='switch'>
                      <Switch
                        checked={state[row._id]} //[] allows me to access the object dynamically
                        onChange={(event) => {
                          disableClinic(row._id, event);
                        }}
                        value={row._id}
                        name='toggle'
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

