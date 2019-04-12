import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Divider } from "semantic-ui-react";
import logo from "../images/hgb.png";

class SignupForm extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  signup = () => {
    const newUser = this.state;
    this.props.createUser(newUser);
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Container>
        <img className="welcome_logo" src={logo} alt="house of green beauty" />
        <div className="signup_form_cont">
          <h1 className="form_title">Sign up</h1>
          <Form
            className="signup_form"
            onSubmit={this.signup}
            onChange={this.handleFormChange}
          >
            <Form.Field required>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
              />
            </Form.Field>

            <Form.Field required>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
              />
            </Form.Field>

            <Form.Field required>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
              />
            </Form.Field>
            <button className="submit" type="submit">
              {" "}
              Sign up{" "}
            </button>
          </Form>
          <Divider horizontal>Or</Divider>
          <Link className="link" to={`/login`}>
            <button className="option"> Log in </button>
          </Link>
        </div>
      </Container>
    );
  }
}

export default SignupForm;
