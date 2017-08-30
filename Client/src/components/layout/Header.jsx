import React from 'react';

const Header = (props) => {
  const { backgroundUrl, title, subtitle } = props;
  let { className, style } = props;
  if(!className) {
    className = '';
  }
  if (backgroundUrl) {
    style = Object.assign({}, style, { backgroundImage: `url(${backgroundUrl})`});
  }
  return (
    <header
      style={style}
      className={'row ' + className}
      role="banner">
      <div className="middle overlay">
        <span className="intro-text-small">{subtitle}</span>
        <h1 className="cursive-font">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
