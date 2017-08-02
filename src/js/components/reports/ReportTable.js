import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getReports, removeReport } from '../../actions';


const ReportItem = (props) => {
  const { id, name, date, type, access, status } = props.report;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>{type}</td>
      <td>{access}</td>
      <td>{status}</td>
      <th><Link to={`/edit/${id}`}>copy</Link></th>
      <td>
        <button onClick={() => props.removeReport(id)}>Delete</button>
      </td>
    </tr>
  );
};

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
  removeReport: PropTypes.func.isRequired
};

class ReportTable extends Component {
  componentDidMount() {
    const { getReports } = this.props;
    getReports();
  }

  render() {
    const { reports, removeReport } = this.props;
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Report Name</th>
            <th>Date Run</th>
            <th>Report Type</th>
            <th>Access Group(s)</th>
            <th>Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <ReportItem
              key={report.id}
              report={report}
              removeReport={removeReport}
            />
          ))
          }
        </tbody>
      </Table>
    );
  }
}

ReportTable.propTypes = {
  reports: PropTypes.array.isRequired,
  getReports: PropTypes.func.isRequired,
  removeReport: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reports: state.reports
  };
}

export default connect(mapStateToProps, { getReports, removeReport })(ReportTable);
