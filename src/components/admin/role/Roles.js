import React, { Fragment } from 'react';
import RoleForm from './Role_Form';
import RoleList from './Role_List';

const Roles = () => {
  return (
    <Fragment>
      <div className="container-fluid container-fluid-admin">
        <div className="text-center pb-5">
          <RoleForm />
        </div>
        <div className="py-4 bg-white border border-dark">
          <h3 className="text-center pb-3">All Role Types</h3>
          <RoleList />
        </div>
      </div>
    </Fragment>
  );
};

export default Roles;
