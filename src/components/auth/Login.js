import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard/profile" />;
  }
  return (
    <Fragment>
      <div className="login-form">
        <form
          className="px-3 py-4 form_border login_center_div bg-white"
          onSubmit={e => onSubmit(e)}
        >
          <div className="avatar text-center pt-3">
            <i className="fa fa-user-circle"></i>
          </div>
          <div className="container pt-5">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-envelope-o"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Enter email address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock mr-1"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  minLength="6"
                />
              </div>
            </div>

            <div className="pt-3 pb-5">
              <span>
                <p className="float-left pt-3 font_color">Forgot password?</p>
                <input
                  type="submit"
                  className="btn btn_background text-light btn-lg float-right"
                  value="LOGIN"
                ></input>
              </span>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
