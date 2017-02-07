import { combineReducers } from 'redux';
// import model from './Reducer';
// import htmlModel from './htmlReducer';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  // model,
  // htmlModel,
  routing: routerReducer
});