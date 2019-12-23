import {
  GETREQUESTS,
  REQUESTS_FAIL,
  CLEAR_REQUESTS,
  POSTREQUEST,
  POSTREQUEST_FAIL,
  UPDATEREQUEST_FAIL,
  UPDATEREQUEST,
  SET_REQUESTLOADING
} from '../actions/types';

const initialState = {
  requests: [],
  size: 0,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETREQUESTS:
      return {
        requests: payload.requestDtoList,
        size: payload.size,
        loading: false
      };
    case REQUESTS_FAIL:
    case CLEAR_REQUESTS:
      return {
        requests: [],
        size: 0,
        loading: false
      };
    case POSTREQUEST:
      return {
        ...state,
        size: state.size + 1,
        loading: false
      };
    case UPDATEREQUEST:
      return {
        ...state,
        requests: state.requests.map(request =>
          request.requestId === payload.requestId ? payload : request
        ),
        loading: false
      };
    case UPDATEREQUEST_FAIL:
    case POSTREQUEST_FAIL:
      return {
        ...state,
        loading: false
      };
    case SET_REQUESTLOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
