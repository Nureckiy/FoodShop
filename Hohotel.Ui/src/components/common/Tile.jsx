import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Tile = props => {
  const {item: {name, description, imageUrl, coverUrl}, onClick, price, withOptionsBtn, className } = props;
  let image = imageUrl ? imageUrl : coverUrl;
  return (
    <div className={className}>
      <a className="card" onClick={onClick}>
        <figure>
          <div className="overlay">
            <Glyphicon glyph="plus" className="centered plus-btn"/>
            { withOptionsBtn &&
            <Glyphicon glyph="cog" className="pull-right settings-btn"
                       onClick={handleOptionsBtnClick}/>
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

  function handleOptionsBtnClick(event) {
    event.stopPropagation();
    props.onOptionsBtnClick(event);
  }
};

export default Tile;