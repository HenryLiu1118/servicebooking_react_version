import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {getUtilData} from './userUtil'
import { setAlert } from './alert';
import proxy from '../utils/proxy';

import {
  LOGIN_FAIL,
  USER_LOAD,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  CLEARUSERUTIL,
  CLEAR_PROVIDE,
  CLEAR_REQUESTS,
  CLEARADMIN,
  SET_LOADING
} from './types';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch(setLoading());
    const res = await axios.get(`${proxy}/api/userinfo/me`);
    
    dispatch({
      type: USER_LOAD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ username, password });

  try {
    dispatch(setLoading());
    const res = await axios.post(`${proxy}/api/users/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(getUtilData());
    dispatch(setAlert('Login Successfully!', 'success'));
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
      type: LOGIN_FAIL
    });
  }
};

export const register = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    dispatch(setLoading());
    const res = await axios.post(
      `${proxy}/api/users/register`,
      formData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Account Created!', 'success'));
    history.push('auth/login');
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
      type: REGISTER_FAIL
    });
  }
};

export const updateProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch(setLoading());
    const res = await axios.put(`${proxy}/api/userinfo`, formData, config);
    dispatch({
      type: USER_LOAD,
      payload: res.data
    });
    dispatch(setAlert('Account Updated!', 'success'));
    history.push('/dashboard/profile');
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
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEARUSERUTIL });
  dispatch({ type: CLEAR_PROVIDE });
  dispatch({ type: CLEAR_REQUESTS });
  dispatch({ type: CLEARADMIN });
};

const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
};
