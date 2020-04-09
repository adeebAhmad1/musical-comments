import React, { Component, createContext } from "react";

import firebase from "../config/firebase";

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {
  state = {
    isAuth: false,
    user: {},
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in");
        this.setState({ isAuth: true, user: user });
      } else {
        // User is signed out.
        // ...
        console.log("User is logged out");
        this.setState({ isAuth: false, user: {} });
      }
    });
  };

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
