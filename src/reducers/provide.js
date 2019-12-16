import {
  GETMYPROVIDE,
  GETMYPROVIDE_FAIL,
  CLEAR_PROVIDE,
  GETPROVIDES,
  GETPROVIDES_FAIL
} from '../actions/types';

const initialState = {
  myProvide: null,
  provides: [],
  size: 0
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETMYPROVIDE:
      return {
        ...state,
        myProvide: payload
      };
    case GETPROVIDES:
      return {
        ...state,
        provides: payload.serviceDtoList,
        size: payload.size
      };
    case GETPROVIDES_FAIL:
    case GETMYPROVIDE_FAIL:
    case CLEAR_PROVIDE:
      return {
        ...state,
        myProvide: null,
        provides: [],
        size: 0
      };
    default:
      return state;
  }
}
