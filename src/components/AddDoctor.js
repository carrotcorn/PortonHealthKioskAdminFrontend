/* global Backend */
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export default function AddDoctor() {
  const classes = useStyles();

  const [doctorname, setDoctorname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function handleDoctorname(e) {
    setDoctorname(e.target.value);
  }
  function handlePhone(e) {
    setPhone(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  async function createDoctor(e) {
    const BASE_URL = "http://localhost:7001";

    const backend = new Backend(BASE_URL);
    try {
      const result = await backend.post("/clinic/doctor/create", {
        doctorname,
        phone,
        email,
      });
      if (result.success) {
        console.log(result);
        window.sessionStorage.setItem("isAuthorized", "yes");
        window.location.href = "/";
      } else {
        window.alert(result.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    createDoctor();
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <Typography component='h1' variant='h5'>
          Add Doctor
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={handleDoctorname}
            value={doctorname}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='doctorName'
            label='Name of Doctor'
            name='doctorName'
            autoComplete='doctorName'
            autoFocus
          />
          <TextField
            onChange={handlePhone}
            value={phone}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='phone'
            label='Phone Number'
            type='phone'
            id='phone'
            autoComplete='current-phone'
          />
          <TextField
            onChange={handleEmail}
            value={email}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='email'
            label='Email'
            type='email'
            id='email'
            autoComplete='current-email'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create Doctor
          </Button>
        </form>
      </div>
    </div>
  );
}
// const BASE_URL = "http://localhost:7001";

// // e.preventDefault();
// var myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append(
//   "Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, Content-Type, Accept"
// );
// var raw = JSON.stringify({
//   doctorname,
//   phone,
//   email,
//   key: "d88b8076-3c3f-41cf-9fc3-ca3e923c009a",
// });
// console.log("p00");
// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };
// fetch(BASE_URL + "/clinic/createdoctor", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
