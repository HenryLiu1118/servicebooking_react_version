import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import setDateFormat from '../../utils/setDateFormat';
import Comments from '../comments/Comments';
import CommentForm from '../comments/Comment_Form';

const Request_Detail = ({
  auth: { user },
  request: { requests },
  match,
  history
}) => {
  const [requestDetail, setData] = useState({
    requestId: null,
    servicetype: '',
    fullName: '',
    Date: null,
    info: '',
    location: '',
    phone: '',
    language: '',
    requestUserId: null
  });

  const {
    requestId,
    servicetype,
    fullName,
    Date,
    info,
    location,
    phone,
    language,
    requestUserId
  } = requestDetail;

  useEffect(() => {
    let ids = match.params.id.split('|');
    let index = +ids[0];
    let current = requests[index];
    setData({
      requestId: current.requestId,
      servicetype: current.servicetype,
      fullName: current.userDto.firstname + ' ' + current.userDto.lastname,
      Date: current.create_At,
      info: current.info,
      location:
        current.userDto.streetname +
        ', ' +
        current.userDto.city +
        ', ' +
        current.userDto.state +
        ', ' +
        current.userDto.zipcode,
      phone: current.userDto.phone,
      language: current.userDto.language,
      requestUserId: current.userDto.userId
    });
    // eslint-disable-next-line
  }, [match.params.id]);

  const onEditRequest = () => {
    history.push(`${match.url}/edit`);
  };

  return (
    <Fragment>
      <div className="card border-bottom-0 shadow-sm">
        <div className="card-body">
          <h4 className="card-title font_color">{servicetype}</h4>
          <p className="card-subtitle mt-1 text-muted medium">
            <span>{fullName}</span>
            <span className="pl-4">{setDateFormat(Date)}</span>
          </p>
          <hr />
          <div className="container">
            <h5 className="card-text text-align-center">{info}</h5>
            <div className="py-2">
              <span className="text-muted pr-1 h6">Location:</span>
              <span className="pl-2">{location}</span>
            </div>
            <div>
              <span className="text-muted pr-1 h6">Phone:</span>
              <span className="pl-4">{phone}</span>
            </div>
            <div className="pt-2">
              <span className="text-muted pr-1 h6">Language:</span>
              <span className="pl-1">{language}</span>
            </div>
            {user && user.userId === requestUserId && (
              <div className="float-right">
                <button
                  className="btn btn_background text-white px-2 mt-1"
                  onClick={onEditRequest}
                >
                  Edit Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {user.role === 'Service' && requestId && (
          <CommentForm requestId={requestId} />
        )}
        {user.role === 'Customer' && requestId && (
          <Comments requestId={requestId} />
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  request: state.request
});

export default connect(mapStateToProps)(Request_Detail);
