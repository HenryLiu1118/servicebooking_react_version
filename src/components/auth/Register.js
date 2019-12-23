import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';

const Register = ({ userUtil: { languages, roles }, register, history }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    streetname: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    role: '',
    language: ''
  });

  const {
    username,
    password,
    firstname,
    lastname,
    streetname,
    city,
    state,
    zipcode,
    phone,
    role,
    language
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    register(formData, history);
  };

  return (
    <Fragment>
      <div className="login-form center_div">
        <form
          className="px-3 py-4 form_border bg-white"
          onSubmit={e => onSubmit(e)}
        >
          <h1 className="text-center pt-3 font_color">Create an Account</h1>
          <div className="container pt-5">
            <div className="form-group">
              <label htmlFor="username">
                Email Address<span className="text-danger"> *</span>
              </label>
              <input
                type="username"
                id="username"
                className="form-control"
                name="username"
                value={username}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password<span className="text-danger"> *</span>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstname">
                First Name<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                name="firstname"
                value={firstname}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">
                Last Name<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                name="lastname"
                value={lastname}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="streetname">
                Street<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="streetname"
                className="form-control"
                name="streetname"
                value={streetname}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">
                City<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="city"
                className="form-control"
                name="city"
                value={city}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">
                State<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="state"
                className="form-control"
                name="state"
                value={state}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipcode">
                Zip Code<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="zipcode"
                className="form-control"
                name="zipcode"
                value={zipcode}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                name="phone"
                value={phone}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group pt-3">
              <label htmlFor="role">
                Role<span className="text-danger pr-4"> *</span>
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={e => onChange(e)}
                required
              >
                {roles &&
                  ['', ...roles].map(roleItem => (
                    <option key={roleItem} value={roleItem}>
                      {roleItem}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group pt-3">
              <label htmlFor="language">
                Language<span className="text-danger pr-4"> *</span>
              </label>
              <select
                id="language"
                name="language"
                value={language}
                onChange={e => onChange(e)}
                required
              >
                {languages &&
                  ['', ...languages].map(languageItem => (
                    <option key={languageItem} value={languageItem}>
                      {languageItem}
                    </option>
                  ))}
              </select>
            </div>

            <div className="text-center pt-5 pb-5">
              <button
                type="submit"
                className="btn btn_background button_hover text-white btn-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userUtil: state.userUtil
});

export default connect(mapStateToProps, {
  register
})(Register);
