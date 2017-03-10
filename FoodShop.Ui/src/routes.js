import { Route, IndexRedirect } from 'react-router';
import React from 'react';

import App from '../src/containers/App';
import BasketContainer from '../src/containers/BasketContainer.jsx';
import MenuContainer from '../src/containers/MenuContainer.jsx';
import UserProfileContainer from '../src/containers/UserProfileContainer.jsx';
import Contacts from '../src/components/contacts/Contacts.jsx';
import NotFound from './components/layout/NotFound.jsx';
import Admin from './containers/AdminContainer';
import auth from './service/auth';
import config from './config';

const authService = new auth(config.auth0.clientId, config.auth0.domain);

const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    authService.logout();
    login(replace);
  }
};

const requireAdminRole = (nextState, replace) => {
    if (!authService.loggedIn() || !authService.isAdmin()) {
      login(replace);
    }
};

function login(replace) {
  replace({ pathname: '/' });
  authService.login();
}

const routes = (
  <div>
    <Route path="/" component={App} auth={authService}>
      <IndexRedirect to="/menu" />
      <Route path="/menu" component={MenuContainer} />
      <Route path="/menu/:category" component={MenuContainer} />
      <Route path="/basket" component={BasketContainer} />
      <Route path="/profile" component={UserProfileContainer} onEnter={requireAuth} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/admin" component={Admin} onEnter={requireAdminRole} />
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;