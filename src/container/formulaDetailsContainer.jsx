import React, { Component } from "react";
import FormulaDetails from "../presentational/formulaDetails";
import { Link } from "react-router-dom";
// app > formula details container
class FormulaDetailsContainer extends Component {
  state = {};

  renderEditorDelete = () => {
    if (this.props.currentUser.id === this.props.formula.user_id) {
      return (
        <div className="edit_or_delete">
          {" "}
          <Link to={`/formulas/${this.props.formula.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => this.props.deleteFormula()}>Delete</button>{" "}
        </div>
      );
    }
  };

  render() {
    if (!this.props.formula) return <div>Loading formula</div>;
    return (
      <div>
        {this.renderEditorDelete()}
        <FormulaDetails
          currentUser={this.props.currentUser}
          formula={this.props.formula}
        />
      </div>
    );
  }
}

export default FormulaDetailsContainer;
