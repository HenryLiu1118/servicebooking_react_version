import axios from 'axios';
import { setAlert } from './alert';
import proxy from '../utils/proxy';

import {
  GETCOMMENTS_FAIL,
  GETCOMMENTS,
  GETCOMMENT,
  POSTCOMMENT,
  POSTCOMMENT_FAIL
} from './types';

export const getComments = requestId => async dispatch => {
  try {
    const res = await axios.get(`${proxy}/api/comment/get/${requestId}`);

    dispatch({
      type: GETCOMMENTS,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: GETCOMMENTS_FAIL
    });
  }
};

export const postComment = (formData, requestId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `${proxy}/api/comment/post/${requestId}`,
      formData,
      config
    );

    dispatch({
      type: POSTCOMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Posted!', 'success'));
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
      type: POSTCOMMENT_FAIL
    });
  }
};

export const checkDuplicateComment = requestId => async dispatch => {
  try {
    const res = await axios.get(`${proxy}/api/comment/check/${requestId}`);
    dispatch({
      type: GETCOMMENT,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: GETCOMMENT
    });
  }
};
