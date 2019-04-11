import React, { Component } from "react";
import UserDetails from "../presentational/userDetails";
import CardBlockContainer from "./cardBlockContainer";
// app > user profile
class UserProfileContainer extends Component {
  state = {};
  render() {
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
