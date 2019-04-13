import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Divider } from "semantic-ui-react";
import logo from "../images/hgb.png";
import API from "../api";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  login = event => {
    event.preventDefault();
    const currentUser = this.state;
    API.loginPost(currentUser).then(userObject => {
      loginSetUser(userObject);
    });
    const loginSetUser = userObject => {
      let token = userObject.token;
      localStorage.setItem("token", token);
      this.props.setUser();
    };
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
        <div className="login_form_cont">
          <h1 className="form_title">Login</h1>
          <Form
            className="login_form"
            onSubmit={this.login}
            onChange={this.handleFormChange}
          >
            <Form.Field required>
              <label>Username</label>
              <input type="text" placeholder="Username" name="username" />
            </Form.Field>

            <Form.Field required>
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" />
            </Form.Field>

            <button className="submit" type="submit">
              {" "}
              Login{" "}
            </button>
          </Form>
          <Divider horizontal>Or</Divider>
          <Link className="link" to={`/signup`}>
            <button className="option"> Sign up </button>
          </Link>
        </div>
      </Container>
    );
  }
}

export default LoginForm;
