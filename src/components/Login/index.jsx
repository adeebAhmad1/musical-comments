import React, { Component } from "react";

import firebase from "../../config/firebase";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=> this.props.history.push("/admin"))
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="LoginForm">
        <div className="row">
          <div className="col s12">
            <h5>Login</h5>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <input
                value={this.state.email}
                id="email"
                name="email"
                type="email"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                value={this.state.password}
                id="password"
                name="password"
                type="password"
                className="validate"
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12 right-align">
              <button className="btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
