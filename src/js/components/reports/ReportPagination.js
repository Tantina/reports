import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getReports } from '../../actions';

class ReportPagination extends Component {
  handleSelect(eventKey) {
    const { reports, getReports } = this.props;
    getReports(eventKey, reports.limit);
  }

  render() {
    const { reports } = this.props;
    const numOfPages = Math.ceil(reports.count / reports.limit);
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={numOfPages}
        activePage={Number(reports.page)}
        onSelect={e => this.handleSelect(e)}
      />
    );
  }
}

ReportPagination.propTypes = {
  getReports: PropTypes.func.isRequired,
  reports: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    reports: state.reports
  };
}

export default connect(mapStateToProps, { getReports })(ReportPagination);
