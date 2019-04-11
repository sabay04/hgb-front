import React, { Component } from "react";

class UserDetails extends Component {
  state = {};
  render() {
    return <div> {this.props.user.username}</div>;
  }
}

export default UserDetails;
