import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./utilities/Navbar";
import Login from "./components/Login";
import Footer from "./utilities/Footer";
import AppointmentList from "./components/AppointmentList";
import ClinicList from "./components/ClinicList";
import AddClinic from "./components/AddClinic";
import DoctorList from "./components/DoctorList";
import AddDoctor from "./components/AddDoctor";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false,
    };
  }
  componentDidMount() {
    console.log("start");
    if (sessionStorage.getItem("isAuthorized") === "yes") {
      this.setState({ isAuthorized: true });
    }
  }
  render() {
    const isAllowed = sessionStorage.getItem("isAuthorized");
    console.log(`isAllowed: ${isAllowed}`);

    return (
      <div className='App'>
        <Router>
          <div>
            <Navbar />
            <Route path='/' />
            {/* {this.state.isAuthorized ? (
              <div></div>
            ) : ( */}
            <div>
              {/* <Route exact path='/' component={AdminSplash} /> */}
              <Route exact path='/Login' component={Login} />
              <Route
                exact
                path='/AppointmentList'
                component={AppointmentList}
              />
              <Route exact path='/ClinicList' component={ClinicList} />
              <Route exact path='/AddClinic' component={AddClinic} />
              <Route exact path='/DoctorList' component={DoctorList} />
              <Route exact path='/AddDoctor' component={AddDoctor} />
            </div>
            {/* )} */}
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
