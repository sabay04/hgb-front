import React, { Component } from "react";
import { Card, Image, Label, Grid } from "semantic-ui-react";

const tagColours = ["tan", "plantation", "sepiaSkin", "oxley"];

class IngredientDetails extends Component {
  state = {};

  colour = () => {
    return tagColours[Math.floor(Math.random() * tagColours.length)];
  };

  createSuggestedFormulaList = () => {
    const formulaList = this.props.ingredient.suited_formulas.split(",");
    return formulaList;
  };
  render() {
    const {
      name,
      image,
      description,
      scientific_name,
      category,
      concerns
    } = this.props.ingredient;

    return (
      <Grid className="ingredient_details_wrapper">
        <Grid.Row>
          <Grid.Column className="ingredient_header">
            <Image
              src={image}
              alt={name}
              size="large"
              floated="left"
              className="Ingredient_view_image"
            />
            <div className="header_content">
              <h1>{name}</h1>
              <h4>{category}</h4>
              <h4>{scientific_name}</h4>
              {concerns.map(concern => (
                <Label size={"big"} color={this.colour()}>
                  {concern.name}
                </Label>
              ))}
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="detail_info">
          <Grid.Column className="ingredeint_formula_suggestions" width={4}>
            <h2>Suggested Formulas</h2>

            {this.createSuggestedFormulaList().map(formula => (
              <p>•{formula}</p>
            ))}
          </Grid.Column>

          <Grid.Column className="ingredeint_formula_description" width={11}>
            <h2>Description</h2>
            <p>{description}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default IngredientDetails;

{
  /* <div>
<div>
  <img src={image} alt={name} />
  <h1>{name}</h1>
  <h4>{category}</h4>
  <h4>{scientific_name}</h4>
  {concerns.map(concern => (
    <div className="concern-tag">
      <p>•{concern.name}</p>
    </div>
  ))}
</div>
<div className="ingredeint_formula_suggestions">
  <h3>Suggested Formulas</h3>
  <p>{suited_formulas}</p>
</div>

<div className="ingredeint_formula_suggestions">
  <h3>Description</h3>
  <p>{description}</p>
</div>
</div> */
}
