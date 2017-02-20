import React, { Component } from 'react';

class TabItem extends Component {
  render() {
    const {children, onClick, active, tabName} = this.props;
    let {className} = this.props;
    if (active) {
      className += ' active';
    }
    return (
      <li className={className} onClick={() => onClick(tabName)}>
        {children}
      </li>
    );
  }
}

export default TabItem;