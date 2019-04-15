import React, { Component } from "react";
import UserDetails from "../presentational/userDetails";
import CardBlockContainer from "./cardBlockContainer";
import { Loader } from "semantic-ui-react";
// app > user profile
class UserProfileContainer extends Component {
  state = {};
  render() {
    if (!this.props.user)
      return (
        <Loader className="loader" active inline="centered" size="large">
          Loading
        </Loader>
      );
    return (
      <div>
        <UserDetails user={this.props.user} />
        <div className="my_formulas_wrapper">
          <CardBlockContainer
            list={this.props.formulas}
            selectedItem={this.setSelectedFormula}
          />
        </div>
      </div>
    );
  }
}

export default UserProfileContainer;
