import React from 'react';

import { contactInfo } from '!json!../../sources/appVariables.json';

const Footer = () => (
  <footer role="contentinfo" className="row">
    <div className="overlay"/>
    <div className="container-fluid">
      <div className="top-info">
        <h3>МЫ НА СВЯЗИ</h3>
        <ul>
          <li><a href={`tel://${ contactInfo.phone }`}><i className="icon-phone"/>{ contactInfo.phone }</a></li>
          <li><a href={`mailto:${ contactInfo.email }`}><i className="icon-mail2"/>{ contactInfo.email }</a></li>
        </ul>
      </div>
      <div className="copyright">
        <p>
          <span className="block">&copy; { new Date().getFullYear() } HOHOTEL. Все права в кармане.</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;