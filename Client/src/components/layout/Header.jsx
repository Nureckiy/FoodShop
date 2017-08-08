import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { backgroundUrl, title, subtitle, style } = this.props;
    let { className } = this.props;
    if(!className) {
      className = '';
    }
    let headerStyleOptions = { ...style };
    if (backgroundUrl) {
      headerStyleOptions.backgroundImage = `url(${backgroundUrl})`;
    }
    return (
      <header
        style={headerStyleOptions}
        className={'row ' + className}
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
