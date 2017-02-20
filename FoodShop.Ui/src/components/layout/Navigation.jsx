/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

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
    const name = utils.getProfileItem('name');
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
  render() {
    const { activeTab } = this.state;
    const userTab = this.renderUserTab();
    return (
      <nav className="gtco-nav" role="navigation">
        <div className="gtco-container">
          <div className="row">
            <div className="col-sm-4 col-xs-12">
              <div id="gtco-logo"><a href="menu.html">FoodShop <em>.</em></a></div>
            </div>
            <div className="col-xs-8 text-right menu-1">
              <ul>
                <TabItem
                  className="has-dropdown"
                  onClick={this.toggleTab}
                  tabName="menu"
                  active={activeTab === 'menu'}
                >
                  <a href="#/menu/">Меню</a>
                  <ul className="dropdown">
                    {
                      Object.keys(mainCategories).map((key) =>
                        <li key={key}><a href={`#/menu/${key}`}>{mainCategories[key]}</a></li>
                      )
                    }
                  </ul>
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
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;