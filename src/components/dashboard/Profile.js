import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyProvide } from '../../actions/provide';

const Profile = ({
  auth: { user },
  provide: { myProvide, loading },
  userUtil: { utilLoading },
  getMyProvide,
  history
}) => {
  useEffect(() => {
    if (!myProvide && user && user.role === 'Service') {
      getMyProvide();
    }
    // eslint-disable-next-line
  }, []);

  const onEditService = () => {
    history.push('/dashboard/editService');
  };
  const onRequests = () => {
    history.push('/requests');
  };

  return utilLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <Fragment>
      <div className="card center_div">
        <div className="card-header card_header_color text-white">
          My Dashboard
        </div>
        <div className="card-body">
          <div className="py-3">
            <div className="card-title pl-2 h4">
              Welcome,{' '}
              <span className="font_color">
                {user.firstname} {user.lastname}
              </span>
            </div>
          </div>
          <hr />
          <div className="container bg-white">
            <div className="row pt-3">
              <div className="col-3">
                <div className="h6 pt-3">Email:</div>
                <div className="h6 pt-4">Phone Number:</div>
                <div className="h6 pt-4">Location:</div>
              </div>
              <div className="col">
                <div className="h6 pt-3 text-secondary">{user.username}</div>
                <div className="h6 pt-4 text-secondary">{user.phone}</div>
                <div className="h6 pt-4 text-secondary">{user.streetname}</div>
                <div className="h6 pt-1 text-secondary">
                  {user.city}, {user.state}, {user.zipcode}
                </div>
              </div>
            </div>
          </div>
          {user.role === 'Customer' && (
            <div className="text-right pt-4">
              <button
                type="button"
                className="btn btn_background text-light btn-sm py-1 px-2"
                onClick={onRequests}
              >
                All Requests
              </button>
            </div>
          )}
          {user.role === 'Service' && (
            <Fragment>
              <div className="card-body">
                {loading ? (
                  <div>My Provide Information Loading...</div>
                ) : (
                  <Fragment>
                    {myProvide ? (
                      <Fragment>
                        <div className="row">
                          <div className="col-3">
                            <div className="h6 pt-3">Service type:</div>
                            <div className="h6 pt-4">Price:</div>
                            <div className="h6 pt-4">Detail:</div>
                          </div>
                          <div className="col">
                            <div className="h6 pt-3 text-secondary">
                              {myProvide.servicetype}
                            </div>
                            <div className="h6 pt-4 text-secondary">
                              {myProvide.price}
                            </div>
                            <div className="h6 pt-4 text-secondary">
                              {myProvide.detail}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <div className="text-danger text-center pt-3">
                        Please fill your service information.
                      </div>
                    )}
                    <div className="text-right pt-4">
                      <button
                        type="button"
                        className="btn btn_background text-light btn-sm py-1 px-2"
                        onClick={onEditService}
                      >
                        Update my Service
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  provide: state.provide,
  userUtil: state.userUtil
});

export default connect(mapStateToProps, { getMyProvide })(Profile);
