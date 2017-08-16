import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const { func, object } = PropTypes;

const ReportTableSettings = (props) => {
  const { reports } = props;

  const handleChangeCount = (e) => {
    const { getReports, reports } = props;
    const limit = Number(e.currentTarget.value);
    getReports(1, limit, reports.sort, reports.order);
  };

  return (
    <div className="filter-sorter">
      <span>Show</span>
      <FormControl
        className="filter-sorter__select"
        componentClass="select"
        placeholder="select"
        value={reports.limit}
        onChange={handleChangeCount}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </FormControl>
    </div>
  );
};

ReportTableSettings.propTypes = {
  reports: object.isRequired,
  getReports: func.isRequired
};

export default ReportTableSettings;
