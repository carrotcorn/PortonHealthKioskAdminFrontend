import React, { Component } from "react";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false,
    };
  }
  componentWillMount() {
    if (sessionStorage.getItem("isAuthorized") == "yes") {
      this.setState({ isAuthorized: true });
    }
  }
  render() {
    return (
      <header class='header'>
        <a href='/' className='logo'>
          Porton
        </a>
        <input class='menu-btn' type='checkbox' id='menu-btn' />
        <label class='menu-icon' for='menu-btn'>
          <span class='navicon' />
        </label>
        <ul class='menu'>
          <li>
            <a href='/'>Home</a>
          </li>
          {this.state.isAuthorized ? (
            <ul></ul>
          ) : (
            <ul>
              <li>
                <a href='/login'>Login</a>
              </li>
            </ul>
          )}
        </ul>
      </header>
    );
  }
}
