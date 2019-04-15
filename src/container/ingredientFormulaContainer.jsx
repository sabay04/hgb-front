import React, { Component } from "react";
import CardBlockContainer from "./cardBlockContainer";
import { Card, Image, Label, Grid } from "semantic-ui-react";

const tagColours = ["tan", "plantation", "sepiaSkin", "oxley"];

class IngredientFormulaContainer extends Component {
  state = {};

  colour = () => {
    return tagColours[Math.floor(Math.random() * tagColours.length)];
  };

  findIngredientFormulas = () => {
    return this.props.formulas.filter(item =>
      item.ingredients.some(
        ingredient => ingredient.id === this.props.ingredient.id
      )
    );
  };

  render() {
    if (!this.props.ingredient) return <div>Loading formulas</div>;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column className="ingredient_header">
              <Image
                src={this.props.ingredient.image}
                alt={this.props.ingredient.name}
                size="large"
                floated="left"
                className="Ingredient_view_image"
              />
              <div className="header_content">
                <h1>{this.props.ingredient.name}</h1>
                <h4>{this.props.ingredient.category}</h4>
                <h4>{this.props.ingredient.scientific_name}</h4>
                {this.props.ingredient.concerns.map(concern => (
                  <Label size={"big"} color={this.colour()}>
                    {concern.name}
                  </Label>
                ))}
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <div className="my_formulas_wrapper">
              <CardBlockContainer
                list={this.findIngredientFormulas()}
                selectedItem={this.setSelectedFormula}
              />
            </div>
          </Grid.Row>
        </Grid>
        {/*
       
        </div> */}
        {/* <div className="my_formulas_wrapper">
          <CardBlockContainer
            list={this.findIngredientFormulas()}
            selectedItem={this.setSelectedFormula}
          />
        </div> */}
      </div>
    );
  }
}

export default IngredientFormulaContainer;
