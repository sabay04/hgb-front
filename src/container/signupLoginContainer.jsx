import React, { Component } from "react";
import WelcomeDisplay from "../presentational/welcomeDisplay";
import SignupLoginFormContainer from "./signupLoginFormContainer";
// app > SignupLoginContainer

class SignupLoginContainer extends Component {
  state = {};
  render() {
    return (
      <div className="signup_login_page">
        <div className="welcome_display">
          <WelcomeDisplay />
        </div>

        <div className="form_cont">
          <SignupLoginFormContainer login={this.props.login} />
        </div>
      </div>
    );
  }
}

export default SignupLoginContainer;
