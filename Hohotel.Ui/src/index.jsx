import './sources/styles/app.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {IntlProvider} from 'react-redux-multilingual';

import routes from './routes';
import SynchronizedStore from './store/ConfigureStore';
import translations from './sources/translations/translations';

render(
  <div className="app">
    <Provider store={SynchronizedStore.store}>
      <IntlProvider translations={translations}>
        <Router history={SynchronizedStore.history} routes={routes}/>
      </IntlProvider>
    </Provider>
  </div>,
  document.getElementById('root')
);