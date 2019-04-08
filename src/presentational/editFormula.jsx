import React, { Component } from "react";
import { Form, Container, Dropdown } from "semantic-ui-react";

class EditFormula extends Component {
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

  componentDidMount = () => {
    const formula = this.props.selectedFormula;
    this.setState({
      title: formula.title,
      description: formula.description,
      category_id: formula.category_id,
      ingredients: formula.ingredients,
      directions: formula.directions,
      concerns: formula.concerns,
      image: formula.image
    });
  };

  setAreaState = () => {
    const area = this.props.selectedFormula.area;
    if (area === "Skin care") {
      this.setState({
        area: "Skin care"
      });
    } else if (area === "Hair care") {
      this.setState({
        area: "Hair care"
      });
    } else if (area === "Body care") {
      this.setState({
        area: "Body care"
      });
    }
  };
  handleFormChange = event => {
    // console.log(event.target.name);
    if (["name", "percentage"].includes(event.target.name)) {
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
    this.props.editFormula(newFormula);

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
    return selectedArea.concerns.map((concern, index) =>
      // <option value={concern.name}>{concern.name} </option>
      ({ key: index, text: concern.name, value: concern.id, name: "concerns" })
    );
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

  handleConernForm = event => {
    this.setState({ currentConcern: event.target.value });
  };

  handleConcernAddition = event => {
    console.log(event.target);
    this.setState({
      concerns: [...this.state.concerns, event.target.value]
    });
  };

  render() {
    return (
      <Container className="formula_form">
        <h1 className="formula_form_title">Edit formula</h1>
        <Form
          className="formula_form"
          onSubmit={this.handleSubmit}
          onChange={this.handleFormChange}
        >
          <Form.Field>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={this.state.description}
            />
          </Form.Field>

          <Form.Field>
            <label>Area</label>
            <select name="area">
              <option value="" disabled selected>
                Area
              </option>
              {this.props.areas.map(area => (
                <option value={area.name}>{area.name}</option>
              ))}
            </select>
          </Form.Field>

          <Form.Field>
            <label>Category</label>
            <select name="category_id" value={this.state.category_id}>
              <option value="" disabled selected>
                Category
              </option>
              {this.state.area ? this.getAreaCategories() : null}
            </select>
          </Form.Field>

          <div className="add_ingredient_title">
            <h2 className="ingredient_title">Ingredients</h2>
            <button id="add_ingredient" onClick={this.addIngredient}>
              Add Ingredient +
            </button>
          </div>

          <div className="ingredient_form">
            {this.state.ingredients.map((ingredient, index) => {
              return (
                <div key={index}>
                  {
                    <Form.Field>
                      <label>Ingredient Name</label>
                      <select
                        name="name"
                        data-id={index}
                        value={ingredient.name}
                      >
                        <option value="" disabled selected>
                          Ingredient name
                        </option>
                        {this.props.ingredients.map(ing => (
                          <option value={ing.name}>{ing.name}</option>
                        ))}
                      </select>
                    </Form.Field>
                  }
                  <Form.Field>
                    <label>Percentage</label>
                    <input
                      name="percentage"
                      data-id={index}
                      type="number"
                      placeholder="Percentage"
                      value={ingredient.percentage}
                    />
                  </Form.Field>
                  <Form.Field>
                    <button
                      id="remove_ingredient"
                      onClick={() => this.removeIngredient(index)}
                    >
                      Remove
                    </button>
                  </Form.Field>
                </div>
              );
            })}
          </div>

          <Form.Field>
            <label>Directions</label>
            <textarea
              name="directions"
              placeholder="Directions"
              value={this.state.directions}
            />
          </Form.Field>

          <Form.Field>
            <label>Concerns</label>
            <select name="concerns" value={this.state.concerns}>
              <option value="" disabled selected>
                Concerns
              </option>
              {this.state.area ? this.getAreaConcerns() : null}
            </select>
          </Form.Field>
          {/* <Dropdown
                onChange={this.handleConernForm}
                value={this.state.currentConcern}
                onAddItem={this.handleConcernAddition}
                name="concerns"
                placeholder="Concerns"
                fluid
                allowAdditions
                multiple
                search
                selection
                options={this.state.area ? this.getAreaConcerns() : null}
              /> */}
          {/* // concerns tags */}
          <Form.Field>
            <label>Image</label>
            <input
              type="url"
              name="image"
              placeholder="Image url"
              value={this.state.image}
            />
          </Form.Field>
          <br />
          <button className="submit" type="submit">
            {" "}
            Create{" "}
          </button>
        </Form>
      </Container>
    );
  }
}

export default EditFormula;
