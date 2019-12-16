import React, { Fragment } from 'react';
import ServiceForm from './Service_Form';
import ServiceList from './Service_List';

function ServiceType() {
  return (
    <Fragment>
      <div className="container-fluid container-fluid-admin">
        <div className="text-center pb-5">
          <ServiceForm />
        </div>
        <div className="py-4 bg-white border border-dark">
          <h3 className="text-center pb-3">All Service Types</h3>
          <ServiceList />
        </div>
      </div>
    </Fragment>
  );
}

export default ServiceType;
