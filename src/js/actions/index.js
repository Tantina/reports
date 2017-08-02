import axios from 'axios';
import { push } from 'react-router-redux';
import { GET_REPORTS, ADD_REPORT, REMOVE_REPORT, GET_REPORT } from '../constants/ActionTypes';

let nextReport = 0;

export const getReports = () => dispatch =>
  axios.get('http://localhost:3000/report')
    .then(result => dispatch({
      type: GET_REPORTS,
      payload: result.data
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
        id: nextReport++,
        data: result.data
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
      id
    })
    );
