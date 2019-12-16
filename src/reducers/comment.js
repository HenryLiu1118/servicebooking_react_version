import {
  GETCOMMENTS,
  GETCOMMENTS_FAIL,
  GETCOMMENT,
  GETCOMMENT_FAIL,
  SET_COMMENT,
  POSTCOMMENT,
  POSTCOMMENT_FAIL
} from '../actions/types';

const initialState = {
  comments: [],
  myComment: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETCOMMENTS:
      return {
        ...state,
        comments: payload
      };
    case GETCOMMENTS_FAIL:
      return {
        ...state,
        comments: []
      };
    case POSTCOMMENT:
    case GETCOMMENT:
      return {
        ...state,
        myComment: payload
      };
    case POSTCOMMENT_FAIL:
    case SET_COMMENT:
    case GETCOMMENT_FAIL:
      return {
        ...state,
        myComment: null
      };
    default:
      return state;
  }
}
