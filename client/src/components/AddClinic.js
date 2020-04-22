import React, { useState } from "react";
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

export default function Login() {
  const classes = useStyles();

  const [name, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState([]);
  const [ownerId, setOwnerId] = useState("");

  function handleClinicName(e) {
    setClinicName(e.target.value);
  }
  function handlePhone(e) {
    setPhone(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleAddress(e) {
    setAddress(e.target.value);
  }
  function handleOwnerId(e) {
    setOwnerId(e.target.value);
  }

  async function handleClinicCreate(e) {
    const BASE_URL = "http://localhost:7001";

    console.log(name);
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "EGG_SESS=DFXZpcM31bRAT37S2_AoV3e_rCJWbmBs42EshRLqz_HO84LJkupAfuZx03L0O3D-x9gHfxn3UplF38lobVXEn9VumLLoF9HFrygwTAWbk5P79ZigWk5ids1pRWM-QQQNvP5mTjYH1DXZ_8sEDDnyiN20qdPp_s51Z9tdU2MVJA0TD4K3ObejENNB9mUWMS6kkWHoxlbZVx57zX2q7crt1FYP3_XuHtrcPRpMtPNGepe_lklxZPZ-KPbxRmuzDDTV2Z1TwIhow48gkCg_tqNTa_RC55qRvtMRnt6GeUgGXU9vl-JflW-nmgNR1yrx_G4euxXwSWpS-K0vTEK_UqXGNgC7XQcPv8yGrjWbgZu9LgD5JiAqOmd4rObTewPMbgwf"
    );
    var raw = JSON.stringify({
      name,
      phone,
      email,
      address: { street, city, province, country, postcode },
      ownerId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(BASE_URL + "/clinic/clinic/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <div className={classes.root}>
      <div>
        <TextField
          onChange={handleClinicName}
          value={name}
          id='standard-full-width'
          label='Label'
          style={{ margin: 8 }}
          placeholder='Placeholder'
          helperText='Full width!'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={handlePhone}
          value={phone}
          label='None'
          id='margin-none'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
        />
        <TextField
          onChange={handleEmail}
          value={email}
          label='Dense'
          id='margin-dense'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          margin='dense'
        />
      </div>
      <div>
        <TextField
          onChange={handleAddress}
          value={address}
          id='filled-full-width'
          label='Label'
          style={{ margin: 8 }}
          placeholder='Placeholder'
          helperText='Full width!'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='filled'
        />
        <TextField
          label='None'
          id='filled-margin-none'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          variant='filled'
        />
        <TextField
          label='Dense'
          id='filled-margin-dense'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          margin='dense'
          variant='filled'
        />
        <TextField
          label='Normal'
          id='filled-margin-normal'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          margin='normal'
          variant='filled'
        />
      </div>
      <div>
        <TextField
          id='outlined-full-width'
          label='Label'
          style={{ margin: 8 }}
          placeholder='Placeholder'
          helperText='Full width!'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
        />
        <TextField
          label='None'
          id='outlined-margin-none'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          variant='outlined'
        />
        <TextField
          label='Dense'
          id='outlined-margin-dense'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          margin='dense'
          variant='outlined'
        />
        <TextField
          label='Normal'
          id='outlined-margin-normal'
          defaultValue='Default Value'
          className={classes.textField}
          helperText='Some important text'
          margin='normal'
          variant='outlined'
        />
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
