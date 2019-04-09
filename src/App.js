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
    currentUser: window.localStorage.getItem("currentUser")
      ? JSON.parse(window.localStorage.getItem("currentUser"))
      : undefined,
    selectedIngredientId: undefined,
    selectedFormulaId: undefined,
    search: "",
    concernSearch: "",
    categorySearch: ""
  };

  // ============================ set up ======================================================

  componentDidMount() {
    API.getFormulas().then(formulas => this.setState({ formulas }));
    API.getAreas().then(areas => this.setState({ areas }));
    API.getIngredients().then(ingredients => this.setState({ ingredients }));
  }

  handleUser = user => {
    window.localStorage.setItem("currentUser", JSON.stringify(user));
    this.setState({ currentUser: user });
  };

  // ======================================== Login ============================================
  login = user => {
    API.login(user)
      .then(this.handleUser)
      .then(() => this.props.history.push(`/`));
    // console.log(user);
  };

  createUser = user => {
    API.createUser(user).then(this.handleUser);
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

  findSelectedFormula = selectedFormulaId => {
    if (
      this.state.selectedFormulaId === undefined &&
      selectedFormulaId === undefined
    )
      return;

    return this.state.formulas.find(
      formula =>
        formula.id === selectedFormulaId ||
        formula.id === this.state.selectedFormulaId
    );
  };

  findSelectedIngredient = () => {
    if (this.state.selectedIngredientId === undefined) return;

    return this.state.ingredients.find(
      ingredient => ingredient.id === this.state.selectedIngredientId
    );
  };

  // =========================================== filter ======================================

  handleSearchChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
    // console.log(event);
  };

  handleDropdownChange = (event, data) => {
    event.persist();
    this.setState({
      [data.name]: data.value
    });
    console.log(data.value);
  };

  displayFilteredList = (list, searchTerm, concernName, categoryTerm) => {
    return list
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item =>
        item.concerns.some(concern =>
          concern.name.toLowerCase().includes(concernName.toLowerCase())
        )
      )
      .filter(item =>
        item.category.toLowerCase().includes(categoryTerm.toLowerCase())
      );
  };

  //========================================== formula crud ===================================

  addNewFormula = formula => {
    formula.user_id = this.state.currentUser.id;

    API.createFormula(formula)
      .then(formula => {
        this.setState({
          formulas: [...this.state.formulas, formula],
          selectedFormulaId: formula.id
        });
      })
      .then(() =>
        this.props.history.push(`/formulas/${this.state.selectedFormulaId}`)
      );

    // .then(() => (
    //   <Redirect to={`/formulas/${this.state.selectedFormulaId}`} push />
    // ));
    // navigate to /formulas/:formulaId
    //.then(() => <Redirect to={`/formulas/:formulaId`} />);
    // .then <redirect to formula view page
  };

  editFormula = formula => {
    formula.area = this.findSelectedFormula().area;
    console.log(formula);
    API.editFormula(formula)
      .then(formula => {
        let updatedFormulas = [...this.state.formulas];

        let index = updatedFormulas.findIndex(f => f.id === formula.id);
        updatedFormulas[index] = formula;

        this.setState({
          formulas: updatedFormulas,
          selectedFormulaId: formula.id
        });
      })
      .then(() =>
        this.props.history.push(`/formulas/${this.state.selectedFormulaId}`)
      );
  };

  deleteFormula = () => {
    const formula = this.findSelectedFormula();
    // console.log("delete", formula);
    API.deleteFormula(formula).then(() => console.log("Delete resp"));
  };

  // ========================================== routing =======================================

  redirectToFormulaExplore = () => {
    if (this.state.selectedFormulaId) return;

    if (this.state.selectedFormulaId === undefined) {
      return this.props.history.push(`/formulas`);
    }
  };

  routing = () => {
    return (
      <>
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
              handleChange={this.handleSearchQueryChange}
              list={this.state.formulas}
              selectedItem={this.setSelectedFormula}
            />
          )}
        />

        <Route
          exact
          path={`/formulas/:formulaId`}
          component={props => (
            <FormulaDetailsContainer
              {...props}
              currentUser={this.state.currentUser}
              formula={this.findSelectedFormula(
                parseInt(props.match.params.formulaId)
              )}
              deleteFormula={this.deleteFormula}
            />
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
          path={`/formulas/:formulaId/edit`}
          component={props => (
            <FormulaFormContainer
              {...props}
              areas={this.state.areas}
              ingredients={this.state.ingredients}
              editFormula={this.editFormula}
              selectedFormula={this.findSelectedFormula(
                parseInt(props.match.params.formulaId)
              )}
            />
          )}
        />

        <Route
          exact
          path={`/ingredients`}
          render={() => (
            <ExploreContainer
              handleChange={this.handleSearchChange}
              handleDropdown={this.handleDropdownChange}
              // list={this.state.ingredients}
              list={this.displayFilteredList(
                this.state.ingredients,
                this.state.search,
                this.state.concernSearch,
                this.state.categorySearch
              )}
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
          render={() => (
            <ExploreContainer handleChange={this.handleSearchChange} />
          )}
        />

        <Route
          exact
          path={`/profile`}
          component={() => <UserProfileContainer />}
        />
      </>
    );
  };

  render() {
    return (
      <div className="App">
        {/* conditionally rendering the nav bar  */}
        {this.state.currentUser ? <MainNavContainer /> : null}

        <div className="app_content_wrapper">{this.routing()}</div>
      </div>
    );
  }
}

export default withRouter(App);
