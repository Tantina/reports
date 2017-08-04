import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ReportItemTable = (props) => {
  const { id, name, date, type, access, status } = props.report;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>{type}</td>
      <td>{access}</td>
      <td>{status}</td>
      <th><Link to={{ pathname: '/new', search: `id=${id}` }} >copy</Link></th>
      <td>
        <button onClick={() => props.removeReport(id)}>Delete</button>
      </td>
    </tr>
  );
};

ReportItemTable.propTypes = {
  report: PropTypes.object.isRequired,
  removeReport: PropTypes.func.isRequired
};

export default ReportItemTable;
