import React, { Component } from "react";
import { Card, Image, Label, Grid } from "semantic-ui-react";

// app > formula details container > forumla details
const tagColours = ["tan", "plantation", "sepiaSkin", "oxley"];

class FormulaDetails extends Component {
  state = {};

  colour = () => {
    return tagColours[Math.floor(Math.random() * tagColours.length)];
  };

  render() {
    const {
      title,
      image,
      description,
      directions,
      category,
      area,
      ingredients,
      concerns,
      user_id
    } = this.props.formula;

    return (
      <Grid className="formula_details_wrapper">
        <Grid.Row>
          <Grid.Column className="formula_header">
            <Image
              className="formula_view_image"
              src={image}
              alt={title}
              size="large"
              floated="left"
            />
            <div className="header_content">
              <h1>{title}</h1>

              <h3>
                By: {user_id} &nbsp; Area: {area} &nbsp; Category: {category}
              </h3>

              <p>{description}</p>

              {concerns.map(concern => (
                <Label size={"big"} color={this.colour()}>
                  {concern.name}
                </Label>
              ))}
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="detail_info">
          <Grid.Column className="formula_ingredients" width={4}>
            <h2>Ingredients</h2>

            {ingredients.map(ingredient => (
              <p>
                •{ingredient.name} - {ingredient.percentage}%
              </p>
            ))}
          </Grid.Column>

          <Grid.Column className="formula_directions" width={11}>
            <h2>Directions</h2>
            <p>{directions}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FormulaDetails;

{
  /* <Container className="formula_details_wrapper">
  <div className="formula_header">
    <img src={image} alt={title} />
    <h1>{title}</h1>
    <h4>
      By:{user_id} {area} {category}
    </h4>
    <p>{description}</p>
    {concerns.map(concern => (
      <div className="concern-tag">
        <p>•{concern.name}</p>
      </div>
    ))}
  </div>

  <div className="formula_ingredients">
    <h2>Ingredients</h2>
    <ul>
      {ingredients.map(ingredient => (
        <li>
          {ingredient.name} - {ingredient.percentage}%
        </li>
      ))}
    </ul>
  </div>

  <div className="formula_directions">
    <h2>Directions</h2>
    <p>{directions}</p>
  </div>
</Container>; */
}
