import React, { Component } from 'react';

class RoomTile extends Component {
  render() {
    const { imageUrl, price, description, className, category } = this.props;
    return (
      <div className={className}>
        <div className="col-md-3 col-sm-4 date-form">
          <img src={imageUrl} />
        </div>
        <div className="col-md-3 col-sm-8 date-form">
          <h4 className="cursive-font">{ category.name }</h4><br />
          <b>Количество мест:</b> { category.guestsNumber }<br />
          <b>Цена:</b><span className="cursive-font">${price}</span>
        </div>
        <div className="col-md-6 col-sm-12 date-form">
          <p className="text-justify">{description}</p>
        </div>
      </div>
    );
  }
}

export default RoomTile;