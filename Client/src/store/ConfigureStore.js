import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import rootReducer from '../reducers';
import appHistory from './History';

function configureStore(initialState) {
  const logger = createLogger();
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk,logger,promiseMiddleware));
}

const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);

const SynchronizedStore = {
  history,
  store
};




export default SynchronizedStore;