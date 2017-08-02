import { GET_REPORTS, ADD_REPORT, REMOVE_REPORT } from '../constants/ActionTypes';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORTS:
      return [...payload];
    case ADD_REPORT:
      return [{
        id: action.id,
        name: action.name
      }, ...state];
    case REMOVE_REPORT:
      return state.filter(report => report.id !== action.id);
    default:
      return state;
  }
};
