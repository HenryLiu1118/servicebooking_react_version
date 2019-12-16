import axios from 'axios';
import {
  GETMYPROVIDE,
  GETMYPROVIDE_FAIL,
  GETPROVIDES_FAIL,
  GETPROVIDES
} from './types';

export const getProvides = (
  provideName,
  languageName,
  page,
  limit
) => async dispatch => {
  try {
    let URL = '/api/provider/';
    if (provideName !== 'All' && languageName !== 'All') {
      URL += `${provideName}/${languageName}`;
    } else if (provideName !== 'All') {
      URL += `name/${provideName}`;
    } else if (languageName !== 'All') {
      URL += `language/${languageName}`;
    }
    URL += '?page=' + page + '&limit=' + limit;
    const res = await axios.get(URL);
    dispatch({
      type: GETPROVIDES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GETPROVIDES_FAIL
    });
  }
};

export const getMyProvide = () => async dispatch => {
  try {
    const res = await axios.get('/api/provider/me');
    dispatch({
      type: GETMYPROVIDE,
      payload: res.data
    });
  } catch (err) {
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
    const res = await axios.post('/api/provider/update', formData, config);
    console.log(res);
    dispatch({
      type: GETMYPROVIDE,
      payload: res.data
    });
    history.push('/dashboard/profile');
  } catch (err) {
    dispatch({
      type: GETMYPROVIDE_FAIL
    });
  }
};
