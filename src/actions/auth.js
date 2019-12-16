import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

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
  CLEARADMIN
} from './types';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/userinfo/me');
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
    const res = await axios.post('/api/users/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Login Successfully!', 'success'));
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const register = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users/register', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Account Created', 'success'));
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

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
    const res = await axios.put('/api/userinfo', formData, config);
    dispatch({
      type: USER_LOAD,
      payload: res.data
    });
    history.push('/dashboard/profile');
  } catch (err) {
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
