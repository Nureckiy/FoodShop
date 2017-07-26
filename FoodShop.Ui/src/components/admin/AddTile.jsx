import React from 'react';

const AddTile = (props) => {
  const { onClick } = props;
  return (
    <div className="row">
      <div className="col-sm-4 col-sm-offset-4 top-indent">
        <a className="card active" onClick={ onClick }>
          <figure>
            <div className="overlay"><i className="glyphicon glyphicon-plus"/></div>
          </figure>
        </a>
      </div>
    </div>
  );
};

export default AddTile;