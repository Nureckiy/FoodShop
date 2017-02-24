import { Route, IndexRedirect } from 'react-router';
import React from 'react';

import App from '../src/containers/App';
import BasketContainer from '../src/containers/BasketContainer.jsx';
import MenuContainer from '../src/containers/MenuContainer.jsx';
import OrderContainer from '../src/containers/OrderContainer.jsx';
import UserProfileContainer from '../src/containers/UserProfileContainer.jsx';
import Contacts from '../src/components/contacts/Contacts.jsx';
import Login from '../src/components/login/Login.jsx';
import NotFound from './components/layout/NotFound.jsx';

import auth from './service/auth';

import config from './config';

const authService = new auth(config.auth0.clientId, config.auth0.domain);

const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

const logout = (nextState, replace) => {
  authService.logout();
  replace({ pathname: '/login' });
};

const routes = (
  <div>
    <Route path="/" component={App} auth={authService}>
      <IndexRedirect to="/menu" />
      <Route path="/menu" component={MenuContainer} />
      <Route path="/menu/:category" component={MenuContainer} />
      <Route path="/basket" component={BasketContainer} />
      <Route path="/order" component={OrderContainer} onEnter={requireAuth} />
      <Route path="/profile" component={UserProfileContainer} onEnter={requireAuth} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Login} onEnter={logout} />
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;