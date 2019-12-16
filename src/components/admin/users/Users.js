import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { adminGetUser } from '../../../actions/admin';

const Users = ({ users, adminGetUser }) => {
  useEffect(() => {
    adminGetUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div className="margin-top">
        {users &&
          users.map(user => (
            <div key={user.userId}>
              <div className="card my-3 card-admin-user">
                <div className="row no-gutters">
                  <div className="col-3">
                    <img
                      src={require('./user-icon.png')}
                      alt="Cannot see this profile"
                      className="rounded-circle text-center"
                    />
                  </div>
                  <div className="col pl-5">
                    <div className="card-block px-2 py-2 bg-muted">
                      <h5 className="card-title font_color">
                        {user.firstname} {user.lastname}
                      </h5>
                      <div className="row">
                        <div className="col-3">
                          <p className="card-text">Username:</p>
                          <p className="card-text">Phone:</p>
                          <p className="card-text">Address:</p>
                          <p className="card-text">Language:</p>
                          <p className="card-text">Role:</p>
                        </div>
                        <div className="col">
                          <p className="card-text text-secondary">
                            {user.username}
                          </p>
                          <p className="card-text text-secondary">
                            {user.phone}
                          </p>
                          <p className="card-text text-secondary">
                            {user.streetname}, {user.city}, {user.state}{' '}
                            {user.zipcode}
                          </p>
                          <p className="card-text text-secondary">
                            {user.language}
                          </p>
                          <p className="card-text text-secondary">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.admin.users
});

export default connect(mapStateToProps, { adminGetUser })(Users);
