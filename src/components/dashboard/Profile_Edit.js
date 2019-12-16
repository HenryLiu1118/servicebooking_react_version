import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getLanguages } from '../../actions/userUtil';
import { updateProfile } from '../../actions/auth';

const Profile_Edit = ({
  user,
  languages,
  getLanguages,
  updateProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    streetname: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    language: ''
  });

  useEffect(() => {
    getLanguages();
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        streetname: user.streetname,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        phone: user.phone,
        language: user.language
      });
    }
    // eslint-disable-next-line
  }, []);

  const { streetname, city, state, zipcode, phone, language } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    updateProfile(formData, history);
  };
  return (
    <Fragment>
      <div className="container">
        <form
          className="px-3 py-4 form_border bg-white"
          onSubmit={e => onSubmit(e)}
        >
          <h1 className="pt-3 font_color">Update Your Profile</h1>
          <hr />
          <div className="h6 pt-3">
            Name: {user.firstname} {user.lastname}
          </div>
          <div className="h6 py-3">Email: {user.username}</div>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              required
              className="form-control"
              type="text"
              id="street"
              name="streetname"
              value={streetname}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              required
              className="form-control"
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              required
              className="form-control"
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input
              required
              className="form-control"
              type="text"
              id="zipcode"
              name="zipcode"
              value={zipcode}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              required
              className="form-control"
              type="text"
              id="phone"
              placeholder="xxx-xxx-xxxx"
              name="phone"
              value={phone}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group pt-3">
            <label htmlFor="language" className="pr-3">
              Language:{' '}
            </label>
            <select
              required
              id="language"
              name="language"
              value={language}
              onChange={e => onChange(e)}
            >
              {languages &&
                languages.map(languageItem => (
                  <option key={languageItem} value={languageItem}>
                    {languageItem}
                  </option>
                ))}
            </select>
          </div>

          <div className="text-center pt-3">
            <button
              type="submit"
              className="btn btn_background btn-lg text-white mx-3 my-1"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  languages: state.userUtil.languages
});

export default connect(mapStateToProps, { getLanguages, updateProfile })(
  Profile_Edit
);
