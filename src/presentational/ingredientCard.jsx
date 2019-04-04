import React, { Component } from "react";

// app > explore > cardBlockContainer > card
const IngredientCard = ({ ingredient, selectedItem }) => {
  return (
    <div class="card" onClick={() => selectedItem(ingredient.id)}>
      <img src={ingredient.image} alt={ingredient.title} />
      <div className="card_content">
        <h3>{ingredient.category}</h3>
        <h1>{ingredient.name}</h1>
        <h4>{ingredient.scientific_name}</h4>
        <div className="concern_tags">
          {ingredient.concerns.map(concern => (
            <div className="concern_tag">
              <p>{concern.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
