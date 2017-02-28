import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import AppReducer from './AppReducer';
import BasketReducer from './BasketReducer';
import LandingPageReducer from './LandingReducer';
import MenuReducer from './MenuReducer';
import OrderReducer from './OrderReducer';
import UserProfileReducer from './UserProfileReducer';
import AdminReducer from './AdminReducer';

export default combineReducers({
  AppReducer,
  BasketReducer,
  LandingPageReducer,
  MenuReducer,
  OrderReducer,
  UserProfileReducer, AdminReducer,
  routing: routerReducer
});