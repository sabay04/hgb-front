import React, { Component } from "react";

class IngredientDetails extends Component {
  state = {};
  render() {
    const {
      name,
      image,
      description,
      scientific_name,
      category,
      concerns,
      suited_formulas
    } = this.props.ingredient;
    return (
      <div>
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
      </div>
    );
  }
}

export default IngredientDetails;
