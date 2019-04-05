import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignupForm extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  signup = () => {
    const newUser = this.state;
    // call create new user
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="signup_form_cont">
        <h1>Sign up</h1>
        <form
          className="signup_form"
          onSubmit={this.signup}
          onChange={this.handleFormChange}
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
          />
          <button type="submit"> Sign up </button>
        </form>
        <h4>------------------- or -------------------</h4>
        <Link className="link" to={`/login`}>
          <button> Log in </button>
        </Link>
      </div>
    );
  }
}

export default SignupForm;
