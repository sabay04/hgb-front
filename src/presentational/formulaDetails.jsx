import React, { Component } from "react";

class FormulaDetails extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>FORMULA DETAILS </h1>
        <h1>{this.props.formula.title}</h1>
      </div>
    );
  }
}

export default FormulaDetails;
