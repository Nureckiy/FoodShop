/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import { ButtonToolbar, DropdownButton, MenuItem, Dropdown, NavDropdown } from 'react-bootstrap';
import mainCategories from '!json!../../sources/mainCategories.json';
import TabItem from './NavTabItem.jsx';
import * as utils from '../../utils/utils';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'menu'
    };
    this.toggleTab = this.toggleTab.bind(this);
  }
  toggleTab(activeTab) {
    this.setState({ activeTab });
  }
  renderUserTab() {
    const { activeTab } = this.state;
    const { auth } = this.props;
    const name = auth.getProfile().name;
    let href = 'login';
    let text = 'Войти';
    if (name) {
      href = 'profile';
      text = name;
    }
    return (
      <TabItem
        onClick={this.toggleTab}
        tabName={href}
        active={activeTab === 'login'}
      >
        <a href={`#/${href}`}>{text}</a>
      </TabItem>
    );
  }
  renderAdminTab() {
    const { activeTab } = this.state;
    const { auth } = this.props;
    if (auth.isAdmin()) {
      return (
        <TabItem
          onClick={this.toggleTab}
          tabName="admin"
          active={activeTab === 'admin'}
        >
          <a href="#/admin/">Админ</a>
        </TabItem>
      );
    }
  }
  render() {
    const { activeTab } = this.state;
    const userTab = this.renderUserTab();
    const adminTab = this.renderAdminTab();
    return (
      <nav className="row">
          <div className="container">
            <div className="col-sm-4 col-xs-12">
              <div id="logo"><a href="menu.html">FOODSHOP <em>.</em></a></div>
            </div>
            <div className="col-xs-8">
              <ButtonToolbar className="pull-right">
                  { adminTab }
                <TabItem
                  onClick={this.toggleTab}
                  tabName="menu"
                  active={activeTab === 'menu'}
                >
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
                </TabItem>
                <TabItem
                  onClick={this.toggleTab}
                  tabName="contacts"
                  active={activeTab === 'contacts'}
                ><a href="#/contacts/">Контакты</a>
                </TabItem>
                { userTab }
                <TabItem
                  className="btn-cta"
                  onClick={this.toggleTab}
                  tabName="basket"
                  active={activeTab === 'basket'}
                ><a href="#/basket"><span>Корзина</span></a>
                </TabItem>
              </ButtonToolbar>
            </div>
          </div>
      </nav>
    );
  }
}

export default Navigation;