import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { adminPostLanguage } from '../../../actions/admin';

const Language_Form = ({ adminPostLanguage }) => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const { name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    adminPostLanguage(formData);
    setFormData({ name: '' });
  };

  return (
    <Fragment>
      <div className="container-fluid pt-2 background-color">
        <form className="py-3 form-inline" onSubmit={e => onSubmit(e)}>
          <h4 className="pr-5 pl-3 text-white">Create New Language</h4>
          <div className="form-group pl-5 pr-5">
            <input
              required
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              placeholder="Enter Language Name"
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

export default connect(null, { adminPostLanguage })(Language_Form);
