import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history } from './store';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
);
