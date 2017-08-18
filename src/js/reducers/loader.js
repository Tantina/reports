import {
  CREATE_LOADER,
  CLEAR_LOADER
} from '../constants/ActionTypes';

const initialState = false;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_LOADER:
      return payload;
    case CLEAR_LOADER:
      return initialState;
    default:
      return state;
  }
};
