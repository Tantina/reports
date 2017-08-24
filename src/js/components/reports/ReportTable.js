import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Table } from 'react-bootstrap';
import ReportTableItem from './ReportTableItem';
import { getReportTypes, getReportStatus } from '../../actions';

import { IN_PROGRESS, PENDING } from '../../constants/ReportStatuses';

const { array, func, object } = PropTypes;

class ReportTable extends Component {
  componentDidMount() {
    const { getReportTypes, reportTypes } = this.props;
    this.getReportList();

    if (!reportTypes.length) getReportTypes();
  }

  componentDidUpdate() {
    clearInterval(this.timerStatus);
    this.setReportStatuses();
  }

  componentWillUnmount() {
    clearInterval(this.timerStatus);
  }

  setReportStatuses = () => {
    const { getReportStatus, reports } = this.props;
    const ids = reports.all.filter(report =>
      report.status === PENDING || report.status === IN_PROGRESS).map(report => report.id);

    if (ids.length) {
      this.timerStatus = setInterval(() => getReportStatus(ids), 10000);
    }
  }

  getReportList = () => {
    const { getReports, location, reports } = this.props;
    const params = new URLSearchParams(location.search);
    const page = params.get('page') || reports.page;
    const limit = params.get('limit') || reports.limit;
    const sort = params.get('sort') || reports.sort;
    const order = params.get('order') || reports.order;
    const query = params.get('q') || '';
    return getReports(page, limit, sort, order, query);
  }

  handleSort = (sort) => {
    const { reports, getReports } = this.props;
    const order = (sort === reports.sort && reports.order === 'asc') ? 'desc' : 'asc';

    getReports(reports.page, reports.limit, sort, order, reports.query);
  }

  displaySorter = (field) => {
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
  location: object.isRequired,
  reports: object.isRequired,
  getReports: func.isRequired,
  reportTypes: array.isRequired,
  getReportTypes: func.isRequired,
  getReportStatus: func.isRequired
};

function mapStateToProps(state) {
  return {
    reportTypes: state.reportTypes
  };
}

export default connect(mapStateToProps, { getReportTypes, getReportStatus })(ReportTable);
