/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    const { backgroundUrl, title, subtitle } = this.props;
    let { className } = this.props;
    const style = {
      'backgroundImage': `url(${backgroundUrl})`
    };
    if(!className) {
      className = '';
    }
    return (
      <header
        style={style}
        className={className}
        role="banner"
      >
        <div className="middle overlay">
          <span className="intro-text-small">{subtitle}</span>
          <h1 className="cursive-font">{title}</h1>
        </div>
      </header>
    );
  }
}

export default Header;
