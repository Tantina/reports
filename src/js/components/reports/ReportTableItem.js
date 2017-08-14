import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { removeReport } from '../../actions';
import { host } from '../../constants/host';

const ReportTableItem = (props) => {
  const { id, name, submitTime, type, reportMetadata, status } = props.report;
  const reportType = props.reportTypes.find(item => item.type === type).name;
  const date = submitTime.split(/\s/)[0];

  const handleClickRemoveBtn = () => {
    const { page, limit, sort, order, count } = props.reports;
    props.removeReport(id).then(() => {
      if (count > limit) {
        props.getReports(page, limit, sort, order);
      }
    }
    );
  };
  return (
    <tr>
      <td className="report-table__item">{id}</td>
      <td className="report-table__item">{name}</td>
      <td className="report-table__item">{date}</td>
      <td className="report-table__item">{reportType}</td>
      <td className="report-table__item">{reportMetadata.accessGroupName}</td>
      <td className="report-table__item">{status}</td>
      <td className="report-table__item report-table__item--action">
        <a
          href={`${host}/report/${id}`}
          className="download-link"
        >
          download csv
        </a>
      </td>
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
  report: PropTypes.object.isRequired,
  reportTypes: PropTypes.array.isRequired,
  removeReport: PropTypes.func.isRequired,
  reports: PropTypes.object.isRequired
};

export default connect(null, { removeReport })(ReportTableItem);
