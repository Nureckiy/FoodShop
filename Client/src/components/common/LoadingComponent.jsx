import React from 'react';

import loader from '../../sources/img/loader.gif';

const LoadingComponent = (props) => {
  const { showLoader, children } = props;
  if (showLoader) {
    return (
      <img className="loader" src={loader}/>
    );
  }
  return children;
};

export default LoadingComponent;