import axios from 'axios';
import { push } from 'react-router-redux';
import { GET_REPORTS, ADD_REPORT, REMOVE_REPORT, GET_REPORT } from '../constants/ActionTypes';

let nextReport = 0;

export const getReports = (page, limit) => dispatch =>
  axios.get(`http://localhost:3000/report?_page=${page}&_limit=${limit}`)
    .then(result => dispatch({
      type: GET_REPORTS,
      payload: {
        data: result.data,
        count: 25
      }
    })
    );

export const getReport = id => dispatch =>
  axios.get(`http://localhost:3000/report/${id}`)
    .then(result => dispatch({
      type: GET_REPORT,
      payload: result.data
    })
    );

export const addReport = data => dispatch =>
  axios.post('http://localhost:3000/report', data)
    .then((result) => {
      dispatch({
        type: ADD_REPORT,
        payload: {
          id: nextReport++,
          data: result.data
        }
      });
      dispatch(push('/'));
    }
    ).catch((error) => {
      console.log(error);
      dispatch({ type: 'CREATE_ERROR', payload: error });
    });

export const removeReport = id => dispatch =>
  axios.delete(`http://localhost:3000/report/${id}`)
    .then(() => dispatch({
      type: REMOVE_REPORT,
      payload: id
    })
    );
