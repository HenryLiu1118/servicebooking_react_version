import {
  ADMINGETLANGUAGES,
  ADMINGETLANGUAGES_FAIL,
  ADMINGETSERVICETYPES,
  ADMINGETSERVICETYPES_FAIL,
  ADMINGETROLES,
  ADMINGETROLES_FAIL,
  ADMINGETUSERS,
  ADMINGETUSERS_FAIL,
  CLEARADMIN,
  ADMINPOSTLANGUAGE,
  ADMINPOSTLANGUAGE_FAIL,
  ADMINPOSTSERVICETYPE,
  ADMINPOSTSERVICETYPE_FAIL,
  ADMINPOSTROLE_FAIL,
  ADMINPOSTROLE
} from '../actions/types';

const initialState = {
  languages: [],
  serviceTypes: [],
  roles: [],
  users: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADMINGETLANGUAGES:
      return {
        ...state,
        languages: payload
      };
    case ADMINGETLANGUAGES_FAIL:
      return {
        ...state,
        languages: []
      };
    case ADMINGETSERVICETYPES:
      return {
        ...state,
        serviceTypes: payload
      };
    case ADMINGETSERVICETYPES_FAIL:
      return {
        ...state,
        serviceTypes: []
      };
    case ADMINGETROLES:
      return {
        ...state,
        roles: payload
      };
    case ADMINGETROLES_FAIL:
      return {
        ...state,
        roles: []
      };
    case ADMINGETUSERS:
      return {
        ...state,
        users: payload
      };
    case ADMINGETUSERS_FAIL:
      return {
        ...state,
        users: []
      };
    case CLEARADMIN:
      return {
        languages: [],
        serviceTypes: [],
        roles: [],
        users: []
      };
    case ADMINPOSTLANGUAGE:
      return {
        ...state,
        languages: [...state.languages, payload]
      };
    case ADMINPOSTSERVICETYPE:
      return {
        ...state,
        serviceTypes: [...state.serviceTypes, payload]
      };
    case ADMINPOSTROLE:
      return {
        ...state,
        roles: [...state.roles, payload]
      };
    case ADMINPOSTROLE_FAIL:
    case ADMINPOSTSERVICETYPE_FAIL:
    case ADMINPOSTLANGUAGE_FAIL:
      return state;
    default:
      return state;
  }
}
