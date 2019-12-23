import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { getUtilData } from './actions/userUtil';
import setAuthToken from './utils/setAuthToken';

import Routes from './components/routing/Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getUtilData());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Route component={Routes} />
              </div>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
