import { GET_REPORT_TYPES } from '../constants/ActionTypes';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORT_TYPES:
      return payload.data;
    default:
      return state;
  }
};
