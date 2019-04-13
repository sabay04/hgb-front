import React, { Component } from "react";
import WelcomeDisplay from "../presentational/welcomeDisplay";
import SignupLoginFormContainer from "./signupLoginFormContainer";
import { Container } from "semantic-ui-react";
// app > SignupLoginContainer

class SignupLoginContainer extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="signup_login_page">
          <div className="welcome_display_wrapper">
            <WelcomeDisplay />
          </div>

          <div className="form_cont_wrapper">
            <SignupLoginFormContainer
              createUser={this.props.createUser}
              setUser={this.props.setUser}
            />
          </div>
        </div>
      </>
    );
  }
}

export default SignupLoginContainer;
