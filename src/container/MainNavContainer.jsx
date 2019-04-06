import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/nav_logo_tran.png";
import { Container } from "semantic-ui-react";

// app > main nav
class MainNavContainer extends Component {
  state = {};

  render() {
    return (
      <Container className="nav_bar">
        <img className="nav_logo" src={logo} alt="house of green beauty" />
        <NavLink to="/profile" className="nav_item">
          {" "}
          Profile{" "}
        </NavLink>
        <NavLink to="/login" className="nav_item">
          {" "}
          Login{" "}
        </NavLink>
        <NavLink to="/formula/create" className="nav_item">
          {" "}
          Create{" "}
        </NavLink>
        <NavLink to="/favourites" className="nav_item">
          {" "}
          Favourites{" "}
        </NavLink>
        <NavLink to="/ingredients" className="nav_item">
          {" "}
          Ingredients{" "}
        </NavLink>
        <NavLink to="/formulas" className="nav_item">
          {" "}
          Formulas{" "}
        </NavLink>
        <NavLink to="/" className="nav_item">
          {" "}
          Home{" "}
        </NavLink>
      </Container>
    );
  }
}

export default MainNavContainer;
