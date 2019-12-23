import axios from 'axios';
import { setAlert } from './alert';
import proxy from '../utils/proxy';

import { GETUTILDATA, GETUTILDATA_FAIL, SET_UTILLOADING } from './types';

export const getUtilData = () => async dispatch => {
  try {
    dispatch(setLoading());
    const res1 = await axios.get(`${proxy}/api/users/language`);
    const res2 = await axios.get(`${proxy}/api/users/serviceType`);
    const res3 = await axios.get(`${proxy}/api/users/role`);

    const res = {
      language: res1.data,
      serviceType: res2.data,
      role: res3.data
    };

    dispatch({
      type: GETUTILDATA,
      payload: res
    });
  } catch (err) {
    const error = err.response.data.error;
    dispatch(setAlert(error, 'danger'));

    dispatch({
      type: GETUTILDATA_FAIL
    });
  }
};

const setLoading = () => dispatch => {
  dispatch({ type: SET_UTILLOADING });
};
