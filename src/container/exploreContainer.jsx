import React, { Component } from "react";
import CardBlockContainer from "../container/cardBlockContainer";
import Filter from "../presentational/filter";

// app > explore
class ExploreContainer extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="explore">
          <CardBlockContainer
            list={this.props.list}
            selectedItem={this.props.selectedItem}
          />
        </div>
      </div>
    );
  }
}

export default ExploreContainer;
