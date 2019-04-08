import React, { Component } from "react";
import { Form, Container, Dropdown } from "semantic-ui-react";
// app > formula form container  > formula form
class FormulaForm extends Component {
  state = {
    title: "",
    description: "",
    area: "",
    category_id: "",
    ingredients: [],
    directions: "",
    concerns: [],
    image: ""
  };

  handleFormChange = event => {
    if (["name", "percent"].includes(event.target.name)) {
      let ingredients = [...this.state.ingredients];
      ingredients[event.target.dataset.id][event.target.name] =
        event.target.value;
      this.setState({ ingredients });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  // handleFormChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  handleSubmit = event => {
    event.preventDefault();
    const newFormula = this.state;
    this.props.addNewFormula(newFormula);

    // .then(() => {
    //   this.setState({
    //     title: "",
    //     description: "",
    //     area: "",
    //     category: "",
    //     ingredients: [],
    //     directions: "",
    //     concerns: [],
    //     image: ""
    //   });
    // });
  };

  getAreaCategories = () => {
    if (this.state.area === undefined) return;

    const selectedArea = this.props.areas.find(
      area => area.name === this.state.area
    );
    // const categories = selectedArea.filter(area => area.categories);

    return selectedArea.categories.map(category => (
      <option value={category.id}>{category.name}</option>
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
      ingredients: [...this.state.ingredients, { name: "", percent: "" }]
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

          <select name="category_id">
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
              return (
                <div key={index}>
                  {
                    <select name="name" data-id={index}>
                      <option value="" disabled selected>
                        Ingredient name
                      </option>
                      {this.props.ingredients.map(ing => (
                        <option value={ing.name}>{ing.name}</option>
                      ))}
                    </select>
                  }

                  <input
                    name="percent"
                    data-id={index}
                    type="number"
                    placeholder="Percentage"
                    // value={ingredient.percentage}
                  />
                  <button
                    className="remove_ingredient"
                    onClick={() => this.removeIngredient(index)}
                  >
                    Remove
                  </button>
                </div>
              );
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
          <br />
          <button type="submit"> Create </button>
        </form>
      </div>
    );
  }
}

export default FormulaForm;
