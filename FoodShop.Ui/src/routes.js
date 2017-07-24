import { Route, IndexRedirect } from 'react-router';
import React from 'react';

import App from '../src/containers/App';
import BookingContainer from './containers/BookingContainer';
import BookingOrderContainer from './containers/BookingOrderContainer';
import BasketContainer from '../src/containers/BasketContainer.jsx';
import MenuContainer from '../src/containers/MenuContainer.jsx';
import UserProfileContainer from '../src/containers/UserProfileContainer.jsx';
import Contacts from '../src/components/contacts/Contacts.jsx';
import Admin from './containers/AdminContainer';
import NotFound from './components/layout/NotFound.jsx';
import Login from './components/layout/Login.jsx';
import OrderSummary from './components/common/OrderSummary.jsx';
import auth from './service/auth';
import config from './config';

const authService = new auth(config.auth0.clientId, config.auth0.domain);

const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    login(replace);
  }
};

const requireAdminRole = () => {
    if (!authService.loggedIn() || !authService.isAdmin()) {
      login();
    }
};

function login() {
  authService.login();
}

const routes = (
  <div>
    <Route path="/" component={App} auth={authService}>
      <IndexRedirect to="/booking" />
      <Route path="/booking" component={BookingContainer} />
      <Route path="/booking/:id" component={BookingContainer} />
      <Route path="/order" component={BookingOrderContainer} onEnter={requireAuth} />
      <Route path="/menu" component={MenuContainer} onEnter={requireAuth} />
      <Route path="/menu/:category" component={MenuContainer} onEnter={requireAuth} />
      <Route path="/basket" component={BasketContainer} onEnter={requireAuth} />
      <Route path="/profile" component={UserProfileContainer} onEnter={requireAuth} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/admin" component={Admin} onEnter={requireAdminRole} />
      <Route path="/summary/:orderType" component={OrderSummary} />
    </Route>
    <Route path="/login" component={Login} auth={authService} />
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;