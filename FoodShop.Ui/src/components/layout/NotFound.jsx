import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <p>Page Not Found. Retun to <Link to="/menu">Main</Link> page?</p>
    );
  }
}

export default NotFound;