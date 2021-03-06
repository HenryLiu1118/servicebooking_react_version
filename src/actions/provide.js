import axios from 'axios';
import { setAlert } from './alert';
import proxy from '../utils/proxy';

import {
  GETMYPROVIDE,
  GETMYPROVIDE_FAIL,
  GETPROVIDES_FAIL,
  GETPROVIDES,
  SET_PROVIDELOADING
} from './types';

export const getProvides = (
  provideName,
  languageName,
  page,
  limit
) => async dispatch => {
  try {
    let URL = `${proxy}/api/provider/`;
    if (provideName !== 'All' && languageName !== 'All') {
      URL += `${provideName}/${languageName}`;
    } else if (provideName !== 'All') {
      URL += `name/${provideName}`;
    } else if (languageName !== 'All') {
      URL += `language/${languageName}`;
    }
    URL += '?page=' + page + '&limit=' + limit;

    dispatch(setLoading());
    const res = await axios.get(URL);
    dispatch({
      type: GETPROVIDES,
      payload: res.data
    });
    if (page === 0) {
      if (res.data.size > 0) {
        dispatch(setAlert(`Total ${res.data.size} found!`, 'success'));
      } else {
        dispatch(setAlert('Found 0', 'warning'));
      }
    }
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
      type: GETPROVIDES_FAIL
    });
  }
};

export const getMyProvide = () => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`${proxy}/api/provider/me`);
    dispatch({
      type: GETMYPROVIDE,
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
      type: GETMYPROVIDE_FAIL
    });
  }
};

export const updateMyService = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    dispatch(setLoading());
    const res = await axios.post(
      `${proxy}/api/provider/update`,
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: GETMYPROVIDE,
      payload: res.data
    });

    dispatch(setAlert('Service Updated Successfully!', 'success'));
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
      type: GETMYPROVIDE_FAIL
    });
  }
};

const setLoading = () => dispatch => {
  dispatch({
    type: SET_PROVIDELOADING
  });
};
