/*eslint no-unused-vars: "off"*/

import React from 'react';
import { ButtonToolbar, MenuItem, NavDropdown } from 'react-bootstrap';

import { mainCategories } from '!json!../../sources/appVariables.json';

const Navbar = props => {
  const { profile, translate } = props;
  const isInGroup = (group) => profile && profile.groups.includes(group);
  return (
    <nav className="row">

      <div className="container">
        <div className="col-sm-3 hidden-xs">
          <div id="logo"><a href="#">HOHOTEL <em>.</em></a></div>
        </div>
        <div className="col-sm-9">
          <ButtonToolbar className="pull-right">
            {(isInGroup('hotel-manages') || isInGroup('kitchen-manager')) &&
            <NavDropdown className={composeClass('manage')} title={translate('manage')} noCaret id="menu-category">
              <MenuItem eventKey="1" href="#/manage/bookings" disabled={!isInGroup('hotel-manager')} >{translate('reservations')}</MenuItem>
              <MenuItem eventKey="2" href="#/manage/kitchen" disabled={!isInGroup('kitchen-manager')}>{translate('restaurant')}</MenuItem>
            </NavDropdown>
            }
            <li className={composeClass('booking')}>
              <a href="#/booking/">{translate('rooms')}</a>
            </li>
            <NavDropdown className={composeClass('menu')} title={translate('restaurant')} noCaret id="menu-category" href="#/menu/">
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
            <li className={composeClass('contacts')}>
              <a href="#/contacts/">{translate('contacts')}</a>
            </li>
            <li className={composeClass('profile')}>
              <a href="#/profile/">{ profile ? profile.name : translate('login') }</a>
            </li>
            <li className={composeClass('order', 'btn-cta')}>
              <a href="#/order"><span>{translate('booking')} <i id="basket-icon" className="glyphicon glyphicon-bed" /></span></a>
            </li>
          </ButtonToolbar>
        </div>
      </div>
    </nav>
  );

  function composeClass(tabName, className) {
    const { pathname } = props;
    const path = pathname.split('/')[1];
    if (!className) {
      className = '';
    }
    return path === tabName ? className + ' active' : className;
  }
};

export default Navbar;