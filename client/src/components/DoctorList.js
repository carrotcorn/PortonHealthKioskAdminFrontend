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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DoctorList() {
  const classes = useStyles();

  const [listDoctors, setListDoctors] = useState([]);

  async function getDoctors() {
    const BASE_URL = "http://localhost:7001";

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
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
    fetch(BASE_URL + "/clinic/getdoctors", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const coolDoctor = JSON.parse(result);
        console.log("cool variable", coolDoctor);
        console.log(typeof coolDoctor);
        if (coolDoctor.success) {
          setListDoctors(coolDoctor.result); //this allows me to not throw an error when running
        }
        // setListDoctors(coolDoctor.result); //to properly JSON.parse, need to set var name to the result via having "variableName.result" set to the initial state
        console.log(listDoctors);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getDoctors();
  }, []);

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
              <TableCell>Doctor Name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listDoctors &&
              listDoctors.map((row) => {
                return (
                  <TableRow key={row.doctorname}>
                    <TableCell component='th' scope='row'>
                      {row.doctorname}
                    </TableCell>
                    <TableCell align='right'>{row.phone}</TableCell>
                    <TableCell align='right'>{row.email}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant='contained' color='primary' href='./adddoctor'>
        Add Doctor
      </Button>
    </div>
  );
}
