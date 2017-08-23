import axios from 'axios';
import { push } from 'react-router-redux';
import {
  GET_REPORTS,
  ADD_REPORT,
  REMOVE_REPORT,
  CREATE_ERROR,
  GET_REPORT_TYPES,
  GET_REPORT_STATUS,
  GET_REPORT_ACCESS_GROUPS,
  CLEAR_ERROR,
  CREATE_LOADER,
  CLEAR_LOADER
} from '../constants/ActionTypes';

import { host } from '../constants/host';

export const getReports = (page, limit, sort, order, query) => (dispatch) => {
  dispatch({ type: CREATE_LOADER, payload: true });
  const q = query ? `&name=${query}` : '';
  axios.get(`${host}/report?page=${page - 1}&size=${limit}&sort=${sort},${order}${q}`)
    .then((result) => {
      const { content, totalElements } = result.data;
      dispatch({
        type: GET_REPORTS,
        payload: {
          data: content,
          page,
          limit,
          count: totalElements,
          sort,
          order,
          query
        }
      });
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch(push(`/reports?page=${page}&limit=${limit}&sort=${sort}&order=${order}`));
    })
    .catch((error) => {
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });
};

export const addReport = data => (dispatch) => {
  const { access, emailTo, endDate, name, type, startDate, emails } = data;
  const query = {
    accessGroupName: access.name,
    accessGroupUUID: access.guid,
    emailTo,
    endDate,
    lessonUUID: '',
    reportName: name,
    reportType: type,
    startDate,
    userEmails: emails
  };
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: CREATE_LOADER, payload: true });
  axios.post(`${host}/report`, query)
    .then((result) => {
      dispatch({
        type: ADD_REPORT,
        payload: {
          data: result.data
        }
      });
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch(push('/reports'));
    })
    .catch((error) => {
      const errorMessage = error.response ?
        error.response.data.errors.reduce(((text, error) => `${text}\n${error.message}`), '').trim()
        : error.message;
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch({ type: CREATE_ERROR, payload: errorMessage });
    });
};

export const removeReport = (id, shouldRemoveFromState, callback) => (dispatch) => {
  dispatch({ type: CREATE_LOADER, payload: true });
  axios.delete(`${host}/report/${id}`)
    .then(() => {
      if (shouldRemoveFromState) {
        dispatch({
          type: REMOVE_REPORT,
          payload: {
            id
          }
        });
      } else if (callback) {
        callback();
      }
      dispatch({ type: CLEAR_LOADER, payload: false });
    })
    .catch((error) => {
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });
};

export const getReportTypes = () => dispatch =>
  axios.get(`${host}/report/types`)
    .then(result => dispatch({
      type: GET_REPORT_TYPES,
      payload: {
        data: result.data
      }
    })
    ).catch((error) => {
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });

export const getReportStatus = ids => dispatch =>
  axios.post(`${host}/report/statuses`, ids)
    .then(result => dispatch({
      type: GET_REPORT_STATUS,
      payload: {
        data: result.data,
        ids
      }
    }))
    .catch((error) => {
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });

export const getReportAccessGroups = name => (dispatch) => {
  const limit = 10;
  axios.get(`${host}/accessgroup`, { name, limit })
    .then(result => dispatch({
      type: GET_REPORT_ACCESS_GROUPS,
      payload: {
        data: result.data
      }
    }))
    .catch((error) => {
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });
};

export const clearErrors = () => dispatch =>
  dispatch({
    type: CLEAR_ERROR
  });
