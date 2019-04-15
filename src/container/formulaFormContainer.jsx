import React, { Component } from "react";
import FormulaForm from "../presentational/formulaForm";
import EditFormula from "../presentational/editFormula";
import { Loader } from "semantic-ui-react";
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
    if (
      this.props.match.path === `/formulas/:formulaId/edit` &&
      !this.props.selectedFormula
    )
      return (
        <Loader className="loader" active inline="centered" size="large">
          Loading
        </Loader>
      );
    return (
      <div className="formula_form_wrapper">{this.whichFormToRender()}</div>
    );
  }
}

export default FormulaFormContainer;
