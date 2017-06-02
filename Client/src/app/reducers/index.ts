import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import dishReducer, * as fromDishReducer from './dish.reducer';
import appReducer, * as fromAppReducer from './app.reducer';

export interface State {
  dishes: fromDishReducer.State;
  app: fromAppReducer.State;
}

export default compose(storeLogger(), storeFreeze, combineReducers)({
  dishes: dishReducer,
  app: appReducer
});
