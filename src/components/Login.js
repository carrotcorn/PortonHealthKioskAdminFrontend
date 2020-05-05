import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { login, getCurrentUser } from "../utilities/API";
import { UserContext } from "../Contexts";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async ({ username, password }, setUser) => {
    try {
      const result = await login(username, password);
      if (result.success) {
        const response = await getCurrentUser();
        setUser(response.result);
        history.push("/");
      } else {
        window.alert(result.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Consumer>
      {({ user, setUser }) => (
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Clinic Credentials
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit((data) => onSubmit(data, setUser))}
          >
            <TextField
              inputRef={register({ required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={
                errors.username &&
                errors.username.type === "required" &&
                "Required"
              }
            />
            <TextField
              inputRef={register({ required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={
                errors.password &&
                errors.password.type === "required" &&
                "Required"
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      )}
    </UserContext.Consumer>
  );
}
