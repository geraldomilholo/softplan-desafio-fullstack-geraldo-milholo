import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Login as LoginView,
  NotFound as NotFoundView,
  Processes as ProcessesView,
  Users as UsersView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/login"
      />
      <RouteWithLayout
        component={UsersView}
        exact
        layout={MainLayout}
        path="/usuarios"
      />
      <RouteWithLayout
        component={ProcessesView}
        exact
        layout={MainLayout}
        path="/processos"
      />
      <RouteWithLayout
        component={LoginView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
