import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, islogin, exact, path }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      islogin ? <Redirect to='/' /> : <Component  {...props} />)}
  />
)

const msp = state => {
  return {
    islogin: Boolean(state.session.id)
  }
}

export const AuthRoute = withRouter(connect(msp)(Auth));

const Protected = ({ component: Component, islogin, exact, path }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      islogin ? <Component  {...props} /> : <Redirect to='/login' />)}
  />
)


export const ProtectedRoute = withRouter(connect(msp)(Protected));
