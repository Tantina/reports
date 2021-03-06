import {
  GET_REPORTS,
  ADD_REPORT,
  REMOVE_REPORT
} from '../constants/ActionTypes';

const initialState = {
  all: [],
  page: 1,
  limit: 10,
  count: 0,
  sort: 'id',
  order: 'desc',
  query: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORTS: {
      const { page, limit, count, sort, order, query } = payload;
      return { ...state, all: payload.data, page, limit, count, sort, order, query };
    }
    case ADD_REPORT:
      return { ...state,
        all: [
          ...state.all,
          ...payload
        ]
      };
    case REMOVE_REPORT:
      return { ...state,
        all: state.all.filter(report => report.id !== payload)
      };
    default:
      return state;
  }
};
