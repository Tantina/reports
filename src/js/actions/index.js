import axios from 'axios';
import { push } from 'react-router-redux';
import {
  GET_REPORTS,
  ADD_REPORT,
  REMOVE_REPORT,
  GET_REPORT,
  CREATE_ERROR,
  CLEAR_ERROR,
  CREATE_LOADER,
  CLEAR_LOADER
} from '../constants/ActionTypes';

let nextReport = 0;
const host = 'http://localhost:3000';


export const getReports = (page, limit, sort, order, query) => (dispatch) => {
  dispatch({ type: CREATE_LOADER, payload: true });
  const q = query ? `&q=${query}` : '';
  axios.get(`${host}/report?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}${q}`)
    .then((result) => {
      dispatch({
        type: GET_REPORTS,
        payload: {
          data: result.data,
          page,
          limit,
          count: result.headers['x-total-count'],
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

export const getReport = id => dispatch =>
  axios.get(`${host}/report/${id}`)
    .then(result => dispatch({
      type: GET_REPORT,
      payload: result.data
    }))
    .catch((error) => {
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });

export const addReport = data => (dispatch) => {
  dispatch({ type: CREATE_LOADER, payload: true });
  axios.post(`${host}/report`, data)
    .then((result) => {
      dispatch({
        type: ADD_REPORT,
        payload: {
          id: nextReport++,
          data: result.data
        }
      });
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch(push('/reports'));
    })
    .catch((error) => {
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });
};

export const removeReport = id => (dispatch) => {
  dispatch({ type: CREATE_LOADER, payload: true });
  return axios.delete(`${host}/report/${id}`)
    .then(() => {
      dispatch({ type: CLEAR_LOADER, payload: false });
      dispatch({
        type: REMOVE_REPORT,
        payload: id
      });
    })
    .catch((error) => {
      dispatch({ type: CREATE_ERROR, payload: error.message });
    });
};

export const clearErrors = () => dispatch =>
  dispatch({
    type: CLEAR_ERROR
  });
