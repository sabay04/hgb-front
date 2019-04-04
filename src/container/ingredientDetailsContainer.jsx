import React, { Component } from "react";
import IngredientDetails from "../presentational/ingredientDetails";

// app > ingredient details container
class IngredientDetailsContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        <IngredientDetails ingredient={this.props.ingredient} />
      </div>
    );
  }
}

export default IngredientDetailsContainer;
