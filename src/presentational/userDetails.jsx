import React, { Component } from "react";
import { Image } from "semantic-ui-react";

class UserDetails extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.user.image === null ? (
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="medium"
            circular
          />
        ) : (
          <Image src={this.props.user.image} size="medium" circular />
        )}
        {this.props.user.username}
      </div>
    );
  }
}

export default UserDetails;
