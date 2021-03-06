import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { ReportTypes } from '../../constants/ReportTypes';

const { func, object } = PropTypes;

const ReportTableItem = (props) => {
  const { id, name, date, type, access, status } = props.report;
  const reportType = ReportTypes.find(item => item.type === type).name;

  const handleClickRemoveBtn = () => {
    const { page, limit, sort, order, count, all, query } = props.reports;
    const pageNumer = (all.length === 1 && page !== 1) ? page - 1 : page;
    props.removeReport(id).then(() => {
      if (count > limit) {
        props.getReports(pageNumer, limit, sort, order, query);
      }
    });
  };

  return (
    <tr>
      <td className="report-table__item">{id}</td>
      <td className="report-table__item">{name}</td>
      <td className="report-table__item">{date}</td>
      <td className="report-table__item">{reportType}</td>
      <td className="report-table__item">{access}</td>
      <td className="report-table__item">{status}</td>
      <td className="report-table__item report-table__item--action">
        <Link
          className="copy-link"
          to={{ pathname: '/new', search: `id=${id}` }}
        >copy
        </Link>
      </td>
      <td className="report-table__item report-table__item--action">
        <Button
          bsStyle="link"
          className="delete-link"
          onClick={handleClickRemoveBtn}
        >Delete
        </Button>
      </td>
    </tr>
  );
};

ReportTableItem.propTypes = {
  report: object.isRequired,
  removeReport: func.isRequired,
  reports: object.isRequired
};

export default ReportTableItem;
