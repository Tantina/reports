import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const { func, object } = PropTypes;

const ReportPagination = (props) => {
  const { reports } = props;
  const numOfPages = Math.ceil(reports.count / reports.limit);

  const handleSelect = (e) => {
    const { reports, getReports } = props;
    getReports(e, reports.limit, reports.sort, reports.order, reports.query);
  };

  return (
    numOfPages > 1 ?
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={numOfPages}
        activePage={Number(reports.page)}
        onSelect={handleSelect}
      /> : null

  );
};

ReportPagination.propTypes = {
  getReports: func.isRequired,
  reports: object.isRequired
};

export default ReportPagination;
