import {
  GETMYPROVIDE,
  GETMYPROVIDE_FAIL,
  CLEAR_PROVIDE,
  GETPROVIDES,
  GETPROVIDES_FAIL,
  SET_PROVIDELOADING
} from '../actions/types';

const initialState = {
  myProvide: null,
  provides: [],
  size: 0,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETMYPROVIDE:
      return {
        ...state,
        myProvide: payload,
        loading: false
      };
    case GETPROVIDES:
      return {
        ...state,
        provides: payload.serviceDtoList,
        size: payload.size,
        loading: false
      };
    case GETPROVIDES_FAIL:
    case GETMYPROVIDE_FAIL:
    case CLEAR_PROVIDE:
      return {
        ...state,
        myProvide: null,
        provides: [],
        size: 0,
        loading: false
      };
    case SET_PROVIDELOADING: {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
}
