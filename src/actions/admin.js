import axios from 'axios';
import { setAlert } from './alert';
import {
  ADMINGETLANGUAGES_FAIL,
  ADMINGETLANGUAGES,
  ADMINGETSERVICETYPES,
  ADMINGETSERVICETYPES_FAIL,
  ADMINGETROLES_FAIL,
  ADMINGETROLES,
  ADMINGETUSERS,
  ADMINGETUSERS_FAIL,
  ADMINPOSTLANGUAGE,
  ADMINPOSTLANGUAGE_FAIL,
  ADMINPOSTSERVICETYPE,
  ADMINPOSTSERVICETYPE_FAIL,
  ADMINPOSTROLE,
  ADMINPOSTROLE_FAIL
} from './types';

export const adminGetLanguages = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/language');
    dispatch({
      type: ADMINGETLANGUAGES,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: ADMINGETLANGUAGES_FAIL
    });
  }
};

export const adminGetServiceType = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/serviceType');
    dispatch({
      type: ADMINGETSERVICETYPES,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: ADMINGETSERVICETYPES_FAIL
    });
  }
};

export const adminGetRole = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/role');
    dispatch({
      type: ADMINGETROLES,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: ADMINGETROLES_FAIL
    });
  }
};

export const adminGetUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/user');
    dispatch({
      type: ADMINGETUSERS,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(e => dispatch(setAlert(e, 'danger')));
    }
    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: ADMINGETUSERS_FAIL
    });
  }
};

export const adminPostLanguage = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/admin/language', formData, config);
    dispatch({
      type: ADMINPOSTLANGUAGE,
      payload: res.data
    });
    dispatch(setAlert('Language Created', 'success'));
  } catch (err) {
    const error = err.response.data.error;
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(e => dispatch(setAlert(e, 'danger')));
    }
    if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: ADMINPOSTLANGUAGE_FAIL
    });
  }
};

export const adminPostServiceType = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/admin/serviceType', formData, config);
    dispatch({
      type: ADMINPOSTSERVICETYPE,
      payload: res.data
    });
    dispatch(setAlert('Service Created', 'success'));
  } catch (err) {
    const error = err.response.data.error;
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(e => dispatch(setAlert(e, 'danger')));
    }
    if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: ADMINPOSTSERVICETYPE_FAIL
    });
  }
};

export const adminPostRole = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/admin/role', formData, config);
    dispatch({
      type: ADMINPOSTROLE,
      payload: res.data
    });

    dispatch(setAlert('Role Created', 'success'));
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: ADMINPOSTROLE_FAIL
    });
  }
};
