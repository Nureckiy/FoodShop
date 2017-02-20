/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    const { backgroundUrl, title, subtitle } = this.props;
    let { className } = this.props;
    if (!className)
      className = '';
    const style = {
      'backgroundImage': `url(${backgroundUrl})`
    };
    return (
      <header
        style={style}
        className={'gtco-cover gtco-cover-sm ' + className}
        role="banner"
        data-stellar-background-ratio="0.5"
        id="gtco-header"
      >
        <div className="overlay"></div>
        {(title || subtitle) &&
          <div className="gtco-container">
            <div className="row">
              <div className="col-md-12 col-md-offset-0 text-center">
                <div className="row row-mt-15em">
                  <div className="col-md-12 mt-text animate-box" data-animate-effect="fadeInUp">
                    <span className="intro-text-small">{subtitle}</span>
                    <h1 className="cursive-font">{title}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </header>
    );
  }
}

export default Header;
