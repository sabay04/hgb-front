import React, { Component } from "react";
import homeBotanic from "../images/HomeBotanic.jpg";
import formulaBox from "../images/formulaBox.jpg";
import ingredientBox from "../images/IngredientBox.jpg";
import createBox from "../images/createFormula.jpg";
import { Container, Image, Grid } from "semantic-ui-react";
// app > home
class HomeContainer extends Component {
  state = {};
  render() {
    return (
      <Container className="home_wrapper">
        <div className="image_wrapper">
          <Image className="home_main_image" src={homeBotanic} alt="leaves" />
          <div class="image_text-centered">PURE • CLEAN • POWERFULL</div>
        </div>
        <Grid className="home_grid">
          <Grid.Row className="home_row" column={3}>
            <Grid.Column className="formula_box" width={4}>
              <Image src={formulaBox} />
              <button> Explore Formulas</button>
            </Grid.Column>
            <Grid.Column className="ingredient_box" width={4}>
              <Image src={ingredientBox} />
              <button> Explore Ingredients</button>
            </Grid.Column>
            <Grid.Column className="create_box" width={4}>
              <Image src={createBox} />
              <button> Create</button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default HomeContainer;
