import React from 'react';

import loader from '../../sources/img/loader.gif';

const LoadingComponent = (props) => {
  const { showLoader, children, small } = props;
  if (showLoader) {
    return (
      <img className={small ? 'loader small' : 'loader'} src={loader}/>
    );
  }
  return children ? children : <span />;
};

export default LoadingComponent;