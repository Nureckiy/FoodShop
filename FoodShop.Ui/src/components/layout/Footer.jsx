import React, { Component } from 'react';

import contactInfo from '!json!../../sources/contactInfo.json';

class Footer extends Component {
  render() {
    return (
      <footer role="contentinfo" className="row">
        <div className="overlay"></div>
        <div className="container-fluid">
          <div className="top-info">
            <h3>МЫ НА СВЯЗИ</h3>
            <ul>
              <li><a href={`tel://${contactInfo.phone}`}><i className="icon-phone"/>{contactInfo.phone}</a></li>
              <li><a href={`mailto:${contactInfo.email}`}><i className="icon-mail2"/>{contactInfo.email}</a></li>
            </ul>
          </div>
          <div className="copyright">
            <p>
              <span className="block">&copy; 2017 FoodShop. Все права в кармане.</span>
              <span className="block">{contactInfo.develop}</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;