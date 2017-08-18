import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reports from './reports';
import reportTypes from './reportTypes';
import loader from './loader';
import errors from './errors';

export default combineReducers({
  reports,
  reportTypes,
  errors,
  loader,
  router: routerReducer
});
