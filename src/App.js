import React, { Component } from "react";
import "./App.css";
import API from "./api";
import { withRouter, Router, Route } from "react-router-dom";
import SignupLoginContainer from "./container/signupLoginContainer";
import HomeContainer from "./container/homeContainer";
import ExploreContainer from "./container/exploreContainer";
import MainNavContainer from "./container/MainNavContainer";
import FormulaDetailsContainer from "./container/formulaDetailsContainer";
import IngredientDetailsContainer from "./container/ingredientDetailsContainer";
import UserProfileContainer from "./container/userProfileContainer";
import FormulaFormContainer from "./container/formulaFormContainer";

class App extends Component {
  state = {
    formulas: [],
    ingredients: [],
    areas: [],
    currentUser: undefined,
    selectedIngredientId: undefined,
    selectedFormulaId: undefined
  };

  // ============================ set up ======================================================

  componentDidMount() {
    API.getFormulas().then(formulas => this.setState({ formulas }));
    API.getAreas().then(areas => this.setState({ areas }));
    API.getIngredients().then(ingredients => this.setState({ ingredients }));
  }

  // ======================================== selection ========================================

  setSelectedFormula = formulaId => {
    this.setState({
      selectedFormulaId: formulaId
    });
  };

  setSelectedIngredient = ingredientId => {
    this.setState({
      selectedIngredientId: ingredientId
    });
  };

  //=================================== find selected element ============================================

  findSelectedFormula = () => {
    if (this.state.selectedFormulaId === undefined) return;

    return this.state.formulas.find(
      formula => formula.id === this.state.selectedFormulaId
    );
  };

  findSelectedIngredient = () => {
    if (this.state.selectedIngredientId === undefined) return;

    return this.state.ingredients.find(
      ingredient => ingredient.id === this.state.selectedIngredientId
    );
  };

  // ========================================== routing =======================================

  routing = () => {
    return (
      <div>
        <Route exact path={`/`} component={() => <HomeContainer />} />
        <Route
          exact
          path={`/login`}
          component={() => <SignupLoginContainer />}
        />

        <Route
          exact
          path={`/formulas`}
          component={() => (
            <ExploreContainer
              list={this.state.formulas}
              selectedItem={this.setSelectedFormula}
            />
          )}
        />

        <Route
          path={`/formulas/:formulaId`}
          component={() => (
            <FormulaDetailsContainer formula={this.findSelectedFormula()} />
          )}
        />

        <Route
          exact
          path={`/ingredients`}
          component={() => (
            <ExploreContainer
              list={this.state.ingredients}
              selectedItem={this.setSelectedIngredient}
            />
          )}
        />

        <Route
          path={`/ingredients/:ingredientId`}
          component={() => (
            <IngredientDetailsContainer
              ingredient={this.findSelectedIngredient()}
            />
          )}
        />

        <Route
          exact
          path={`/favourites`}
          component={() => <ExploreContainer />}
        />

        <Route
          exact
          path={`/formulas/create`}
          component={() => <FormulaFormContainer />}
        />

        <Route
          exact
          path={`/profile`}
          component={() => <UserProfileContainer />}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="nav_bar">
          <MainNavContainer />{" "}
        </div>
        {this.routing()}
      </div>
    );
  }
}

export default withRouter(App);
