import React, { Component } from "react";
import FormulaDetails from "../presentational/formulaDetails";

// app > formula details container
class FormulaDetailsContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        <FormulaDetails formula={this.props.formula} />
      </div>
    );
  }
}

export default FormulaDetailsContainer;
