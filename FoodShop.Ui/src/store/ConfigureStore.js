import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import appHistory from './History';
import {syncHistoryWithStore} from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk,logger,promiseMiddleware));
  return store;
}

const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);
const SynchronizedStore = {
  history,
  store
};

export default SynchronizedStore;