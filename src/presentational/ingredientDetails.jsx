import React, { Component } from "react";

class IngredientDetails extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>INGREDIENT DETAILS </h1>
        <h1>{this.props.ingredient.name}</h1>
      </div>
    );
  }
}

export default IngredientDetails;
