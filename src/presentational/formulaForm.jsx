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

import Dropzone from "react-dropzone";
import request from "superagent";
// import {
//   Image,
//   Video,
//   Transformation,
//   CloudinaryContext
// } from "cloudinary-react";

const CLOUDINARY_UPLOAD_PRESET = "vgvyrowl";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/sabay/image/upload";

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
    image: "",
    imagePublicId: ""
  };

  // =========================================================== image upload =============================================================================

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });
    console.log(files);
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          image: response.body.secure_url,
          imagePublicId: response.body.public_id
        });
        console.log(response);
      }
    });
  };

  handleRemoveImage = id => {
    request
      .del(CLOUDINARY_UPLOAD_URL)
      .send({ id: id })
      .set("Accept", "application/json")
      .end(function(err, res) {
        console.log(res);
      });
  };
  //========================================================== percentage calculations ==============================================================

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
    console.log(sum);
    if (sum > 100) {
      return true;
    }
  };

  //==================================== form changes ===============================

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
          <br />
          <label>Concerns</label>
          <Form.Field>
            <Dropdown
              onChange={this.handleConcerns}
              name="concerns"
              clearable
              fluid
              multiple
              search
              selection
              color={"red"}
              options={this.state.area ? this.getAreaConcerns() : null}
              placeholder="Select the concerns this formula helps"
            />
          </Form.Field>

          {/* <Form.Field>
            <label>Image</label>
            <input type="url" name="image" placeholder="Image url" />
          </Form.Field> */}
          <div className="image_dropzone">
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              accept="image/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {<h5>Drop image here</h5>}
                    <Divider horizontal>Or</Divider>
                    <button> Select image </button>
                  </div>
                );
              }}
            </Dropzone>
          </div>

          <div>
            {this.state.image === "" ? null : (
              <div>
                <h5>{this.state.uploadedFile.name}</h5>
                <Image size={"small"} src={this.state.image} />
              </div>
            )}
          </div>

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
