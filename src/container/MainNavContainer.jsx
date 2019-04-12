import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/wordLogo.png";
import { Container, Icon } from "semantic-ui-react";

// app > main nav
class MainNavContainer extends Component {
  state = {};

  render() {
    return (
      <Container className="nav_bar">
        <div className="top_logo_nav">
          <img className="nav_logo" src={logo} alt="house of green beauty" />
          <NavLink to="/profile" className="top_nav_item">
            {" "}
            <Icon name="user" />
          </NavLink>

          {this.props.user ? (
            <NavLink
              // onClick={this.props.logout}
              to="/login"
              className="top_nav_item"
            >
              {" "}
              Logout{" "}
            </NavLink>
          ) : (
            <NavLink to="/login" className="top_nav_item">
              {" "}
              Login{" "}
            </NavLink>
          )}
        </div>

        <div className="main_nav_bar">
          <div className="nav_elements">
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
          </div>
        </div>
      </Container>
    );
  }
}

export default MainNavContainer;
