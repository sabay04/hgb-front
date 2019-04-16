import React, { Component } from "react";
import {
  Card,
  Icon,
  Image,
  Label,
  Divider,
  Placeholder,
  Header,
  Container
} from "semantic-ui-react";

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

class IngredientCard extends Component {
  state = {
    extra: false
  };

  handleHover = () => {
    this.setState({
      extra: !this.state.extra
    });
  };

  showIngredientConcerns = () => {
    return (
      <div>
        <Divider />
        {this.props.ingredient.concerns.map(concern => (
          <Label color={colour()}>{concern.name}</Label>
        ))}
      </div>
    );
  };

  render() {
    const { ingredient, selectedItem } = this.props;
    return (
      <Container
        // className="card"
        className="explore_card"
        onClick={() => selectedItem(ingredient.id)}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <Image src={ingredient.image} alt={ingredient.name} />
        <div className="card_content">
          <Header.Subheader className="card_type">
            {ingredient.category}
          </Header.Subheader>
          <Header className="card_title">{ingredient.name}</Header>
          <Header.Subheader className="card_subtitle">
            {ingredient.scientific_name}
          </Header.Subheader>
        </div>
        {this.state.extra ? this.showIngredientConcerns() : null}
      </Container>
    );
  }
}

export default IngredientCard;

{
  /* <Card
className="card"
onClick={() => selectedItem(ingredient.id)}
onMouseEnter={this.handleHover}
onMouseLeave={this.handleHover}
>
<Image src={ingredient.image} alt={ingredient.name} />
<Card.Content>
  <Card.Meta className="card_type">{ingredient.category}</Card.Meta>
  <Card.Header className="card_title">{ingredient.name}</Card.Header>
  <Card.Meta className="card_subtitle">
    {ingredient.scientific_name}
  </Card.Meta>
</Card.Content>
{this.state.extra ? this.showIngredientConcerns() : null}
</Card> */
}
