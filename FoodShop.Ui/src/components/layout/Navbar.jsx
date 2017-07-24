/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import { ButtonToolbar, MenuItem, NavDropdown } from 'react-bootstrap';
import { mainCategories } from '!json!../../sources/appVariables.json';

class Navbar extends Component {
  renderClass(tabName, className) {
    const { pathname } = this.props;
    if (!className) {
      className = '';
    }
    return pathname.includes(tabName) ? className + ' active' : className;
  }
  render() {
    const { auth } = this.props;
    const profile = auth.getProfile();
    return (
      <nav className="row">
          <div className="container">
            <div className="col-sm-3 hidden-xs">
              <div id="logo"><a href="#">FOODSHOP <em>.</em></a></div>
            </div>
            <div className="col-sm-9">
              <ButtonToolbar className="pull-right">
                {auth.isAdmin() &&
                  <li className={this.renderClass('admin')}>
                    <a href="#/admin/">Админ</a>
                  </li>
                }
                <li className={this.renderClass('booking')}>
                  <a href="#/booking/">Номера</a>
                </li>
                <NavDropdown className={this.renderClass('menu')} title="Ресторан" noCaret id="menu-category" href="#/menu/">
                  {Object.keys(mainCategories).map(key =>
                    <MenuItem
                      key={key}
                      eventKey={key}
                      href={`#/menu/${key}`}
                    >
                      {mainCategories[key]}
                    </MenuItem>
                  )}
                </NavDropdown>
                <li className={this.renderClass('contacts')}>
                  <a href="#/contacts/">Контакты</a>
                </li>
                <li className={this.renderClass('profile')}>
                  {profile
                    ? <a href="#/profile/">{ profile.name }</a>
                    : <a href="#/login">Войти</a>
                  }
                </li>
                <li className={this.renderClass('order', 'btn-cta')}>
                  <a href="#/order"><span>Бронь <i id="basket-icon" className="glyphicon glyphicon-bed" /></span></a>
                </li>
              </ButtonToolbar>
            </div>
          </div>
      </nav>
    );
  }
}

export default Navbar;