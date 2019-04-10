import React, { Component } from "react";
import FormulaCard from "../presentational/formulaCard";
import IngredientCard from "../presentational/ingredientCard";
import Filter from "../presentational/filter";
import { Link } from "react-router-dom";
import { Grid, Placeholder } from "semantic-ui-react";
// implement grid
// app > explore > cardBlockContainer
class CardBlockContainer extends Component {
  // state = {
  //   loading: false
  // };

  //   findPathName = () => {
  //     this.setState({
  //       currentPath: window.location.pathname
  //     });
  //   };

  // loadingList = () => {
  //   if (this.props.list) {
  //     this.setState({
  //       loading: true
  //     });
  //   }
  // };

  renderFormulas = () => {
    return this.props.list.map(formula => (
      <Grid.Column>
        <Link className="link" to={`/formulas/${formula.id}`}>
          <FormulaCard
            formula={formula}
            selectedItem={this.props.selectedItem}
          />
        </Link>
      </Grid.Column>
    ));
  };

  renderIngredients = () => {
    return this.props.list.map(ingredient => (
      <Grid.Column>
        <Link className="link" to={`/ingredients/${ingredient.id}`}>
          <IngredientCard
            ingredient={ingredient}
            selectedItem={this.props.selectedItem}
          />
        </Link>
      </Grid.Column>
    ));
  };

  render() {
    return (
      <div>
        {window.location.pathname === "/ingredients" ? (
          <div className="page_title">
            <h1>
              Explore -<i>ingredients</i>
            </h1>
          </div>
        ) : (
          <div className="page_title">
            <h1>
              Explore -<i>formulas</i>
            </h1>
          </div>
        )}
        <Grid doubling columns={5}>
          {window.location.pathname === "/ingredients"
            ? this.renderIngredients()
            : window.location.pathname === "/formulas"
            ? this.renderFormulas()
            : null}
        </Grid>
      </div>
    );
  }
}

export default CardBlockContainer;

// {window.location.pathname === "/ingredients"
//             ? this.renderIngredients()
//             : this.renderFormulas()}

// { (window.location.pathname === '/ingredients')? this.renderIngredients() : (window.location.pathname === "/formulas") ? this.renderFormulas() : null }
