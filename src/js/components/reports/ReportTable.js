import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Table } from 'react-bootstrap';
import ReportTableItem from './ReportTableItem';
import { getReportTypes, getReportStatus } from '../../actions';

import { IN_PROGRESS, PENDING } from '../../constants/ReportStatuses';


class ReportTable extends Component {
  componentDidMount() {
    const { getReportTypes, reportTypes } = this.props;
    this.getReportList();

    if (!reportTypes.length) getReportTypes();
  }

  componentWillUpdate() {
    this.setReportStatuses();
  }

  setReportStatuses() {
    const { getReportStatus, reports } = this.props;
    const ids = reports.all.filter(report =>
      report.status === PENDING || report.status === IN_PROGRESS).map(report => report.id);
    let timerStatus;
    if (ids.length) {
      timerStatus = setInterval(() => getReportStatus(ids), 3000000);
    } else {
      clearInterval(timerStatus);
    }
  }

  getReportList() {
    const { getReports, location, reports } = this.props;
    const query = new URLSearchParams(location.search);
    const page = query.get('page') || reports.page;
    const limit = query.get('limit') || reports.limit;
    const sort = query.get('sort') || reports.sort;
    const order = query.get('order') || reports.order;
    return getReports(page, limit, sort, order);
  }

  handleSort(sort) {
    const { reports, getReports } = this.props;
    const order = (sort === reports.sort && reports.order === 'asc') ? 'desc' : 'asc';

    getReports(reports.page, reports.limit, sort, order);
  }

  displaySorter(field) {
    const { reports } = this.props;
    const className = classNames('glyphicon', 'sorter-icon', {
      'glyphicon-triangle-top': reports.order === 'asc',
      'glyphicon-triangle-bottom': reports.order === 'desc'
    });
    return reports.sort === field ? <span className={className} /> : '';
  }

  render() {
    const { reports, reportTypes, getReports } = this.props;
    return (
      <Table striped bordered condensed hover className="report-table">
        <thead>
          <tr>
            <th className="field__sortable" onClick={() => this.handleSort('id')}>Report ID{this.displaySorter('id')}</th>
            <th className="field__sortable" onClick={() => this.handleSort('name')}>Report Name{this.displaySorter('name')}</th>
            <th className="field__sortable" onClick={() => this.handleSort('submitTime')}>Date Run{this.displaySorter('submitTime')}</th>
            <th className="field__sortable" onClick={() => this.handleSort('type')}>Report Type{this.displaySorter('type')}</th>
            <th>Access Group</th>
            <th className="field__sortable" onClick={() => this.handleSort('status')}>Status{this.displaySorter('status')}</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {reports.all.map(report => (
            <ReportTableItem
              key={report.id}
              report={report}
              reports={reports}
              reportTypes={reportTypes}
              getReports={getReports}
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
  reportTypes: PropTypes.array.isRequired,
  getReportTypes: PropTypes.func.isRequired,
  getReportStatus: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reportTypes: state.reportTypes
  };
}

export default connect(mapStateToProps, { getReportTypes, getReportStatus })(ReportTable);
