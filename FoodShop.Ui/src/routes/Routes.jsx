import {Route, IndexRoute} from 'react-router';
import App from '../containers/App';
import React from 'react';

const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={App} />
      <Route path="/login" component={App} />
    </Route>
    <Route path="*" component={App} />
  </div>
);

export default routes;