import { GET_REPORT } from '../constants/ActionTypes';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORT:
      return payload;
    default:
      return state;
  }
};
