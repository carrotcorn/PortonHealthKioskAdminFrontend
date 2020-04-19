import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./utilities/Navbar";
import Login from "./components/Login";
import Footer from "./utilities/Footer";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false,
    };
  }
  componentDidMount() {
    console.log("start");
    if (sessionStorage.getItem("isAuthorized") == "yes") {
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
            {this.state.isAuthorized ? (
              <div></div>
            ) : (
              <div>
                <Route exact path='/Login' component={Login} />
              </div>
            )}
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
