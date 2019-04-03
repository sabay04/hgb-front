import React, { Component } from "react";
import "./App.css";
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
  state = {};

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
          component={() => <ExploreContainer />}
        />

        <Route
          exact
          path={`/ingredients`}
          component={() => <ExploreContainer />}
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
