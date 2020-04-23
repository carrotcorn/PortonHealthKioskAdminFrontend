import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
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


    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "EGG_SESS=DFXZpcM31bRAT37S2_AoV3e_rCJWbmBs42EshRLqz_HO84LJkupAfuZx03L0O3D-x9gHfxn3UplF38lobVXEn9VumLLoF9HFrygwTAWbk5P79ZigWk5ids1pRWM-QQQNvP5mTjYH1DXZ_8sEDDnyiN20qdPp_s51Z9tdU2MVJA0TD4K3ObejENNB9mUWMS6kkWHoxlbZVx57zX2q7crt1FYP3_XuHtrcPRpMtPNGepe_lklxZPZ-KPbxRmuzDDTV2Z1TwIhow48gkCg_tqNTa_RC55qRvtMRnt6GeUgGXU9vl-JflW-nmgNR1yrx_G4euxXwSWpS-K0vTEK_UqXGNgC7XQcPv8yGrjWbgZu9LgD5JiAqOmd4rObTewPMbgwf"
    );
    var raw = JSON.stringify({
      doctorname,
      phone,
      email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(BASE_URL + "/clinic/createdoctor", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    createDoctor();
  });

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.form} onSubmit={createDoctor} noValidate>
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
            name='address'
            label='Address'
            type='address'
            id='address'
            autoComplete='current-address'
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
            onSubmit={createDoctor}
          >
            Create Doctor
          </Button>
        </form>
      </div>
    </div>
  );
  //   return (
  //     <Container component='main' maxWidth='xs'>
  //       <CssBaseline />
  //       <div className={classes.paper}>
  //         <Avatar className={classes.avatar}>
  //           <LockOutlinedIcon />
  //         </Avatar>
  //         <Typography component='h1' variant='h5'>
  //           Login
  //         </Typography>
  //         <form className={classes.form} onSubmit={handleLogin} noValidate>
  //           <TextField
  //             onChange={handleUsername}
  //             value={username}
  //             variant='outlined'
  //             margin='normal'
  //             required
  //             fullWidth
  //             id='username'
  //             label='Username'
  //             name='username'
  //             autoComplete='username'
  //             autoFocus
  //           />
  //           <TextField
  //             onChange={handlePassword}
  //             value={password}
  //             variant='outlined'
  //             margin='normal'
  //             required
  //             fullWidth
  //             name='password'
  //             label='Password'
  //             type='password'
  //             id='password'
  //             autoComplete='current-password'
  //           />
  //           <Button
  //             type='submit'
  //             fullWidth
  //             variant='contained'
  //             color='primary'
  //             className={classes.submit}
  //             onSubmit={handleLogin}
  //           >
  //             Sign In
  //           </Button>
  //         </form>
  //       </div>
  //     </Container>
  //   );
}
