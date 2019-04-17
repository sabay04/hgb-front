import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Divider, Image } from "semantic-ui-react";
import logo from "../images/hgb.png";
import API from "../api";

import Dropzone from "react-dropzone";
import request from "superagent";

// const CLOUDINARY_UPLOAD_PRESET = "vgvyrowl";
// const CLOUDINARY_UPLOAD_URL =
//   "https://api.cloudinary.com/v1_1/sabay/image/upload";

class SignupForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    image: ""
  };

  signup = () => {
    const newUser = this.state;
    API.createUser(newUser).then(userObject => {
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

  // =================================== image upload ============================

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });
    console.log(files);
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          image: response.body.secure_url,
          imagePublicId: response.body.public_id
        });
        console.log(response);
      }
    });
  };

  //==================================== render ===================================

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

            <div className="image_dropzone">
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                accept="image/*"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {<h5>Drop your profile picture here</h5>}
                      <Divider horizontal>Or</Divider>
                      <button> Select image </button>
                    </div>
                  );
                }}
              </Dropzone>
              <div>
                {this.state.image === "" ? null : (
                  <div>
                    <h5>{this.state.uploadedFile.name}</h5>
                  </div>
                )}
              </div>
            </div>

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
