import React, { Component } from "react";
import { Search, Grid, Container, Input, Dropdown } from "semantic-ui-react";

const ingredientCategories = [
  { key: "All", text: "All", value: "" },
  { key: "butter", text: "Butter", value: "butter" },
  { key: "Hydrosol", text: "Hydrosol", value: "Hydrosol" },
  {
    key: "Active Botanical",
    text: "Active Botanical",
    value: "Active Botanical"
  },
  { key: "Carrier Oil", text: "Carrier Oil", value: "Carrier Oil" },
  { key: "Clay", text: "Clay", value: "Clay" }
];

class Filter extends Component {
  state = {};

  categoryOptions = () => {
    if (window.location.pathname === "/ingredients") {
      return ingredientCategories;
    }
  };

  handleSearchChange = event => {
    console.log(event.target.value);
  };

  render() {
    return (
      <Container className="filter">
        <h3 className="filter_title"> Filter </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Input
                name="search"
                fluid
                onChange={this.props.handleChange}
                icon={{ name: "search", circular: true, link: true }}
                placeholder="Search by name..."
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Input
                name="concernSearch"
                fluid
                onChange={this.props.handleChange}
                icon={{ name: "search", circular: true, link: true }}
                placeholder="Search by concern..."
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {/* <Input
                name="concernSearch"
                fluid
                onChange={this.props.handleChange}
                icon={{ name: "search", circular: true, link: true }}
                placeholder="Search by concern..."
              /> */}
              <Dropdown
                name="categorySearch"
                onChange={this.props.handleDropdown}
                placeholder="Select a category"
                fluid
                search
                selection
                options={this.categoryOptions()}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Filter;
