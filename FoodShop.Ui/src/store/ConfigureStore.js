import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import appHistory from './History';
import {syncHistoryWithStore} from 'react-router-redux';

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk));
  return store;
}

const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);
const SynchronizedStore = {
  history,
  store
};


export default SynchronizedStore;