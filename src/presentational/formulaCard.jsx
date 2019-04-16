import React, { Component } from "react";
import { Card, Icon, Image, Label, Header, Container } from "semantic-ui-react";

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
    <Container
      className="explore_card"
      onClick={() => selectedItem(formula.id)}
    >
      <div className="card_top">
        <Image src={formula.image} alt={formula.title} />
        <div className="card_content">
          <Header.Subheader>{formula.area}</Header.Subheader>
          <Header>{formula.title}</Header>
          <Header.Subheader>{formula.category}</Header.Subheader>
        </div>
      </div>
      <div className="extra-concerns">
        {formula.concerns.map(concern => (
          <Label color={colour()}>{concern.name}</Label>
        ))}
      </div>
    </Container>
  );
};

export default FormulaCard;

// <Card className="explore_card" onClick={() => selectedItem(formula.id)}>
// <Image src={formula.image} alt={formula.title} />
// <Card.Content>
//   <Card.Meta>{formula.area}</Card.Meta>
//   <Card.Header>{formula.title}</Card.Header>
//   <Card.Meta>{formula.category}</Card.Meta>
// </Card.Content>
// <Card.Content extra>
//   {formula.concerns.map(concern => (
//     <Label color={colour()}>{concern.name}</Label>
//   ))}
// </Card.Content>
// </Card>
