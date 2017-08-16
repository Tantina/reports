import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReportTableItem from './ReportTableItem';


class ReportTable extends Component {
  componentDidMount() {
    const { getReports, location, reports } = this.props;
    const query = new URLSearchParams(location.search);
    const page = query.get('page') || reports.page;
    const limit = query.get('limit') || reports.limit;
    const sort = query.get('sort') || reports.sort;
    const order = query.get('order') || reports.order;
    getReports(page, limit, sort, order);
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
    const { reports, removeReport, getReports } = this.props;

    return (
      <Table striped bordered condensed hover className="report-table">
        <thead>
          <tr>
            <th className="field__sortable" onClick={() => this.handleSort('id')}>Report ID{this.displaySorter('id')}</th>
            <th className="field__sortable" onClick={() => this.handleSort('name')}>Report Name{this.displaySorter('name')}</th>
            <th className="field__sortable" onClick={() => this.handleSort('date')}>Date Run{this.displaySorter('date')}</th>
            <th className="field__sortable" onClick={() => this.handleSort('type')}>Report Type{this.displaySorter('type')}</th>
            <th>Access Group(s)</th>
            <th className="field__sortable" onClick={() => this.handleSort('status')}>Status{this.displaySorter('status')}</th>
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
              reports={reports}
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
  removeReport: PropTypes.func.isRequired
};

export default ReportTable;
