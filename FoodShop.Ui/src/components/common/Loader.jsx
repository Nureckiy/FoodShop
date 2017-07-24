import React, { Component } from 'react';

import loader from '../../sources/img/loader.gif';

class Loader extends Component {
  render() {
    return (
      <img className="loader" src={loader} />
    );
  }
}

export default Loader;