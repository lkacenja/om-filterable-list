import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import content from './reducers/content';
import loading from './reducers/loading';
import filter from './reducers/filter';
import pager from './reducers/pager';
import constants from './utility/constants';
import AppContainer from './containers/app-container';

const store = createStore(
  combineReducers({
    content: content,
    loading: loading,
    filter: filter,
    pager: pager,
    routing: routerReducer
  }),
  {},
  applyMiddleware(routerMiddleware(browserHistory), thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={constants.BASE_PATH} component={AppContainer}>
        <Route path={constants.BASE_PATH + '/:filterValues'} component={AppContainer} />
        <Route path={constants.BASE_PATH + '/:filterValues/:currentPage'} component={AppContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById(constants.MOUNT_ELEMENT)
);
