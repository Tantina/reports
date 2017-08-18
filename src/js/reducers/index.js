import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reports from './reports';
import newReport from './newReport';
import loader from './loader';
import errors from './errors';

export default combineReducers({
  reports,
  newReport,
  errors,
  loader,
  router: routerReducer
});
