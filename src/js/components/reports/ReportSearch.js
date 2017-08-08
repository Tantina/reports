import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const ReportSearch = props => (
  <FormControl
    type="text"
    className="search-field"
    onChange={e => props.searchReport(e.currentTarget.value)}
  />
);

ReportSearch.propTypes = {
  searchReport: PropTypes.func.isRequired
};

export default ReportSearch;
