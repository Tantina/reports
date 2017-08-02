import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reports from './reports';
import newReport from './newReport';

export default combineReducers({
  reports,
  newReport,
  router: routerReducer
});
