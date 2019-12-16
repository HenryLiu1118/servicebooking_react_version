import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const Header = ({ auth: { isAuthenticated, user }, logout }) => {
  const authHeader = (
    <Fragment>
      <div className="container-fluid">
        <a href="/" className="navbar-brand font-weight-bold text-white">
          <h3>LOCALS</h3>
        </a>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item font-weight-bold">
              <Link to="/dashboard/profile" className="nav-link mx-3">
                HOME
              </Link>
            </li>
            {user && user.role === 'Customer' && (
              <li className="nav-item font-weight-bold">
                <Link to="/provides" className="nav-link mx-3">
                  All Service Providers
                </Link>
              </li>
            )}
            {user && user.role === 'Service' && (
              <li className="nav-item font-weight-bold">
                <Link to="/requests" className="nav-link mx-3">
                  All Requests
                </Link>
              </li>
            )}
            {user && user.role === 'Admin' && (
              <li className="nav-item font-weight-bold">
                <Link to="/admin/users" className="nav-link mx-3">
                  All Users
                </Link>
              </li>
            )}
            {user && user.role === 'Admin' && (
              <li className="nav-item font-weight-bold">
                <Link to="/admin/serviceTypes" className="nav-link mx-3">
                  Service Types
                </Link>
              </li>
            )}
            {user && user.role === 'Admin' && (
              <li className="nav-item font-weight-bold">
                <Link to="/admin/roles" className="nav-link mx-3">
                  Roles
                </Link>
              </li>
            )}
            {user && user.role === 'Admin' && (
              <li className="nav-item font-weight-bold">
                <Link to="/admin/languages" className="nav-link mx-3">
                  Languages
                </Link>
              </li>
            )}

            <li className="nav-item dropdown font-weight-bold">
              <a
                href="/"
                className="nav-link dropdown-toggle pointer"
                data-toggle="dropdown"
              >
                ACCOUNT
              </a>
              <div className="dropdown-menu navbar_dropitem font-weight-normal">
                <div className="dropdown-divider"></div>
                <Link
                  to="/dashboard/editProfile"
                  className="dropdown-item pointer"
                >
                  Edit Profile
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/" onClick={logout} className="dropdown-item pointer">
                  Logout
                </Link>
                <div className="dropdown-divider"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );

  const guestHeader = (
    <Fragment>
      <div className="container">
        <a href="/" className="navbar-brand font-weight-bold text-white">
          <h3>LOCALS</h3>
        </a>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown font-weight-bold">
              <a
                href="/"
                className="nav-link dropdown-toggle pointer"
                data-toggle="dropdown"
              >
                ACCOUNT
              </a>
              <div className="dropdown-menu navbar_dropitem font-weight-normal">
                <div className="dropdown-divider"></div>
                <Link to="/auth/login" className="dropdown-item pointer">
                  Login
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/auth/signup" className="dropdown-item pointer">
                  Register
                </Link>
                <div className="dropdown-divider"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-sm fixed-top navbar-dark nav_background">
      {isAuthenticated ? authHeader : guestHeader}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
