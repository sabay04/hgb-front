import React, { Component } from "react";
import {
  Form,
  Container,
  Dropdown,
  Message,
  Progress,
  Image,
  Divider
} from "semantic-ui-react";

class EditFormula extends Component {
  state = {
    id: undefined,
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
    if (this.props.selectedFormula) {
      const formula = this.props.selectedFormula;
      this.setState({
        id: formula.id,
        title: formula.title,
        description: formula.description,
        category_id: formula.category_id,
        ingredients: formula.ingredients,
        directions: formula.directions,
        concerns: formula.concerns,
        image: formula.image,
        area: formula.area
      });
    }
  };

  //================================ percentage =================================
  sum = (array, key) => {
    return array.reduce(function(r, a) {
      return parseInt(r) + parseInt(a[key]);
    }, 0);
  };

  // sum = key => {
  //   return this.reduce((a, b) => a + (b[key] || 0), 0);
  // };

  checkIngredientsPercentage = () => {
    const sum = this.sum(this.state.ingredients, "percentage");

    if (sum > 100) {
      return true;
    }
  };

  // ============================== form changes =====================================

  handleFormChange = event => {
    // console.log(event.target.name);
    if (["percentage"].includes(event.target.name)) {
      let ingredients = [...this.state.ingredients];
      ingredients[event.target.dataset.id][event.target.name] =
        event.target.value;
      this.setState({ ingredients });
      this.checkIngredientsPercentage();
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleIngredientname = (event, data) => {
    console.log(data);
    let ingredients = [...this.state.ingredients];
    ingredients[data.id][data.name] = data.value;
    this.setState({ ingredients });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newFormula = this.state;
    this.props.editFormula(newFormula);
  };

  handleConcerns = (event, data) => {
    this.setState({ concerns: data.value });
  };

  // =================================== populate drop downs ==========================

  getAreaCategories = () => {
    if (!this.state.area) return null;

    const selectedArea = this.props.areas.find(
      area => area.name === this.state.area
    );
    if (!selectedArea) return null;
    // const categories = selectedArea.filter(area => area.categories);

    return selectedArea.categories.map(category => (
      <option value={category.id}>{category.name}</option>
    ));
  };

  // getAreaConcerns = () => {
  //   if (!this.state.area) return null;

  //   const selectedArea = this.props.areas.find(
  //     area => area.name === this.state.area
  //   );

  //   if (!selectedArea) return null;

  //   return selectedArea.concerns.map(
  //     (concern, index) => <option value={concern.name}>{concern.name} </option>
  //     // ({ key: index, text: concern.name, value: concern.id, name: "concerns" })
  //   );
  // };

  getAreaConcerns = () => {
    if (this.state.area === undefined) return;

    const selectedArea = this.props.areas.find(
      area => area.name === this.state.area
    );
    return selectedArea.concerns.map((concern, index) =>
      //  <option value={concern.name}>{concern.name} </option>
      ({ key: concern.name, text: concern.name, value: concern.id })
    );
  };

  createIngredientList = () => {
    return this.props.ingredients.map(ing => ({
      key: ing.name,
      text: ing.name,
      value: ing.name
    }));
  };

  addConcernTags = () => {
    const concerns = [];
    this.props.selectedFormula.concerns.map();
  };

  // ====================================== add new ingredient=====================================

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
    if (!this.props.selectedFormula) return <div>Loading edit form</div>;
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
            <select name="area" value={this.state.area}>
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

            {this.checkIngredientsPercentage() ? (
              <Message color="violet">
                The total of your ingredients can not exceed 100%
              </Message>
            ) : null}
            <Progress
              percent={this.sum(this.state.ingredients, "percentage")}
              color="sepiaSkin"
              progress
            />
          </div>

          <div className="ingredient_form">
            {this.state.ingredients.map((ingredient, index) => {
              return (
                <div key={index}>
                  {
                    <Form.Field>
                      <label>Ingredient Name</label>
                      {/* <select
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
                      </select> */}
                      <Dropdown
                        onChange={this.handleIngredientname}
                        value={ingredient.name}
                        placeholder="Select ingredeint"
                        search
                        id={index}
                        name="name"
                        selection
                        options={this.createIngredientList()}
                      />
                    </Form.Field>
                  }
                  <Form.Field>
                    <label>Percentage</label>
                    <input
                      name="percentage"
                      data-id={index}
                      type="number"
                      min="0"
                      max="100"
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

          {/* <label>Concerns</label>
          <Form.Field>
           
            <Dropdown
              onChange={this.handleConcerns}
              name="concerns"
              clearable
              fluid
              multiple
              search
              selection
              value={this.state.concerns}
              options={this.state.area ? this.getAreaConcerns() : null}
              placeholder="Select the concerns this formula helps"
            />
          </Form.Field> */}

          {/* // concerns tags */}
          {/* <Form.Field>
            <label>Image</label>
            <input
              type="url"
              name="image"
              placeholder="Image url"
              value={this.state.image}
            />
          </Form.Field> */}
          <br />
          {this.checkIngredientsPercentage() ? (
            <Message color="red">
              Please adjust your formula percentages. The total of all of the
              ingredients in the formula should add up to 100%
            </Message>
          ) : null}

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
