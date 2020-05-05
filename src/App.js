import React, { useState, useEffect } from "react";
import AppointmentList from "./components/AppointmentList";
import ClinicList from "./components/ClinicList";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Layout from "./Layout";
import { Route, Switch } from "react-router-dom";
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
        const response = await getCurrentUser();
        if (response.success) {
          console.log(response.result);
          setUser(response.result);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/">
            <Typography>Home</Typography>
          </PrivateRoute>
          <PrivateRoute exact path="/appointments">
            <AppointmentList />
          </PrivateRoute>
          <PrivateRoute exact path="/clinics">
            <ClinicList />
          </PrivateRoute>
          <PrivateRoute path="*" component={PageNotFound} />
          {/* <Route exact path="/AddClinic" component={AddClinic} /> */}
          {/* <Route exact path="/DoctorList" component={DoctorList} /> */}
          {/* <Route exact path="/AddDoctor" component={AddDoctor} /> */}
        </Switch>
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
