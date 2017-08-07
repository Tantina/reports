import axios from 'axios';
import { push } from 'react-router-redux';
import { GET_REPORTS, ADD_REPORT, REMOVE_REPORT, GET_REPORT } from '../constants/ActionTypes';

let nextReport = 0;
const count = 30; // Should be return by server


export const getReports = (page, limit, sort, order) => dispatch =>
  axios.get(`http://localhost:3000/report?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`)
    .then((result) => {
      dispatch({
        type: GET_REPORTS,
        payload: {
          data: result.data,
          page,
          limit,
          count,
          sort,
          order
        }
      });
      console.log(page, limit, sort, order);
      dispatch(push(`/reports?page=${page}&limit=${limit}&sort=${sort}&order=${order}`));
    }
    ).catch((error) => {
      console.log(error);
      dispatch({ type: 'CREATE_ERROR', payload: error });
    });

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
