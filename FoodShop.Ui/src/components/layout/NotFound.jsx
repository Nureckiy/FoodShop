import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <p>Page Not Found. Return to <Link to="/menu">Main</Link> page?</p>
    );
  }
}

export default NotFound;