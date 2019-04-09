import React, { Component } from "react";
import { Card, Icon, Image, Label, Divider } from "semantic-ui-react";

const tagColours = ["tan", "plantation", "sepiaSkin", "oxley", "roseFog"];

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

// app > explore > cardBlockContainer > card
const IngredientCard = ({ ingredient, selectedItem }) => {
  return (
    // <div class="card" onClick={() => selectedItem(ingredient.id)}>
    //   <img src={ingredient.image} alt={ingredient.title} />
    //   <div className="card_content">
    //     <h3>{ingredient.category}</h3>
    //     <h1>{ingredient.name}</h1>
    //     <h4>{ingredient.scientific_name}</h4>
    //     <div className="concern_tags">
    //       {ingredient.concerns.map(concern => (
    //         <div className="concern_tag">
    //           <p>{concern.name}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <Card className="card" onClick={() => selectedItem(ingredient.id)}>
      <Image src={ingredient.image} alt={ingredient.name} />
      <Card.Content>
        <Card.Meta className="card_type">{ingredient.category}</Card.Meta>
        <Card.Header className="card_title">{ingredient.name}</Card.Header>
        <Card.Meta className="card_subtitle">
          {ingredient.scientific_name}
        </Card.Meta>
      </Card.Content>
      {/* <Divider /> */}
      <Card.Content extra>
        {ingredient.concerns.map(concern => (
          <Label color={colour()}>{concern.name}</Label>
        ))}
      </Card.Content>
    </Card>
  );
};

export default IngredientCard;

{
  /* <Card className="card" onClick={() => selectedItem(ingredient.id)}>
  <Image src={ingredient.image} alt={ingredient.name} />
  <Card.Content>
    <Card.Meta>{ingredient.category}</Card.Meta>
    <Card.Header>{ingredient.name}</Card.Header>
    <Card.Meta>{ingredient.scientific_name}</Card.Meta>
  </Card.Content>
  <Card.Content extra>
    {formula.concerns.map(concern => (
      <Label color={colour()}>{concern.name}</Label>
    ))}
  </Card.Content>
</Card>; */
}
