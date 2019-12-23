import {
  CLEARUSERUTIL,
  GETUTILDATA_FAIL,
  GETUTILDATA,
  SET_UTILLOADING
} from '../actions/types';

const initialState = {
  languages: [],
  serviceTypes: [],
  roles: [],
  utilLoading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GETUTILDATA:
      return {
        ...state,
        languages: payload.language.map(item => {
          return item.name;
        }),
        serviceTypes: payload.serviceType.map(item => {
          return item.name;
        }),
        roles: payload.role.map(item => {
          return item.name;
        }),
        utilLoading: false
      };
    case GETUTILDATA_FAIL:
    case CLEARUSERUTIL:
      return {
        ...state,
        roles: [],
        languages: [],
        serviceTypes: [],
        utilLoading: false
      };
    case SET_UTILLOADING:
      return {
        ...state,
        utilLoading: true
      };
    default:
      return state;
  }
}
