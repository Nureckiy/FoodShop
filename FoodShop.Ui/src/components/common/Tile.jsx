import React, { Component } from 'react';

class Tile extends Component {
  render() {
    const { item : { name, description, imageUrl, coverUrl }, onClick, price } = this.props;
    let image = imageUrl ? imageUrl : coverUrl;
    return (
      <div className="col-lg-4 col-md-4 col-sm-6" onClick={onClick}>
        <a className="card">
          <figure>
            <div className="overlay"><i className="glyphicon glyphicon-plus"/></div>
            <img src={image} alt="Image" className="img-responsive" />
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