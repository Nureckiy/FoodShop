import React, { Component } from 'react';

class TabItem extends Component {
  render() {
    const {children, active} = this.props;
    let {className} = this.props;
    if (active) {
      className += ' active';
    }
    return (
      <li className={className}>
        {children}
      </li>
    );
  }
}

export default TabItem;