import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const AddTile = (props) => {
  const { onClick, className } = props;
  return (
    <div className={'solid ' + className}>    
      <a className="card active" onClick={ onClick }>
        <figure>
          <div className="overlay"><Glyphicon glyph="plus" className="centered plus-btn"/></div>
        </figure>
      </a>
    </div>
  );
};

export default AddTile;