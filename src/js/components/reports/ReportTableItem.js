import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { ReportTypes } from '../../constants/ReportTypes';


const ReportTableItem = (props) => {
  const { id, name, date, type, access, status } = props.report;
  const reportType = ReportTypes.find(item => item.type === type).name;
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
          onClick={() => props.removeReport(id)}
        >Delete
        </Button>
      </td>
    </tr>
  );
};

ReportTableItem.propTypes = {
  report: PropTypes.object.isRequired,
  removeReport: PropTypes.func.isRequired
};

export default ReportTableItem;
