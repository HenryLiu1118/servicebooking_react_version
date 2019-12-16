import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Provide_Item.css';

const Provide_Item = ({ provideItem, index, provideId, match }) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font_color h5">
            {provideItem.userDto.firstname} {provideItem.userDto.lastname}
          </h5>
          <hr />
          <div className="card-text">
            <div className="row">
              <div className="col-4">
                <div className="text-muted h6">Service type: </div>
              </div>
              <div className="col">
                <div>{provideItem.servicetype}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="text-muted h6">Price: </div>
              </div>
              <div className="col">
                <div>{provideItem.price}</div>
              </div>
            </div>
          </div>
          <div className="text-right pt-2">
            <Link
              to={`${match.url}/${index}|${provideId}`}
              role="button"
              className="btn btn_background btn-sm text-white pointer"
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default withRouter(Provide_Item);
