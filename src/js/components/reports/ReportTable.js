import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReportTableItem from './ReportTableItem';
import { getReports, removeReport } from '../../actions';


class ReportTable extends Component {
  componentDidMount() {
    const { getReports, location } = this.props;
    const query = new URLSearchParams(location.search);
    const page = query.get('page');
    const limit = query.get('limit');
    getReports(page, limit);
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
          {reports.all.map(report => (
            <ReportTableItem
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
  location: PropTypes.object.isRequired,
  reports: PropTypes.object.isRequired,
  getReports: PropTypes.func.isRequired,
  removeReport: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reports: state.reports
  };
}

export default connect(mapStateToProps, { getReports, removeReport })(ReportTable);
