import React, { Component } from "react";
import { Image, Container, Header } from "semantic-ui-react";

class UserDetails extends Component {
  state = {};
  render() {
    return (
      <Container className="user_details">
        {/* {this.props.user.image === null ? (
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="medium"
            circular
          />
        ) : (
          <Image src={this.props.user.image} size="medium" circular />
        )}
        <h1>{this.props.user.username}</h1> */}
        {/* <Header as="h1">
          {this.props.user.image === null ? (
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="huge"
              circular
            />
          ) : (
            <Image src={this.props.user.image} size="big" circular />
          )}
          {this.props.user.username}
        </Header> */}

        <Header as="h2" icon textAlign="center">
          {this.props.user.image === null ? (
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="medium"
              circular
            />
          ) : (
            <Image src={this.props.user.image} size="medium" circular />
          )}
          <Header.Content>
            {this.props.user.username} <br /> <i>{this.props.user.email}</i>
          </Header.Content>
        </Header>
      </Container>
    );
  }
}

export default UserDetails;
