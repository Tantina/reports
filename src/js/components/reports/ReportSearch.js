import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const { func } = PropTypes;

const ReportSearch = props => (
  <FormControl
    type="text"
    className="search-field"
    onChange={e => props.searchReport(e.currentTarget.value)}
  />
);

ReportSearch.propTypes = {
  searchReport: func.isRequired
};

export default ReportSearch;
