import React, { Component } from "react";
import LoginForm from "../presentational/loginForm";
import SignupForm from "../presentational/signupForm";

class SignupLoginFormContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        {window.location.pathname === "/login" ? (
          <LoginForm login={this.props.login} />
        ) : (
          <SignupForm />
        )}
      </div>
    );
  }
}

export default SignupLoginFormContainer;
