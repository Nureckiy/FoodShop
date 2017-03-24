/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';


class RoomTile extends Component {
  render() {
    const { guestsNumber, imageUrl, price, description, children } = this.props;
    return (
      <div className="row sample">
        <div className="col-md-2 col-sm-4 date-form">
          <img src={imageUrl} />
        </div>
        <div className="col-md-2 col-sm-8 date-form">
          <p>
            <b>Количество мест:</b> { guestsNumber }<br />
            <b>Цена:</b><span className="cursive-font">${price}</span>
          </p>
        </div>
        <div className="col-md-5 col-sm-12 date-form">
          <p>{description}</p>
        </div>
        { children }
      </div>
    );
  }
}

export default RoomTile;