import React from 'react';

const RoomTile = ({ imageUrl, price, description, className, category, translate }) => (
  <div className={className}>
    <div className="col-md-3 col-sm-5">
      <img className="view" src={imageUrl} />
    </div>
    <div className="col-md-3 col-sm-7">
      <h4 className="cursive-font">{ category.name }</h4><br />
      <b>{translate('guestsQuantity')}:</b> { category.guestsNumber }<br />
      <b>{translate('price')}:</b><span className="cursive-font">${price}</span>
    </div>
    <div className="col-md-6 col-sm-12">
      <p className="text-justify">{description}</p>
    </div>
  </div>
);

export default RoomTile;