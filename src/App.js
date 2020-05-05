import React, { useState, useEffect } from "react";
import AppointmentList from "./components/AppointmentList";
import ClinicList from "./components/ClinicList";
import Checkin from "./components/Checkin";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Layout from "./Layout";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserContext } from "./Contexts";
import { getCurrentUser } from "./utilities/API";
import { CircularProgress, Typography } from "@material-ui/core";
import PrivateRoute from "./utilities/PrivateRoute";

function App(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);        
      } 
    };
    fetchUser();
  }, []);


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <UserContext.Provider value={{ user, setUser}}>
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/">
            <Typography>Home</Typography>
          </PrivateRoute>
          <PrivateRoute exact path="/appointments" roles={["clinic"]}>
            <AppointmentList />
          </PrivateRoute>
          <PrivateRoute exact path="/clinics" roles={["admin"]}>
            <ClinicList />
          </PrivateRoute>
          <PrivateRoute exact path="/checkin" roles={["clinic"]}>
            <Checkin />
          </PrivateRoute>
          <PrivateRoute path="*" component={PageNotFound} />
        </Switch>
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
