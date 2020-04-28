import React, { useState, useEffect } from "react";
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

export default function AppointmentList() {
  const classes = useStyles();

  const [listAppointment, setListAppointments] = useState([]);

  async function getAppointments() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    myHeaders.append(
      "Cookie",
      "EGG_SESS=DFXZpcM31bRAT37S2_AoV3e_rCJWbmBs42EshRLqz_HO84LJkupAfuZx03L0O3D-x9gHfxn3UplF38lobVXEn9VumLLoF9HFrygwTAWbk5P79ZigWk5ids1pRWM-QQQNvP5mTjYH1DXZ_8sEDDnyiN20qdPp_s51Z9tdU2MVJA0TD4K3ObejENNB9mUWMS6kkWHoxlbZVx57zX2q7crt1FYP3_XuHtrcPRpMtPNGepe_lklxZPZ-KPbxRmuzDDTV2Z1TwIhow48gkCg_tqNTa_RC55qRvtMRnt6GeUgGXU9vl-JflW-nmgNR1yrx_G4euxXwSWpS-K0vTEK_UqXGNgC7XQcPv8yGrjWbgZu9LgD5JiAqOmd4rObTewPMbgwf"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log("REQUEST:", requestOptions);
    fetch("http://localhost:7001/public/appointment/find", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const theAppointments = JSON.parse(result);
        console.log("cool variable", theAppointments);
        // console.log(typeof theAppointments);
        if (theAppointments.success) {
          setListAppointments(theAppointments.result); //this allows me to not throw an error when running
          console.log(listAppointment);
        }
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align='right'>familyName</TableCell>
            <TableCell align='right'>givenName</TableCell>
            <TableCell align='right'>age</TableCell>
            <TableCell align='right'>phone</TableCell>
            <TableCell align='right'>checkedIn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAppointment &&
            listAppointment.map((row) => {
              return (
                <TableRow key={listAppointment.time}>
                  <TableCell component='th' scope='row'>
                    {listAppointment.time}
                  </TableCell>
                  <TableCell align='right'>
                    {listAppointment.familyName}
                  </TableCell>
                  <TableCell align='right'>
                    {listAppointment.givenName}
                  </TableCell>
                  <TableCell align='right'>{listAppointment.age}</TableCell>
                  <TableCell align='right'>{listAppointment.phone}</TableCell>
                  <TableCell align='right'>
                    {listAppointment.checkedIn}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
