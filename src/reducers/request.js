import {
  GETREQUESTS,
  REQUESTS_FAIL,
  CLEAR_REQUESTS,
  POSTREQUEST,
  POSTREQUEST_FAIL,
  UPDATEREQUEST_FAIL,
  UPDATEREQUEST
} from '../actions/types';

const initialState = {
  requests: [],
  size: 0
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETREQUESTS:
      return {
        requests: payload.requestDtoList,
        size: payload.size
      };
    case REQUESTS_FAIL:
    case CLEAR_REQUESTS:
      return {
        requests: [],
        size: 0
      };
    case POSTREQUEST:
      return {
        ...state,
        size: state.size + 1
      };
    case UPDATEREQUEST:
      return {
        ...state,
        requests: state.requests.map(request =>
          request.requestId === payload.requestId ? payload : request
        )
      };
    case UPDATEREQUEST_FAIL:
    case POSTREQUEST_FAIL:
      return state;
    default:
      return state;
  }
}
