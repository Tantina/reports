import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const { func, object } = PropTypes;

const ReportSearch = (props) => {
  const { getReports, reports } = props;

  const { page, limit, sort, order } = reports;

  const searchReport = (e) => {
    const query = e.currentTarget.value;
    getReports(page, limit, sort, order, query);
  };

  return (
    <div className="search">
      <span className="glyphicon glyphicon-search search_icon" />
      <FormControl
        type="text"
        className="search_field"
        onChange={searchReport}
      />
    </div>
  );
};

ReportSearch.propTypes = {
  reports: object.isRequired,
  getReports: func.isRequired
};

export default ReportSearch;
