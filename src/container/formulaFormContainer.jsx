import React, { Component } from "react";
import FormulaForm from "../presentational/formulaForm";

// app  > formula form container

class FormulaFormContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        <FormulaForm
          areas={this.props.areas}
          ingredients={this.props.ingredients}
          addNewFormula={this.props.addNewFormula}
        />
      </div>
    );
  }
}

export default FormulaFormContainer;
