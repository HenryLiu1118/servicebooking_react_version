import axios from 'axios';
import { setAlert } from './alert';
import proxy from '../utils/proxy';

import {
  GETLANGUAGESFAIL,
  GETSERVICETYPESFAIL,
  GETLANGUAGES,
  GETSERVICETYPES,
  GETROLES,
  GETROLESFAIL
} from './types';

export const getLanguages = () => async dispatch => {
  try {
    const res = await axios.get(`${proxy}/api/users/language`);
    dispatch({
      type: GETLANGUAGES,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: GETLANGUAGESFAIL
    });
  }
};

export const getServiceTypes = () => async dispatch => {
  try {
    const res = await axios.get(`${proxy}/api/users/serviceType`);
    dispatch({
      type: GETSERVICETYPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GETSERVICETYPESFAIL
    });
  }
};

export const getRoles = () => async dispatch => {
  try {
    const res = await axios.get(`${proxy}/api/users/role`);
    dispatch({
      type: GETROLES,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: GETROLESFAIL
    });
  }
};
