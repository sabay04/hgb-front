import React, { Component } from "react";
import {
  Card,
  Image,
  Label,
  Grid,
  Dropdown,
  Input,
  Select,
  Popup
} from "semantic-ui-react";

// app > formula details container > forumla details
const tagColours = ["tan", "plantation", "sepiaSkin", "oxley"];

const units = [
  { key: "ounces", text: "oz", value: "oz" },
  { key: "grams", text: "g", value: "g" },
  { key: "mililiters", text: "ml", value: "ml" }
];

class FormulaDetails extends Component {
  state = {
    unit: "",
    formulaTotal: 0
  };

  colour = () => {
    return tagColours[Math.floor(Math.random() * tagColours.length)];
  };

  // ============================================== formula qty functions ==========================================================

  handleFormulaQty = event => {
    this.setState({
      formulaTotal: parseInt(event.target.value)
    });
  };

  handleUnits = (event, data) => {
    console.log(data);
    this.setState({
      unit: data.value
    });
  };

  calculateFormula = percent => {
    const total = this.state.formulaTotal;
    const qty = (percent / 100) * total;
    return qty;
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
      user
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
                By: {user.username} &nbsp; Area: {area} &nbsp; Category:{" "}
                {category}
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
            <div className="formula_qty">
              <Popup
                trigger={
                  <Input
                    label={
                      <Dropdown
                        onChange={this.handleUnits}
                        placeholder="Units"
                        defaultValue=""
                        options={units}
                      />
                    }
                    labelPosition="right"
                    placeholder="total quantity"
                    onChange={this.handleFormulaQty}
                  />
                }
                content="Calculate formula ingredients based on the total amount you want to make"
                size="large"
              />
            </div>
            {/* <div className="formula_qty">
              {/* <label>
                {" "}
                Convert ingredient list to grams by entering the formula total
                and grams bellow{" "}
              </label> */}
            {/* <Input
                label={
                  <Dropdown
                    onChange={this.handleUnits}
                    defaultValue="%"
                    options={units}
                  />
                }
                labelPosition="right"
                placeholder="total quantity"
                onChange={this.handleFormulaQty}
              />
            </div> */}
            {ingredients.map(ingredient => (
              <p>
                •{ingredient.name} - <i>{ingredient.percentage}%</i> ...{" "}
                {this.calculateFormula(ingredient.percentage)} {this.state.unit}
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
