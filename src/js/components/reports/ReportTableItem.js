import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ReportTableItem = (props) => {
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
        <Button bsStyle="link" onClick={() => props.removeReport(id)}>Delete</Button>
      </td>
    </tr>
  );
};

ReportTableItem.propTypes = {
  report: PropTypes.object.isRequired,
  removeReport: PropTypes.func.isRequired
};

export default ReportTableItem;
