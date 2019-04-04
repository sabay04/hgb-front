import React, { Component } from "react";
import FormulaCard from "../presentational/formulaCard";
import IngredientCard from "../presentational/ingredientCard";
import { Link } from "react-router-dom";
// app > explore > cardBlockContainer
class CardBlockContainer extends Component {
  //   state = {
  //     currentPath: undefined
  //   };

  //   findPathName = () => {
  //     this.setState({
  //       currentPath: window.location.pathname
  //     });
  //   };

  renderFormulas = () => {
    return this.props.list.map(formula => (
      <Link className="link" to={`/formulas/${formula.id}`}>
        <FormulaCard formula={formula} selectedItem={this.props.selectedItem} />
      </Link>
    ));
  };

  renderIngredients = () => {
    return this.props.list.map(ingredient => (
      <Link className="link" to={`/ingredients/${ingredient.id}`}>
        <IngredientCard
          ingredient={ingredient}
          selectedItem={this.props.selectedItem}
        />
      </Link>
    ));
  };

  render() {
    return (
      <div>
        {window.location.pathname === "/ingredients"
          ? this.renderIngredients()
          : this.renderFormulas()}
      </div>
    );
  }
}

export default CardBlockContainer;
