import {
  GETLANGUAGES,
  GETLANGUAGESFAIL,
  GETSERVICETYPES,
  GETSERVICETYPESFAIL,
  GETROLES,
  GETROLESFAIL,
  CLEARUSERUTIL
} from '../actions/types';

const initialState = {
  languages: [],
  serviceTypes: [],
  roles: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GETLANGUAGES:
      return {
        ...state,
        languages: payload.map(item => {
          return item.name;
        })
      };
    case GETSERVICETYPES:
      return {
        ...state,
        serviceTypes: payload.map(item => {
          return item.name;
        })
      };
    case GETLANGUAGESFAIL:
      return {
        ...state,
        languages: []
      };
    case GETSERVICETYPESFAIL:
      return {
        ...state,
        serviceTypes: []
      };
    case GETROLES:
      return {
        ...state,
        roles: payload
      };
    case GETROLESFAIL:
      return {
        ...state,
        roles: []
      };
    case CLEARUSERUTIL:
      return {
        ...state,
        roles: [],
        languages: [],
        serviceTypes: []
      };
    default:
      return state;
  }
}
