import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// app > main nav
class MainNavContainer extends Component {
  state = {};

  render() {
    return (
      <div>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/formulas"> Formulas </NavLink>
        <NavLink to="/ingredients"> Ingredients </NavLink>
        <NavLink to="/favourites"> Favourites </NavLink>
        <NavLink to="/formula/create"> Create </NavLink>
        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/profile"> Profile </NavLink>
      </div>
    );
  }
}

export default MainNavContainer;
