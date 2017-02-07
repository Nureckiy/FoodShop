import './sources/styles/app.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from './routes/Routes';
import SynchronizedStore from './store/ConfigureStore';

render(
  <div className="app">
    <Provider store={SynchronizedStore.store}> 
      <Router history={SynchronizedStore.history} routes={routes}/>
    </Provider>
  </div>,
  document.getElementById('root')
);