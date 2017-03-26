import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';

import reducers from './reducers';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import LandingPage from './components/landing_page';
import MainPage from './components/main_page';
import AboutPage from './components/about_page';
import SigninPage from './components/auth/signin_page';
import SignoutPage from './components/auth/signout_page';
import SignupPage from './components/auth/signup_page';
import RequireAuth from './components/auth/require_auth';



const createStoreWithMiddleware = applyMiddleware(
  promise,
  reduxThunk
)(createStore);

const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
         <IndexRoute component={LandingPage} />
         <Route path='signin' component={SigninPage} />
         <Route path='signout' component={SignoutPage} />
         <Route path='main' component={RequireAuth(MainPage)} />
         <Route path='about' component={AboutPage} />
         <Route path='signup' component={SignupPage} />
        <Redirect from='*' to='/' />
    </Route>
    </Router>
  </Provider>
  , document.querySelector('#app'));
