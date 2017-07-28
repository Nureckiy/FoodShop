import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

class Tile extends Component {
  handleOptionsBtnClick(event) {
    const { onOptionsBtnClick } = this.props;
    event.stopPropagation();
    onOptionsBtnClick(event);
  }
  render() {
    const {item: {name, description, imageUrl, coverUrl}, onClick, price, withOptionsBtn } = this.props;
    let image = imageUrl ? imageUrl : coverUrl;
    return (
      <div className="col-lg-4 col-md-4 col-sm-6">
        <a className="card" onClick={onClick}>
          <figure>
            <div className="overlay">
              <Glyphicon glyph="plus" className="centered plus-btn"/>
              { withOptionsBtn &&
              <Glyphicon glyph="cog" className="pull-right settings-btn"
                         onClick={this.handleOptionsBtnClick.bind(this)}/>
              }
            </div>
            <img src={image} alt="Image" className="img-responsive"/>
          </figure>
          <div className="card-subtitle">
            <h2>{name}</h2>
            <p>{description}</p>
            {price && <p><span className="price cursive-font">{price}</span></p>}
          </div>
        </a>
      </div>
    );
  }
}

export default Tile;