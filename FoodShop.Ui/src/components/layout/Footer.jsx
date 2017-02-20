import React, { Component } from 'react';

import contactInfo from '!json!../../sources/contactInfo.json';

class Footer extends Component {
  render() {
    return (
      <footer id="gtco-footer" role="contentinfo" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="gtco-container">
          <div className="row row-pb-md">

            <div className="col-md-12 text-center">
              <div className="gtco-widget">
                <h3>Мы на связи</h3>
                <ul className="gtco-quick-contact">
                  <li><a href={`tel://${contactInfo.phone}`}><i className="icon-phone"/>{contactInfo.phone}</a></li>
                  <li><a href={`mailto:${contactInfo.email}`}><i className="icon-mail2"/>{contactInfo.email}</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-12 text-center copyright">
              <p><small className="block">&copy; 2017 FoodShop. Все права в кармане.</small>
                <small className="block">{contactInfo.develop}</small></p>
            </div>

          </div>


        </div>
      </footer>
    );
  }
}

export default Footer;