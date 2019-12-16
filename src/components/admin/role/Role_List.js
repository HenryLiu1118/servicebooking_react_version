import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { adminGetRole } from '../../../actions/admin';

const Role_List = ({ roles, adminGetRole }) => {
  useEffect(() => {
    adminGetRole();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role Type</th>
          </tr>
        </thead>
        <tbody>
          {roles &&
            roles.map(role => (
              <tr key={role.id}>
                <th scope="row">{role.id}</th>
                <td> {role.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  roles: state.admin.roles
});

export default connect(mapStateToProps, { adminGetRole })(Role_List);
