import React, { Component } from "react";
import "./App.css";
import API from "./api";
import { Redirect, withRouter, Router, Route } from "react-router-dom";
import SignupLoginContainer from "./container/signupLoginContainer";
import HomeContainer from "./container/homeContainer";
import ExploreContainer from "./container/exploreContainer";
import MainNavContainer from "./container/MainNavContainer";
import FormulaDetailsContainer from "./container/formulaDetailsContainer";
import IngredientDetailsContainer from "./container/ingredientDetailsContainer";
import UserProfileContainer from "./container/userProfileContainer";
import FormulaFormContainer from "./container/formulaFormContainer";

import logo from "./images/hgb.png";

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

  // ======================================== Login ============================================
  login = user => {
    API.login(user).then(user => this.setState({ currentUser: user }));
    // console.log(user);
  };

  createUser = user => {
    API.createUser(user).then(user => this.setState({ currentUser: user }));
  };

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

  //========================================== formula crud ===================================

  addNewFormula = formula => {
    formula.user_id = this.state.currentUser.id;

    API.createFormula(formula).then(formula => {
      this.setState({
        formulas: [...this.state.formulas, formula],
        selectedFormulaId: formula.id
      });
    });

    // .then(() => (
    //   <Redirect to={`/formulas/${this.state.selectedFormulaId}`} push />
    // ));
    // navigate to /formulas/:formulaId
    //.then(() => <Redirect to={`/formulas/:formulaId`} />);
    // .then <redirect to formula view page
  };

  // ========================================== routing =======================================

  routing = () => {
    return (
      <div>
        <Route exact path={`/`} component={() => <HomeContainer />} />
        <Route
          exact
          path={`/login`}
          component={() => <SignupLoginContainer login={this.login} />}
        />

        <Route
          exact
          path={`/signup`}
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
          exact
          path={`/formulas/:formulaId`}
          component={() => (
            <FormulaDetailsContainer formula={this.findSelectedFormula()} />
          )}
        />

        <Route
          exact
          path={`/formula/create`}
          component={() => (
            <FormulaFormContainer
              areas={this.state.areas}
              ingredients={this.state.ingredients}
              addNewFormula={this.addNewFormula}
            />
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
          path={`/profile`}
          component={() => <UserProfileContainer />}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        {/* comment back in later conditionally rendering the nav bar  */}
        {/* {this.state.currentUser ? <MainNavContainer /> : null} */}
        <MainNavContainer />
        <div className="app_content_wrapper">{this.routing()}</div>
      </div>
    );
  }
}

export default withRouter(App);
