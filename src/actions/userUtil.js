import axios from 'axios';
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
    const res = await axios.get('/api/users/language');
    dispatch({
      type: GETLANGUAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GETLANGUAGESFAIL
    });
  }
};

export const getServiceTypes = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/serviceType');
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
    const res = await axios.get('api/users/role');
    dispatch({
      type: GETROLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GETROLESFAIL
    });
  }
};