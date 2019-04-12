import React, { Component } from "react";
import {
  Form,
  Container,
  Dropdown,
  Message,
  Progress
} from "semantic-ui-react";
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

  sum(array, key) {
    return array.reduce(function(r, a) {
      return r + a[key];
    }, 0);
  }

  // sum = key => {
  //   return this.reduce((a, b) => a + (b[key] || 0), 0);
  // };

  checkIngredientsPercentage = () => {
    const sum = this.sum(this.state.ingredients, "percentage");
    console.log(sum);
    if (sum > 100) {
      return true;
    }
  };

  // handlePercentChange = event => {
  //   // if (["percentage"].includes(event.target.name)) {
  //   //   let ingredients = [...this.state.ingredients];
  //   //   ingredients[event.target.dataset.id][event.target.name] =
  //   //     event.target.value;
  //   //   this.setState({ ingredients });
  //   //   this.checkIngredientsPercentage();
  //   // }
  //   // if (["percentage"].includes(event.target.name)){
  //   //   this.checkIngredientsPercentage();
  //   // }
  // };

  handleFormChange = event => {
    // console.log(event.target.name);
    if (["percentage"].includes(event.target.name)) {
      let ingredients = [...this.state.ingredients];
      ingredients[event.target.dataset.id][event.target.name] = parseInt(
        event.target.value
      );
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

  // handleFormChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  handleSubmit = event => {
    event.preventDefault();
    const newFormula = this.state;
    this.props.addNewFormula(newFormula);
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

  handleConcerns = (event, data) => {
    this.setState({ concerns: data.value });
  };

  // handleConcernAddition = event => {
  //   console.log(event.target);
  //   this.setState({
  //     concerns: [...this.state.concerns, event.target.value]
  //   });
  // };

  render() {
    return (
      <Container className="formula_form">
        <h1 className="formula_form_title">Create a new formula</h1>
        <Form
          className="formula_form"
          onSubmit={this.handleSubmit}
          onChange={this.handleFormChange}
        >
          <Form.Field>
            <label>Title</label>
            <input type="text" name="title" placeholder="Title" />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <textarea name="description" placeholder="Description" />
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
            <select name="category_id">
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
                      {/* <select name="name" data-id={index}>
                        <option value="" disabled selected>
                          Ingredient name
                        </option>
                        {this.props.ingredients.map(ing => (
                          <option value={ing.name}>{ing.name}</option>
                        ))}
                      </select> */}
                      <Dropdown
                        onChange={this.handleIngredientname}
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
                      // value={ingredient.percentage}
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
            <textarea name="directions" placeholder="Directions" />
          </Form.Field>

          <Dropdown
            onChange={this.handleConcerns}
            name="concerns"
            clearable
            fluid
            multiple
            search
            selection
            options={this.state.area ? this.getAreaConcerns() : null}
            placeholder="Select the concerns this formula helps"
          />

          {/* <Form.Field>
            <label>Concerns</label>
            <select name="concerns">
              <option value="" disabled selected>
                Concerns
              </option>
              {this.state.area ? this.getAreaConcerns() : null}
            </select>
          </Form.Field> */}
          {/* // concerns tags */}
          <Form.Field>
            <label>Image</label>
            <input type="url" name="image" placeholder="Image url" />
          </Form.Field>
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

export default FormulaForm;
