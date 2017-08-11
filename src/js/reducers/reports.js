import {
  GET_REPORTS,
  ADD_REPORT,
  REMOVE_REPORT,
  SEARCH_REPORT,
  GET_REPORT_STATUS
} from '../constants/ActionTypes';

const initialState = {
  all: [],
  page: 1,
  limit: 10,
  count: 0,
  sort: 'id',
  order: 'desc'
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORTS: {
      const { page, limit, count, sort, order } = payload;
      return { ...state, all: payload.data, page, limit, count, sort, order };
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
        all: state.all.filter(report => report.id !== payload.id)
      };
    case SEARCH_REPORT:
      return { ...state, all: payload };
    case GET_REPORT_STATUS:
      return { ...state,
        all: state.all.map(report => (payload.ids.includes(report.id)
          ? { ...report, status: payload.data.find(item => item.id === report.id).status }
          : report))
      };
    default:
      return state;
  }
};
