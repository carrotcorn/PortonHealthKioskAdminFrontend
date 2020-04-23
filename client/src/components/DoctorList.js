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
    //  myHeaders.append(
    //    "Cookie",
    //    "EGG_SESS=DFXZpcM31bRAT37S2_AoV3e_rCJWbmBs42EshRLqz_HO84LJkupAfuZx03L0O3D-x9gHfxn3UplF38lobVXEn9VumLLoF9HFrygwTAWbk5P79ZigWk5ids1pRWM-QQQNvP5mTjYH1DXZ_8sEDDnyiN20qdPp_s51Z9tdU2MVJA0TD4K3ObejENNB9mUWMS6kkWHoxlbZVx57zX2q7crt1FYP3_XuHtrcPRpMtPNGepe_lklxZPZ-KPbxRmuzDDTV2Z1TwIhow48gkCg_tqNTa_RC55qRvtMRnt6GeUgGXU9vl-JflW-nmgNR1yrx_G4euxXwSWpS-K0vTEK_UqXGNgC7XQcPv8yGrjWbgZu9LgD5JiAqOmd4rObTewPMbgwf"
    //  );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };
    fetch(BASE_URL + "/clinic/getdoctors", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListDoctors(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return listDoctors.map((row) => {
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
              {/* listDoctors.map((row) => ( */}
              <TableRow key={row.doctorname}>
                <TableCell component='th' scope='row'>
                  {row.doctorname}
                </TableCell>
                <TableCell align='right'>{row.phone}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
              </TableRow>
              {/* )) */}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant='contained' color='primary' href='./AddDoctor.js'>
          Add Doctor
        </Button>
      </div>
    );
  });
}
