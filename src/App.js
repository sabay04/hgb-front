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
import Footer from "./presentational/footer";
import IngredientFormulaContainer from "./container/ingredientFormulaContainer";

import logo from "./images/hgb.png";

class App extends Component {
  state = {
    formulas: [],
    ingredients: [],
    areas: [],
    currentUser: undefined,
    selectedIngredientId: undefined,
    selectedFormulaId: undefined,
    search: "",
    concernSearch: "",
    categorySearch: "",
    areaSearch: ""
  };

  // ============================ set up ======================================================

  componentDidMount() {
    this.setUser();
  }

  handleUser = user => {
    // window.localStorage.setItem("currentUser", JSON.stringify(user));
    this.setState({ currentUser: user });
  };

  // ======================================== Login/ auth ============================================

  setUser = () => {
    API.getProfile().then(userObject => {
      if (userObject.error) {
        this.logout();
        this.props.history.push(`/login`);
      } else {
        this.setState({ currentUser: userObject.user });
        API.getFormulas().then(formulas => this.setState({ formulas }));
        API.getAreas().then(areas => this.setState({ areas }));
        API.getIngredients().then(ingredients =>
          this.setState({ ingredients })
        );
        // this.props.history.push("/");
      }
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      formulas: [],
      ingredients: [],
      areas: [],
      currentUser: undefined,
      selectedIngredientId: undefined,
      selectedFormulaId: undefined,
      search: "",
      concernSearch: "",
      categorySearch: "",
      areaSearch: ""
    });
    // window.location.reload();
    this.props.history.push("/login");
  };

  // login = user => {
  //   API.login(user)
  //     .then(this.handleUser)
  //     .then(() => this.props.history.push(`/`));
  //   // console.log(user);
  // };

  // logOut = () => {
  //   // window.localStorage.clear();
  //   this.setState({
  //     currentUser: undefined
  //   });
  //   return this.props.history.push(`/login`);
  // };

  // createUser = user => {
  //   API.createUser(user)
  //     .then(this.handleUser)
  //     .then(() => this.props.history.push(`/`));
  // };

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

  findSelectedIngredient = selectedIngredientId => {
    if (
      this.state.selectedIngredientId === undefined &&
      selectedIngredientId === undefined
    )
      return;

    return this.state.ingredients.find(
      ingredient =>
        ingredient.id === selectedIngredientId ||
        ingredient.id === this.state.selectedIngredientId
    );
  };

  // ========================================== users formulas ================================

  getUsersFormulas = () => {
    return this.state.formulas.filter(
      formula => formula.user_id === this.state.currentUser.id
    );
  };
  // =========================================== filter ======================================

  handleSearchChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    // console.log(event);
  };

  handleDropdownChange = (event, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  displayFilteredIngredients = (
    list,
    searchTerm,
    concernName,
    categoryTerm
  ) => {
    return list
      .filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  displayFilteredFormulas = (
    list,
    searchTerm,
    concernName,
    categoryName,
    areaName
  ) => {
    return list
      .filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item =>
        item.concerns.some(concern =>
          concern.name.toLowerCase().includes(concernName.toLowerCase())
        )
      )
      .filter(item =>
        item.category.toLowerCase().includes(categoryName.toLowerCase())
      )
      .filter(item => item.area.toLowerCase().includes(areaName.toLowerCase()));
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
    API.deleteFormula(formula).then(() => this.props.history.push(`/formulas`));
  };

  //============================================== favourite crud and other functions  ==============================

  isFavourite = selectedFormulaId => {
    return !!this.state.currentUser.favourites.find(
      favourite =>
        favourite.user_id === this.state.currentUser.id &&
        favourite.formula_id === selectedFormulaId
    );
  };

  favouriteFormula = selectedFormula => {
    const favourite = {
      user_id: this.state.currentUser.id,
      formula_id: selectedFormula
    };

    console.log("you have favourited this:", favourite);
    API.createFavourite(favourite).then(
      favourite => {
        const user = this.state.currentUser;
        user.favourites = [...user.favourites, favourite];
        this.handleUser(user);
      }
      // this.setState({ favourites: [...this.state.favourites, favourite] })
    );
  };

  unfavouriteFormula = selectedFormulaId => {
    const favourite = this.state.currentUser.favourites.find(
      fav => fav.formula_id === selectedFormulaId
    );
    console.log("you have unfavourited this ", favourite);
    API.deleteFavourite(favourite).then(fav => {
      const user = this.state.currentUser;
      user.favourites = user.favourites.filter(
        userFav => userFav.id !== fav.id
      );
      this.handleUser(user);
    });
  };

  findUsersFavourites = () => {
    const favs = [];
    // const usersfavs = this.state.favourites.filter(
    //   fav => fav.user_id === this.state.currentUser.id
    // );

    const usersfavs = this.state.currentUser.favourites;

    for (const formula in this.state.formulas) {
      for (const userfav in usersfavs) {
        if (this.state.formulas[formula].id === usersfavs[userfav].formula_id) {
          favs.push(this.state.formulas[formula]);
        }
      }
    }

    return favs;
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
        <Route
          exact
          path={`/`}
          render={() =>
            !this.state.currentUser ? (
              <Redirect to="/login" />
            ) : (
              <HomeContainer />
            )
          }
        />
        <Route
          exact
          path={`/login`}
          render={() =>
            this.state.currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignupLoginContainer setUser={this.setUser} />
            )
          }
        />

        <Route
          exact
          path={`/signup`}
          component={() =>
            this.state.currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignupLoginContainer setUser={this.setUser} />
            )
          }
        />

        <Route
          exact
          path={`/formulas`}
          render={() => (
            <ExploreContainer
              handleChange={this.handleSearchChange}
              handleDropdown={this.handleDropdownChange}
              areas={this.state.areas}
              list={this.displayFilteredFormulas(
                this.state.formulas,
                this.state.search,
                this.state.concernSearch,
                this.state.categorySearch,
                this.state.areaSearch
              )}
              selectedItem={this.setSelectedFormula}
            />
          )}
        />

        <Route
          exact
          path={`/formulas/:formulaId`}
          render={props => (
            <FormulaDetailsContainer
              {...props}
              // allFavourites={this.state.favourites}
              isFavourite={this.isFavourite}
              favourite={this.favouriteFormula}
              unfavourite={this.unfavouriteFormula}
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
          component={props => (
            <FormulaFormContainer
              {...props}
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
              list={this.displayFilteredIngredients(
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
          exact
          path={`/ingredients/:ingredientId`}
          component={props => (
            <IngredientDetailsContainer
              {...props}
              ingredient={this.findSelectedIngredient(
                parseInt(props.match.params.ingredientId)
              )}
            />
          )}
        />

        <Route
          path={`/ingredients/:ingredientId/formulas`}
          component={props => (
            <IngredientFormulaContainer
              {...props}
              ingredient={this.findSelectedIngredient(
                parseInt(props.match.params.ingredientId)
              )}
              formulas={this.state.formulas}
              selectedItem={this.setSelectedFormula}
            />
          )}
        />

        <Route
          exact
          path={`/favourites`}
          render={() => (
            <ExploreContainer
              handleChange={this.handleSearchChange}
              handleDropdown={this.handleDropdownChange}
              areas={this.state.areas}
              list={this.displayFilteredFormulas(
                this.findUsersFavourites(),
                this.state.search,
                this.state.concernSearch,
                this.state.categorySearch,
                this.state.areaSearch
              )}
              selectedItem={this.setSelectedFormula}
            />
          )}
        />

        <Route
          exact
          path={`/profile`}
          component={() => (
            <UserProfileContainer
              user={this.state.currentUser}
              formulas={this.getUsersFormulas()}
              selectedItem={this.setSelectedFormula}
            />
          )}
        />
      </>
    );
  };

  render() {
    return (
      <div className="App">
        {/* conditionally rendering the nav bar  */}
        {this.state.currentUser ? (
          <MainNavContainer
            logout={this.logout}
            user={this.state.currentUser}
          />
        ) : null}

        {this.props.location.pathname === "/login" ? (
          <div className="login_page_cont">{this.routing()}</div>
        ) : (
          <div className="app_content_wrapper">{this.routing()}</div>
        )}

        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(App);
