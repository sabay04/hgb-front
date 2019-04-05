import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const currentUser = this.state;
    // find current user

    this.props.login(currentUser);
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="login_form_cont">
        <h1>Login</h1>
        <form
          className="login_form"
          onSubmit={this.handleSubmit}
          onChange={this.handleFormChange}
        >
          <input type="text" placeholder="Username" name="username" />

          <input type="password" placeholder="Password" name="password" />
          <button type="submit"> Login </button>
        </form>
        <h4>------------------ or -------------------</h4>
        <Link className="link" to={`/signup`}>
          <button> Sign up </button>
        </Link>
      </div>
    );
  }
}

export default LoginForm;
