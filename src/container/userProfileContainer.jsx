import React, { Component } from "react";
import UserDetails from "../presentational/userDetails";
import CardBlockContainer from "./cardBlockContainer";
import { Loader, Grid } from "semantic-ui-react";
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
      <Grid container>
        <Grid.Row>
          <UserDetails user={this.props.user} />
        </Grid.Row>

        <Grid.Row className="my_formulas_wrapper">
          <CardBlockContainer
            list={this.props.formulas}
            selectedItem={this.setSelectedFormula}
          />
        </Grid.Row>
      </Grid>
    );
  }
}

export default UserProfileContainer;
