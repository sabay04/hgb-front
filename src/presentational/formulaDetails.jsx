import React, { Component } from "react";

// app > formula details container > forumla details
class FormulaDetails extends Component {
  state = {};
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
      <div>
        <h1>FORMULA DETAILS </h1>

        <div className="formula-details-header">
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
        <div className="formula-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map(ingredient => (
              <li>
                {ingredient.name} - {ingredient.percentage}%
              </li>
            ))}
          </ul>
          <div className="formula-directions">
            <h2>Directions</h2>
            <p>{directions}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FormulaDetails;
