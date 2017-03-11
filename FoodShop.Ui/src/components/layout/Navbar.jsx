/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import { ButtonToolbar, MenuItem, NavDropdown } from 'react-bootstrap';
import mainCategories from '!json!../../sources/mainCategories.json';
import TabItem from './NavTabItem.jsx';

class Navigation extends Component {
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
    console.log('render');
    return (
      <nav className="row">
          <div className="container">
            <div className="col-sm-4 col-xs-12">
              <div id="logo"><a href="#">FOODSHOP <em>.</em></a></div>
            </div>
            <div className="col-xs-8">
              <ButtonToolbar className="pull-right">
                {auth.isAdmin() &&
                  <li className={this.renderClass('admin')}>
                    <a href="#/admin/">Админ</a>
                  </li>
                }
                <li className={this.renderClass('menu')}>
                  <NavDropdown title="Меню" noCaret id="menu-category" href="#/menu/">
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
                </li>
                <li className={this.renderClass('contacts')}>
                  <a href="#/contacts/">Контакты</a>
                </li>
                <li className={this.renderClass('profile')}>
                  {profile
                    ? <a href="#/profile/">{ profile.name }</a>
                    : <a onClick={auth.login}>Войти</a>
                  }
                </li>
                <li className={this.renderClass('basket', 'btn-cta')}>
                  <a href="#/basket"><span>Корзина</span></a>
                </li>
              </ButtonToolbar>
            </div>
          </div>
      </nav>
    );
  }
}

export default Navigation;