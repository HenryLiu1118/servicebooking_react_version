import axios from 'axios';
import {
  GETCOMMENTS_FAIL,
  GETCOMMENTS,
  GETCOMMENT,
  SET_COMMENT,
  POSTCOMMENT,
  POSTCOMMENT_FAIL
} from './types';

export const getComments = requestId => async dispatch => {
  try {
    const res = await axios.get(`/api/comment/get/${requestId}`);

    dispatch({
      type: GETCOMMENTS,
      payload: res.data
    });
  } catch (err) {
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
      `/api/comment/post/${requestId}`,
      formData,
      config
    );

    dispatch({
      type: POSTCOMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTCOMMENT_FAIL
    });
  }
};

export const checkDuplicateComment = requestId => async dispatch => {
  try {
    dispatch(setComment());

    const res = await axios.get(`/api/comment/check/${requestId}`);
    dispatch({
      type: GETCOMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GETCOMMENT
    });
  }
};

const setComment = () => dispatch => dispatch({ type: SET_COMMENT });
