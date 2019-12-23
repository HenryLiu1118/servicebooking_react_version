import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateMyService } from '../../actions/provide';

const Profile_Service_Edit = ({
  provide: { myProvide, loading },
  updateMyService,
  serviceTypes,
  history
}) => {
  const [formData, setFormData] = useState({
    detail: '',
    price: '',
    servicename: ''
  });

  useEffect(() => {
    if (myProvide) {
      setFormData({
        detail: myProvide.detail,
        price: myProvide.price,
        servicename: myProvide.servicetype
      });
    }
    // eslint-disable-next-line
  }, []);

  const { detail, price, servicename } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    updateMyService(formData, history);
  };
  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <Fragment>
      <div className="container center_div">
        <form
          className="px-3 py-4 form_border bg-white"
          onSubmit={e => onSubmit(e)}
        >
          <h1 className="font_color pt-3 pb-2">Update Service</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="servicename" className="pr-2">
              Service Type
            </label>
            <select
              required
              id="servicename"
              name="servicename"
              value={servicename}
              onChange={e => onChange(e)}
              className="select_custom"
            >
              {serviceTypes &&
                ['', ...serviceTypes].map(serviceType => (
                  <option key={serviceType} value={serviceType}>
                    {serviceType}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Service Price</label>
            <textarea
              required
              className="form-control"
              type="message"
              id="price"
              rows="3"
              placeholder="Enter Service Price..."
              name="price"
              value={price}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="detail">Service Details</label>
            <textarea
              required
              className="form-control"
              type="message"
              id="detail"
              rows="3"
              placeholder="Enter Service details..."
              name="detail"
              value={detail}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <div className="text-center py-3">
            <button
              type="submit"
              className="btn btn_background text-white mx-3 my-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  serviceTypes: state.userUtil.serviceTypes,
  provide: state.provide
});

export default connect(mapStateToProps, { updateMyService })(
  Profile_Service_Edit
);
