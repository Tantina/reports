import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const ReportPagination = (props) => {
  const { reports } = props;
  const numOfPages = Math.ceil(reports.count / reports.limit);

  const handleSelect = (eventKey) => {
    const { reports, getReports } = props;
    getReports(eventKey, reports.limit, reports.sort, reports.order);
  };

  return (
    <Pagination
      prev
      next
      first
      last
      ellipsis
      boundaryLinks
      items={numOfPages}
      activePage={Number(reports.page)}
      onSelect={e => handleSelect(e)}
    />
  );
};

ReportPagination.propTypes = {
  getReports: PropTypes.func.isRequired,
  reports: PropTypes.object.isRequired
};

export default ReportPagination;
