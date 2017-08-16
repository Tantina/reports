import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReportTableItem from './ReportTableItem';

const { func, object } = PropTypes;

class ReportTable extends Component {
  componentDidMount() {
    const { getReports, location, reports } = this.props;
    const params = new URLSearchParams(location.search);
    const page = params.get('page') || reports.page;
    const limit = params.get('limit') || reports.limit;
    const sort = params.get('sort') || reports.sort;
    const order = params.get('order') || reports.order;
    const query = params.get('q') || reports.query;
    getReports(page, limit, sort, order, query);
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
  location: object.isRequired,
  reports: object.isRequired,
  getReports: func.isRequired,
  removeReport: func.isRequired
};

export default ReportTable;
