import React, { Component } from "react";
import { Card, Icon, Image, Label } from "semantic-ui-react";

const tagColours = ["tan", "plantation", "sepiaSkin", "oxley"];

// const tagColours = [
//   "sienna",
//   "rosybrown",
//   "saddlebrown",
//   "darkgreen",
//   "	darkseagreen",
//   "darkolivegreen"
// ];

const colour = () => {
  return tagColours[Math.floor(Math.random() * tagColours.length)];
};

// let colour = tagColours[Math.floor(Math.random() * tagColours.length)];

// app > explore > cardBlockContainer > card  this.props.selectedItem(formula.id)
const FormulaCard = ({ formula, selectedItem }) => {
  return (
    <Card className="explore_card" onClick={() => selectedItem(formula.id)}>
      <Image src={formula.image} alt={formula.title} />
      <Card.Content>
        <Card.Meta>{formula.area}</Card.Meta>
        <Card.Header>{formula.title}</Card.Header>
        <Card.Meta>{formula.category}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {formula.concerns.map(concern => (
          <Label color={colour()}>{concern.name}</Label>
        ))}
      </Card.Content>
    </Card>
  );
};

export default FormulaCard;
