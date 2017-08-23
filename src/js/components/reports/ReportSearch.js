import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormControl } from 'react-bootstrap';

const { func, object } = PropTypes;

const DELAYTIME = 600;

const ReportSearch = (props) => {
  const { getReports, reports } = props;

  const { page, limit, sort, order } = reports;

  const searchReport = (e) => {
    const query = e.target.value;
    getReports(page, limit, sort, order, query);
  };

  const debouncedOnChange = _.debounce(searchReport, DELAYTIME);

  const onChange = (event) => {
    event.persist();
    debouncedOnChange(event);
  }

  return (
    <div className="search">
      <span className="glyphicon glyphicon-search search_icon" />
      <FormControl
        type="text"
        className="search_field"
        onChange={onChange}
      />
    </div>
  );
};

ReportSearch.propTypes = {
  reports: object.isRequired,
  getReports: func.isRequired
};

export default ReportSearch;
