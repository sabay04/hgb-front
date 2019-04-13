import React, { Component } from "react";
import LoginForm from "../presentational/loginForm";
import SignupForm from "../presentational/signupForm";
import { Container } from "semantic-ui-react";
import logo from "../images/hgb.png";

class SignupLoginFormContainer extends Component {
  state = {};
  render() {
    return (
      <>
        {/* <img className="welcome_logo" src={logo} alt="house of green beauty" /> */}
        <Container className="form_cont">
          {window.location.pathname === "/login" ? (
            <LoginForm setUser={this.props.setUser} />
          ) : (
            <SignupForm setUser={this.props.setUser} />
          )}
        </Container>
      </>
    );
  }
}

export default SignupLoginFormContainer;
