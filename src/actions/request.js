import axios from 'axios';
import { setAlert } from './alert';
import proxy from '../utils/proxy';

import {
  GETREQUESTS,
  REQUESTS_FAIL,
  POSTREQUEST_FAIL,
  POSTREQUEST,
  UPDATEREQUEST,
  UPDATEREQUEST_FAIL,
  SET_REQUESTLOADING
} from './types';

export const UpdateRequest = (
  requestId,
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  dispatch(setLoading());
  const res = await axios.put(
    `${proxy}/api/request/id/${requestId}`,
    formData,
    config
  );

  try {
    dispatch({
      type: UPDATEREQUEST,
      payload: res.data
    });
    dispatch(setAlert('Request Updated Successfully!', 'success'));
    history.push('/requests');
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
      type: UPDATEREQUEST_FAIL
    });
  }
};

export const PostRequest = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  dispatch(setLoading());
  const res = await axios.post(`${proxy}/api/request`, formData, config);

  try {
    dispatch({
      type: POSTREQUEST,
      payload: res.data
    });
    dispatch(setAlert('Request Posted!', 'success'));
    history.push('/requests');
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
      type: POSTREQUEST_FAIL
    });
  }
};

export const GetRequests = (
  userRole,
  provideName,
  languageName,
  page,
  limit
) => async dispatch => {
  try {
    let URL = `${proxy}/api/request/`;
    if (userRole === 'Customer') {
      URL += 'me';
    } else if (userRole === 'Service') {
      if (provideName !== 'All' && languageName !== 'All') {
        URL += `${provideName}/${languageName}`;
      } else if (provideName !== 'All') {
        URL += `name/${provideName}`;
      } else if (languageName !== 'All') {
        URL += `language/${languageName}`;
      } else {
        URL += 'All';
      }
    }
    URL += '?page=' + page + '&limit=' + limit;

    dispatch(setLoading());
    const res = await axios.get(URL);
    dispatch({
      type: GETREQUESTS,
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
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: REQUESTS_FAIL
    });
  }
};

const setLoading = () => dispatch => {
  dispatch({
    type: SET_REQUESTLOADING
  });
};
