import React, { Component } from "react";
import FormulaCard from "../presentational/formulaCard";
import IngredientCard from "../presentational/ingredientCard";
import Filter from "../presentational/filter";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
// implement grid
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
        <Grid columns="equal">
          {/* <Grid.Row columns={2}> */}
          <Grid.Column width={3}>
            <Filter />
          </Grid.Column>

          <Grid.Column className="explore_grid">
            <Grid doubling columns={5}>
              {window.location.pathname === "/ingredients"
                ? this.renderIngredients()
                : this.renderFormulas()}
            </Grid>
          </Grid.Column>
          {/* </Grid.Row> */}
        </Grid>
      </div>
    );
  }
}

export default CardBlockContainer;
