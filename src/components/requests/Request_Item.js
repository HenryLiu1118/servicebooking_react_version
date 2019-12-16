import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Request_Item.css';
import setDateFormat from '../../utils/setDateFormat';

const Request_Item = ({ requestItem, index, requestId, match }) => {
  return (
    <Fragment>
      {requestItem && (
        <Fragment>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title font_color h5">
                {requestItem.servicetype}
              </h5>
              <hr />
              <p className="card-text h5">{requestItem.info}</p>
              <p className="card-text pt-2 h6">
                Language: {requestItem.userDto.language}
              </p>
              <p className="text-secondary pt-2">
                Post on: {setDateFormat(requestItem.create_At)}
              </p>
              <div className="text-right">
                <Link
                  to={`${match.url}/${index}|${requestId}`}
                  className="btn btn_background btn-sm text-white pointer"
                  role="button"
                >
                  View Detail
                </Link>
              </div>
            </div>
          </div>
          <br />
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(Request_Item);
