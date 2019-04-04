import React, { Component } from "react";

// app > explore > cardBlockContainer > card  this.props.selectedItem(formula.id)
const FormulaCard = ({ formula, selectedItem }) => {
  return (
    <div className="card" onClick={() => selectedItem(formula.id)}>
      <img src={formula.image} alt={formula.title} />
      <div className="card_content">
        <h3>{formula.area}</h3>
        <h1>{formula.title}</h1>
        <h4>{formula.category}</h4>
        <div className="concern_tags">
          {formula.concerns.map(concern => (
            <div className="concern_tag">
              {" "}
              <p>{concern.name}</p>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormulaCard;
