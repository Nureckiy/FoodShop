import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import { i18nActions } from 'redux-react-i18n';

import rootReducer from '../reducers';
import appHistory from './History';
import languages from '!json!../localization/languages.json';
import ru from '!json!../localization/ru-RU.json';
import en from '!json!../localization/en-US.json';

function configureStore(initialState) {
  const logger = createLogger();
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk,logger,promiseMiddleware));
}

const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);

const dictionaries = {
  'ru-RU': ru,
  'en-US': en
};

store.dispatch( i18nActions.setDictionaries( dictionaries ) );
store.dispatch( i18nActions.setLanguages( languages ) );

const SynchronizedStore = {
  history,
  store
};




export default SynchronizedStore;