import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../dashboard/Profile';
import Profile_Edit from '../dashboard/Profile_Edit';
import Profile_Service_Edit from '../dashboard/Profile_Service_Edit';
import Provides from '../provides/Provides';
import Requests from '../requests/Requests';
import Users from '../admin/users/Users';
import Languages from '../admin/language/Languages';
import Roles from '../admin/role/Roles';
import ServiceType from '../admin/service_type/ServiceType';

const Routes = () => {
  return (
    <Fragment>
      <div className="margin-top">
        <Alert />
        <Switch>
          <PrivateRoute exact path="/" component={Profile} />
          <PrivateRoute exact path="/dashboard/profile" component={Profile} />
          <PrivateRoute
            exact
            path="/dashboard/editProfile"
            component={Profile_Edit}
          />
          <PrivateRoute
            exact
            path="/dashboard/editService"
            component={Profile_Service_Edit}
          />
          <PrivateRoute exact path="/admin/users" component={Users} />
          <PrivateRoute
            exact
            path="/admin/serviceTypes"
            component={ServiceType}
          />
          <PrivateRoute exact path="/admin/roles" component={Roles} />
          <PrivateRoute exact path="/admin/languages" component={Languages} />
          <PrivateRoute path="/provides" component={Provides} />
          <PrivateRoute path="/requests" component={Requests} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Register} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Routes;
