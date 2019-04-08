import React, { Component } from "react";
import FormulaDetails from "../presentational/formulaDetails";

// app > formula details container
class FormulaDetailsContainer extends Component {
  state = {};

  renderEditorDelete = () => {
    if (this.props.currentUser.id === this.props.formula.user_id) {
      return (
        <div className="edit_or_delete">
          {" "}
          <button>Edit</button>
          <button>Delete</button>{" "}
        </div>
      );
    }
  };
  render() {
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
