import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Provide_Detail = ({ provide: { provides }, match }) => {
  const [provideDetail, setData] = useState({
    servicetype: '',
    fullName: '',
    price: '',
    detail: '',
    location: '',
    phone: '',
    language: ''
  });
  const {
    servicetype,
    fullName,
    price,
    detail,
    location,
    phone,
    language
  } = provideDetail;

  useEffect(() => {
    let ids = match.params.id.split('|');
    let index = +ids[0];
    let current = provides[index];
    setData({
      servicetype: current.servicetype,
      fullName: current.userDto.firstname + ' ' + current.userDto.lastname,
      price: current.price,
      detail: current.detail,
      location:
        current.userDto.streetname +
        ', ' +
        current.userDto.city +
        ', ' +
        current.userDto.state +
        ', ' +
        current.userDto.zipcode,
      phone: current.userDto.phone,
      language: current.userDto.language
    });
    // eslint-disable-next-line
  }, [match.params.id]);

  return (
    <Fragment>
      <div className="card border-bottom-0 shadow-sm">
        <div className="card-body">
          <h4 className="card-title font_color">{fullName}</h4>
          <p className="card-subtitle mt-1 text-muted h6">{servicetype}</p>
          <hr />
          <div className="container">
            <h5 className="card-text text-align-center py-2">{detail}</h5>
            <div className="row">
              <div className="col-3">
                <div className="text-muted py-2 h6">Price:</div>
              </div>
              <div className="col">
                <div className="py-2">{price}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="text-muted py-2 h6">Location:</div>
              </div>
              <div className="col">
                <div className="py-2">{location}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="text-muted py-2 h6">Phone:</div>
              </div>
              <div className="col">
                <div className="py-2">{phone}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="text-muted py-2 h6">Language:</div>
              </div>
              <div className="col">
                <div className="py-2">{language}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  provide: state.provide
});

export default connect(mapStateToProps)(Provide_Detail);
