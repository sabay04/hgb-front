import React, { Component } from "react";
import FormulaForm from "../presentational/formulaForm";
import EditFormula from "../presentational/editFormula";
// app  > formula form container

class FormulaFormContainer extends Component {
  state = {};

  whichFormToRender = () => {
    if (window.location.pathname === `/formula/create`) {
      return (
        <FormulaForm
          areas={this.props.areas}
          ingredients={this.props.ingredients}
          addNewFormula={this.props.addNewFormula}
        />
      );
    } else if (this.props.match.path === `/formulas/:formulaId/edit`) {
      return (
        <EditFormula
          areas={this.props.areas}
          ingredients={this.props.ingredients}
          editFormula={this.props.editFormula}
          selectedFormula={this.props.selectedFormula}
        />
      );
    }
  };
  render() {
    return (
      <div className="formula_form_wrapper">{this.whichFormToRender()}</div>
    );
  }
}

export default FormulaFormContainer;
