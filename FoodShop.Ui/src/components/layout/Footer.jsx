import React, { Component } from 'react';

import { contactInfo } from '!json!../../sources/appVariables.json';

class Footer extends Component {
  render() {
    const { phone, email } = contactInfo;
    return (
      <footer role="contentinfo" className="row">
        <div className="overlay"/>
        <div className="container-fluid">
          <div className="top-info">
            <h3>МЫ НА СВЯЗИ</h3>
            <ul>
              <li><a href={`tel://${ phone }`}><i className="icon-phone"/>{ phone }</a></li>
              <li><a href={`mailto:${ email }`}><i className="icon-mail2"/>{ email }</a></li>
            </ul>
          </div>
          <div className="copyright">
            <p>
              <span className="block">&copy; 2017 FoodShop. Все права в кармане.</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;