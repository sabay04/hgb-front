import React, { Component } from "react";
import FormulaDetails from "../presentational/formulaDetails";
import { Link } from "react-router-dom";
import { Dimmer, Loader, Image, Segment, Popup } from "semantic-ui-react";
import liked from "../images/likeHeart.png";
import unliked from "../images/unlikeHeart.png";
// app > formula details container
class FormulaDetailsContainer extends Component {
  state = {
    // favourite: false
  };

  // isFavourite = () => {
  //   return !!this.props.allFavourites.find(
  //     favourite =>
  //       favourite.user_id === this.props.currentUser.id &&
  //       favourite.formula_id === this.props.formula.id
  //   );
  // };

  handleBookmarkClick = () => {
    // this.setState({ favourite: !this.state.favourite }, () => {
    if (this.props.isFavourite(parseInt(this.props.match.params.formulaId))) {
      this.props.unfavourite(parseInt(this.props.match.params.formulaId));
      // unfavourite message
    } else {
      this.props.favourite(parseInt(this.props.match.params.formulaId));
      // favourite message
    }
    // });
  };

  renderOptions = () => {
    if (this.props.currentUser.id === this.props.formula.user_id) {
      return this.renderEditorDelete();
    } else {
      return this.renderBookmark();
    }
  };

  renderEditorDelete = () => {
    return (
      <div className="edit_or_delete">
        {" "}
        <Link to={`/formulas/${this.props.formula.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => this.props.deleteFormula()}>Delete</button>{" "}
      </div>
    );
  };

  renderBookmark = () => {
    return (
      //       <Popup
      //   trigger={<Button icon='add' />}
      //   content="The default theme's basic popup removes the pointing arrow."
      //   basic
      // />
      <Image
        onClick={this.handleBookmarkClick}
        className="bookmark"
        size={"mini"}
        src={
          this.props.isFavourite(parseInt(this.props.match.params.formulaId))
            ? liked
            : unliked
        }
      />
    );
  };

  render() {
    if (!this.props.formula)
      return (
        <Loader className="loader" active inline="centered" size="large">
          Loading
        </Loader>
      );
    return (
      <div>
        {this.renderOptions()}
        <FormulaDetails
          currentUser={this.props.currentUser}
          formula={this.props.formula}
        />
      </div>
    );
  }
}

export default FormulaDetailsContainer;
