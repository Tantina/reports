import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';


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
        onChange={e => handleChangeCount(e)}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </FormControl>
    </div>
  );
};

ReportTableSettings.propTypes = {
  reports: PropTypes.object.isRequired,
  getReports: PropTypes.func.isRequired
};

export default ReportTableSettings;
