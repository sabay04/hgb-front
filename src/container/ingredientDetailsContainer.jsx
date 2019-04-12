import React, { Component } from "react";
import IngredientDetails from "../presentational/ingredientDetails";
import { Loader } from "semantic-ui-react";
// app > ingredient details container
class IngredientDetailsContainer extends Component {
  state = {};

  render() {
    if (!this.props.ingredient)
      return (
        <div className="loader_wrapper">
          <Loader className="loader" active inline="centered" size="large">
            Loading
          </Loader>
        </div>
      );
    return (
      <div>
        <IngredientDetails ingredient={this.props.ingredient} />
      </div>
    );
  }
}

export default IngredientDetailsContainer;
