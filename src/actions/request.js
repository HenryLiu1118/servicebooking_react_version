import axios from 'axios';
import {
  GETREQUESTS,
  REQUESTS_FAIL,
  POSTREQUEST_FAIL,
  POSTREQUEST,
  UPDATEREQUEST,
  UPDATEREQUEST_FAIL
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
  const res = await axios.put(`/api/request/id/${requestId}`, formData, config);

  try {
    dispatch({
      type: UPDATEREQUEST,
      payload: res.data
    });
    history.push('/requests');
  } catch (err) {
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
  const res = await axios.post('/api/request', formData, config);

  try {
    dispatch({
      type: POSTREQUEST,
      payload: res.data
    });
    history.push('/requests');
  } catch (err) {
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
    let URL = '/api/request/';
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
    const res = await axios.get(URL);
    dispatch({
      type: GETREQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REQUESTS_FAIL
    });
  }
};
