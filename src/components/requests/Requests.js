import React, { Fragment } from 'react';
import RequestList from './Request_List';
import RequestDetail from './Request_Detail';
import RequestForm from './Request_Form';
import { Route, Switch } from 'react-router-dom';

const Requests = ({ match }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-5">
          <h5 className="py-3 h3 pt-1 text-center">All Requests</h5>
          <RequestList />
        </div>
        <div className="col-md-7 margin-top">
          <Switch>
            <Route
              exact
              path={`${match.path}/new`}
              component={RequestForm}
            ></Route>
            <Route
              exact
              path={`${match.path}/:id`}
              component={RequestDetail}
            ></Route>
            <Route
              exact
              path={`${match.path}/:id/edit`}
              component={RequestForm}
            ></Route>
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default Requests;
