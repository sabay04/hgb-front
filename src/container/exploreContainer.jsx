import React, { Component } from "react";
import CardBlockContainer from "../container/cardBlockContainer";
import Filter from "../presentational/filter";
import { Grid, Placeholder } from "semantic-ui-react";
// app > explore
class ExploreContainer extends Component {
  state = {};

  render() {
    return (
      <div className="explore_page">
        <Grid columns="equal">
          <Grid.Column width={3}>
            <Filter
              handleChange={this.props.handleChange}
              handleDropdown={this.props.handleDropdown}
            />
          </Grid.Column>

          <Grid.Column className="explore_grid">
            <div className="explore">
              <CardBlockContainer
                list={this.props.list}
                selectedItem={this.props.selectedItem}
              />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ExploreContainer;
