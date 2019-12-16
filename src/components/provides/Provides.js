import React, { Fragment } from 'react';
import ProvideDetail from './Provide_Detail';
import ProvideList from './Provide_list';
import { Route, Switch } from 'react-router-dom';

const Provides = ({ match }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-5">
          <h5 className="py-3 h3 pt-1 text-center">All Service Providers</h5>
          <ProvideList />
        </div>
        <div className="col-md-7 margin-top">
          <Switch>
            <Route
              exact
              path={`${match.path}/:id`}
              component={ProvideDetail}
            ></Route>
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default Provides;
