import React from 'react';

const Header = (props) => {
  const { backgroundUrl, title, subtitle } = props;
  let { style } = props;
  if (backgroundUrl) {
    style = Object.assign({}, style, { backgroundImage: `url(${backgroundUrl})`});
  }
  return (
    <header
      style={style}
      className={composeClassName()}
      role="banner">
      <div className="middle overlay">
        {props.big && <span>
          <span className="intro-text-small">{subtitle && subtitle.toUpperCase()}</span>
          <h1 className="cursive-font">{title}</h1>
        </span>}
      </div>
    </header>
  );

  function composeClassName() {
    let className = 'row ';
    if (props.className) className += props.className;
    if (props.big) className += ' banner';
    return className;
  }
};



export default Header;
