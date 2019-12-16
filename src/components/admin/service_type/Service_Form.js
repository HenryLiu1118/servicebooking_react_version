import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { adminPostServiceType } from '../../../actions/admin';

const Service_Form = ({ adminPostServiceType }) => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const { name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    adminPostServiceType(formData);
    setFormData({ name: '' });
  };

  return (
    <Fragment>
      <div className="container-fluid pt-2 background-color">
        <form className="py-3 form-inline" onSubmit={e => onSubmit(e)}>
          <h4 className="pr-5 pl-3 text-white">Create New Service</h4>
          <div className="form-group pl-5 pr-5">
            <input
              required
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              placeholder="Enter Service Name"
            />
          </div>
          <div className="pl-5 pr-3">
            <button
              type="submit"
              className="btn btn_background text-white px-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { adminPostServiceType })(Service_Form);
