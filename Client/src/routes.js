import { Route, IndexRedirect } from 'react-router';
import React from 'react';

import App from '../src/containers/App';
import AuthContainer from '../src/containers/AuthContainer';
import RoomsContainer from './containers/RoomsContainer';
import RoomCategoriesContainer from './containers/RoomCategoriesContainer';
import BookingOrderContainer from './containers/BookingOrderContainer';
import BasketContainer from '../src/containers/BasketContainer.jsx';
import MenuContainer from '../src/containers/MenuContainer.jsx';
import UserProfileContainer from '../src/containers/UserProfileContainer.jsx';
import ManageBookingsContainer from '../src/containers/ManageBookingsContainer.jsx';
import ManageOrdersContainer from '../src/containers/ManageOrdersContainer.jsx';
import Contacts from '../src/components/contacts/Contacts.jsx';
import NotFound from './components/layout/NotFound.jsx';
import OrderSummary from './components/common/OrderSummary.jsx';


const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRedirect to="/booking" />
      <Route path="/booking" component={RoomCategoriesContainer} />
      <Route path="/booking/:id" component={RoomsContainer} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/summary/:orderType" component={OrderSummary} />
      <Route component={AuthContainer}>
        <Route path="/order" component={BookingOrderContainer} />
        <Route path="/menu" component={MenuContainer} />
        <Route path="/menu/:category" component={MenuContainer} />
        <Route path="/basket" component={BasketContainer} />
        <Route path="/profile" component={UserProfileContainer} />
        <Route path="/manage/bookings" component={ManageBookingsContainer} />
        <Route path="/manage/kitchen" component={ManageOrdersContainer} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;