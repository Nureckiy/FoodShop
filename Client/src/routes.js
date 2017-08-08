import { Route, IndexRedirect } from 'react-router';
import React from 'react';

import App from '../src/containers/App';
import BookingContainer from './containers/BookingContainer';
import BookingOrderContainer from './containers/BookingOrderContainer';
import BasketContainer from '../src/containers/BasketContainer.jsx';
import MenuContainer from '../src/containers/MenuContainer.jsx';
import UserProfileContainer from '../src/containers/UserProfileContainer.jsx';
import ManageBookingsContainer from '../src/containers/ManageBookingsContainer.jsx';
import ManageOrdersContainer from '../src/containers/ManageOrdersContainer.jsx';
import Contacts from '../src/components/contacts/Contacts.jsx';
import NotFound from './components/layout/NotFound.jsx';
import Login from './components/layout/Login.jsx';
import OrderSummary from './components/common/OrderSummary.jsx';
import auth from './service/auth';
import config from './config';
import history from './store/History';

const authService = new auth(config.auth0.clientId, config.auth0.domain);

const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    login(replace);
  }
};

const requireGroupBelonging = (group) => {
  return () => {
    if (!authService.loggedIn() || !authService.inGroup(group)) {
      history.goBack();
    }
  };
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
      <Route path="/summary/:orderType" component={OrderSummary} />
      <Route path="/manage/bookings" component={ManageBookingsContainer} onEnter={requireGroupBelonging('hotel-manager')} />
      <Route path="/manage/kitchen" component={ManageOrdersContainer} onEnter={requireGroupBelonging('kitchen-manager')} />
    </Route>
    <Route path="/login" component={Login} auth={authService} />
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;