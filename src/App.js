import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Footer from "./utilities/Footer";
import AppointmentList from "./components/AppointmentList";
import ClinicList from "./components/ClinicList";
import Checkin from "./components/Checkin";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {
  getCurrentUser,
  registerUser,
  auth
} from "./utilities/API";


import Auth, { initialState } from './reducers/Auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default function App() {
  const AuthContext = React.createContext();
  const [state, dispatch] = React.useReducer(Auth, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await getCurrentUser();
      }
      catch(e) {
        console.log(e.message);
      }


      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: user });
    };

    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          await auth(data);
          const user = await getCurrentUser();
          dispatch({ type: 'SIGN_IN', token: user });
        }
        catch (error) {
          dispatch({ type: 'AUTH_ERR', errMsg: error.message });
        }
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        try {
          const user = await registerUser(data);
          dispatch({ type: 'SIGN_IN', token: user });
        }
        catch (error) {
          dispatch({ type: 'AUTH_ERR', errMsg: error.message });
        }
      },
    }),
    []
  );

  function SignIn() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    const classes = useStyles();

    function handleUsername(e) {
      setUsername(e.target.value);
    }
    function handlePassword(e) {
      setPassword(e.target.value);
    }
  
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form className={classes.form} onSubmit={()=>signIn({username, password})} noValidate>
            <TextField
              onChange={handleUsername}
              value={username}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              onChange={handlePassword}
              value={password}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );  }

  function SignUp() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signUp } = React.useContext(AuthContext);

    return (
      <div>signup</div>
    );
  }

  function SignOut() {
    const { signOut } = React.useContext(AuthContext);
    signOut();
    return (
        <Redirect to="/" />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
        <Router>
            {state.userToken == null ? (
              <>
              <Route path="/" component={SignIn} /> 
              </>
            ) : (
              <>
                <Link  to="/Logout">Logout</Link>
                <Route path="/Logout" component={SignOut} /><span>&nbsp;&nbsp;</span>
                {state.userToken.roles=="clinic" && <Link  to="/Checkin">Checkin Form</Link>}
                <Route path="/Checkin" component={Checkin} /> 
                {state.userToken.roles=="admin" && <ClinicList />}
                {state.userToken.roles=="clinic" && <AppointmentList />}                
              </>
            )}
        </Router>
        <Footer />
    </AuthContext.Provider>          
  );
}

