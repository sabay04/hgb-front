import React, { Component } from "react";

class FormulaForm extends Component {
  state = {
    title: "",
    description: "",
    area: "",
    category: "",
    ingredients: [{ name: " ", percentage: " " }],
    directions: "",
    concerns: [],
    image: ""
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const newFormula = this.state;
    // add new formula
  };

  getAreaCategories = () => {
    if (this.state.area === undefined) return;

    const selectedArea = this.props.areas.find(
      area => area.name === this.state.area
    );
    // const categories = selectedArea.filter(area => area.categories);

    return selectedArea.categories.map(category => (
      <option value={category.name}>{category.name} </option>
    ));
  };

  getAreaConcerns = () => {
    if (this.state.area === undefined) return;

    const selectedArea = this.props.areas.find(
      area => area.name === this.state.area
    );
    return selectedArea.concerns.map(concern => (
      <option value={concern.name}>{concern.name} </option>
    ));
  };

  addIngredient = event => {
    event.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients, { name: "", percentage: "" }]
    });
  };

  removeIngredient = index => {
    this.state.ingredients.splice(index, 1);

    this.setState({
      ingredients: this.state.ingredients
    });
  };

  render() {
    return (
      <div className="formula_form_wrapper">
        <h1>Create a new formula</h1>
        <form
          className="formula_form"
          onSubmit={this.handleSubmit}
          onChange={this.handleFormChange}
        >
          <input type="text" name="title" placeholder="Title" />
          <input type="textarea" name="description" placeholder="Description" />
          <select name="area">
            <option value="" disabled selected>
              Area
            </option>
            {this.props.areas.map(area => (
              <option value={area.name}>{area.name}</option>
            ))}
          </select>

          <select name="category">
            <option value="" disabled selected>
              Category
            </option>
            {this.state.area ? this.getAreaCategories() : null}
          </select>

          <h2>Ingredients</h2>
          <button id="add_ingredient" onClick={this.addIngredient}>
            Add Ingredient +
          </button>

          <div className="ingredient_form">
            {this.state.ingredients.map((ingredient, index) => {
              return <div key={index}>{/* select reactSelectize */}</div>;
            })}
          </div>

          <input type="textarea" name="directions" placeholder="Directions" />

          <select name="concerns">
            <option value="" disabled selected>
              Concerns
            </option>
            {this.state.area ? this.getAreaConcerns() : null}
          </select>
          {/* // concerns tags */}
          <input type="url" name="image" placeholder="Image url" />
          <button type="submit"> Create </button>
        </form>
      </div>
    );
  }
}

export default FormulaForm;
